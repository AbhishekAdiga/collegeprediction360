import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PredictorInputForm from './pages/PredictorInputForm';
import PredictionResults from './pages/PredictionResults';
import MyReportsPage from './pages/MyReportsPage';
import UserProfilePage from './pages/UserProfilePage';
import SupportPage from './pages/SupportPage';
import PremiumPage from './pages/PremiumPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/predictor" element={
              <ProtectedRoute>
                <PredictorInputForm />
              </ProtectedRoute>
            } />
            <Route path="/results" element={
              <ProtectedRoute>
                <PredictionResults />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <MyReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/support" element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
// import { ToastProvider } from './contexts/ToastContext';

// // Pages
// import LandingPage from './pages/LandingPage';
// import DashboardPage from './pages/DashboardPage';
// import PredictorInputForm from './pages/PredictorInputForm';
// import PredictionResults from './pages/PredictionResults';
// import MyReportsPage from './pages/MyReportsPage';
// import UserProfilePage from './pages/UserProfilePage';
// import SupportPage from './pages/SupportPage';
// import PremiumPage from './pages/PremiumPage';

// // ✅ Get your Clerk publishable key from .env
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Clerk publishable key in .env');
// }

// function App() {
//   return (
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//       <Router>
//         <ToastProvider>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login/*" element={<SignIn routing="path" path="/login" />} />
//             <Route path="/signup/*" element={<SignUp routing="path" path="/signup" />} />
//             <Route path="/premium" element={<PremiumPage />} />

//             {/* Protected Routes using Clerk */}
//             <Route
//               path="/dashboard"
//               element={
//                 <>
//                   <SignedIn>
//                     <DashboardPage />
//                   </SignedIn>
//                   <SignedOut>
//                     <RedirectToSignIn />
//                   </SignedOut>
//                 </>
//               }
//             />
//             <Route
//               path="/predictor"
//               element={
//                 <>
//                   <SignedIn>
//                     <PredictorInputForm />
//                   </SignedIn>
//                   <SignedOut>
//                     <RedirectToSignIn />
//                   </SignedOut>
//                 </>
//               }
//             />
//             <Route
//               path="/results"
//               element={
//                 <>
//                   <SignedIn>
//                     <PredictionResults />
//                   </SignedIn>
//                   <SignedOut>
//                     <RedirectToSignIn />
//                   </SignedOut>
//                 </>
//               }
//             />
//             <Route
//               path="/reports"
//               element={
//                 <>
//                   <SignedIn>
//                     <MyReportsPage />
//                   </SignedIn>
//                   <SignedOut>
//                     <RedirectToSignIn />
//                   </SignedOut>
//                 </>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <>
//                   <SignedIn>
//                     <UserProfilePage />
//                   </SignedIn>
//                   <SignedOut>
//                     <RedirectToSignIn />
//                   </SignedOut>
//                 </>
//               }
//             />
//             <Route
//               path="/support"
//               element={
//                 <>
//                   <SignedIn>
//                     <SupportPage />
//                   </SignedIn>
//                   <SignedOut>
//                     <RedirectToSignIn />
//                   </SignedOut>
//                 </>
//               }
//             />
//           </Routes>
//         </ToastProvider>
//       </Router>
//     </ClerkProvider>
//   );
// }

// export default App;
