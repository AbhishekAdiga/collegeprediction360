import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { parse } from 'csv-parse/sync';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();



const app = express();
const PORT = 4000;

//app.use(cors());
app.use(cors({
  origin: [
    //'http://localhost:5173', // local dev
    'https://collegepredict-frontend.onrender.com', // deployed frontend
    'https://mycollegepredictor.in', // your new domain
    'https://www.mycollegepredictor.in' // if applicable
  ],
  credentials: true,
}));

// app.use(cors({
//   origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
//   credentials: true,
// }));

app.use(express.json());

// // Simple in-memory store for user data
// const users = {}; // { email: { isPremium: true, downloadCount: 1 } }

// app.post('/api/user/init', (req, res) => {
//   const { email, isPremium } = req.body;

//   if (!email) return res.status(400).json({ error: 'Email required' });

//   if (!users[email]) {
//     users[email] = {
//       isPremium: isPremium ?? false,
//       downloadCount: 0,
//     };
//   }

//   return res.json(users[email]);
// });

// app.get('/api/user/download-count', (req, res) => {
//   const { email } = req.query;
//   if (!email || !users[email]) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   return res.json({
//     downloadCount: users[email].downloadCount,
//     isPremium: users[email].isPremium,
//   });
// });

// app.post('/api/user/increment-download', (req, res) => {
//   const { email } = req.body;

//   if (!email || !users[email]) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   const user = users[email];

//   if (!user.isPremium) {
//     return res.status(403).json({ error: 'User is not premium' });
//   }

//   if (user.downloadCount >= 3) {
//     return res.status(403).json({ error: 'Download limit reached' });
//   }

//   user.downloadCount += 1;
//   return res.json({ message: 'Download count updated', downloadCount: user.downloadCount });
// });


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password', // Use App Password if using Gmail
  }
});

const otpStore = new Map(); // key: email, value: { otp, expiresAt }

// 📌 Google Sheet CSV URL
const csvUrl = "https://docs.google.com/spreadsheets/d/1IPS_a3mB9TN5p6hA2L7laQ2oaZnXiSe6/export?format=csv&gid=1793981291";

app.get('/api/predict', async (req, res) => {
  try {
    const { rank, category, branchCode } = req.query;

    if (!rank || !category || !branchCode) {
      return res.status(400).json({ error: 'Missing query parameters' });
    }

    const response = await axios.get(csvUrl);
    const records = parse(response.data, { relax_column_count: true });

    // Find header index
    const headerRowIndex = records.findIndex(row => 
      row.some(cell => typeof cell === 'string' && cell.toLowerCase().includes("institute name"))
    );
    if (headerRowIndex === -1) {
      return res.status(500).json({ error: 'Header not found' });
    }

    const header = records[headerRowIndex];
    const data = records.slice(headerRowIndex + 1);
    const df = data.map(row => {
      const obj = {};
      header.forEach((col, idx) => {
        obj[col?.trim()] = row[idx]?.trim();
      });
      return obj;
    });

    // Normalize
    const categoryCol = header.find(col => col?.startsWith(category));
    if (!categoryCol) {
      return res.status(404).json({ error: `Category column '${category}' not found` });
    }

    // Filter by required fields
    const eligible = df
      .filter(row => 
        row['Branch Code']?.toUpperCase() === branchCode.toUpperCase() &&
        !isNaN(Number(row[categoryCol])) &&
        Number(row[categoryCol]) >= (Number(rank)-3000)
      )
      .map(row => ({
        college: row['Institute Name'],
        code: row['Inst Code'],
        branch: row['Branch Name'],
        branchCode: row['Branch Code'],
        closingRank: Number(row[categoryCol])
      }))
      .sort((a, b) => a.closingRank - b.closingRank)
      .slice(0, 60);

    return res.json(eligible);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.post('/api/send-otp', async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ error: 'Email is required' });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//   const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

//   otpStore.set(email, { otp, expiresAt });

//   try {
//     await transporter.sendMail({
//       from: '"CP360 Auth" <your-email@gmail.com>',
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP is: ${otp}`,
//     });

//     res.json({ message: 'OTP sent' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });

// app.post('/api/verify-otp', (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

//   const record = otpStore.get(email);
//   if (!record) return res.status(400).json({ error: 'No OTP found for this email' });

//   if (record.otp !== otp) return res.status(401).json({ error: 'Invalid OTP' });
//   if (Date.now() > record.expiresAt) {
//     otpStore.delete(email);
//     return res.status(401).json({ error: 'OTP expired' });
//   }

//   otpStore.delete(email); // Optional: prevent reuse
//   res.json({ message: 'OTP verified' });
// });

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paisa
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    // Signature matches: payment is verified
    return res.json({ message: 'Payment verified successfully' });
  } else {
    // Invalid signature: payment might be tampered
    return res.status(400).json({ error: 'Invalid signature, payment not verified' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ College prediction API running at http://localhost:${PORT}`);
});

