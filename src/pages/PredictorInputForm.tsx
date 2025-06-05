import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Info } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useToast } from '../contexts/ToastContext';

const BRANCH_CODE_MAP: { [key: string]: string } = {
  'Computer Science Engineering (CSE)': 'CSE',
  'Electronics & Communication (ECE)': 'ECE',
  'Electrical & Electronics (EEE)': 'EEE',
  'Mechanical Engineering': 'MEC',
  'Civil Engineering': 'CIV',
  'Information Technology (IT)': 'INF',
  'Chemical Engineering': 'CHE',
  'Biotechnology': 'BIO',
  'Aeronautical Engineering': 'ANE',
  'Artificial Intelligence & ML': 'AIM',
  'Data Science': 'CSD',
  'Computer science and Machine Learning (CSM)': 'CSM',
  'Bio medical engineering': 'BME',
  'Computer science and design': 'CSG',
  'Electronics and telematics': 'ETM',  
  'Computer science and busines system': 'CSB',
  'Computer science Engineering(IOT)': 'CSO',
  'Metallurgical Engineering': 'MET',
};


// Form options
const EXAM_TYPES = ['EAMCET', 'JEE Mains'];
const CATEGORIES = ['OC', 'BC_A', 'BC_B', 'BC_C', 'BC_D', 'BC_E', 'SC', 'ST'];
const REGIONS = ['OU', 'AU', 'SVU'];
const ACADEMIC_YEARS = ['2025-26', '2024-25', '2023-24'];
const BRANCHES = [
  'Computer Science Engineering (CSE)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology (IT)',
  'Chemical Engineering',
  'Biotechnology',
  'Aeronautical Engineering',
  'Artificial Intelligence & ML',
  'Data Science',
  'Computer science and Machine Learning (CSM)',
  'Bio medical engineering',
  'Computer science and design',
  'Electronics and telematics',
  'Computer science and busines system',
  'Computer science Engineering(IOT)',
  'Metallurgical Engineering',
];

interface FormData {
  examType: string;
  rank: string;
  category: string;
  gender: string;
  region: string;
  branches: string[];
  preferredColleges: string;
  academicYear: string;
  email: string;
}

const PredictorInputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    examType: EXAM_TYPES[0],
    rank: '',
    category: CATEGORIES[0],
    gender: 'Male',
    region: REGIONS[0],
    branches: [],
    preferredColleges: '',
    academicYear: ACADEMIC_YEARS[0],
    email: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = 'College Predictor - CollegePredict360';
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleBranchChange = (branch: string) => {
    if (formData.branches.includes(branch)) {
      setFormData({
        ...formData,
        branches: formData.branches.filter(b => b !== branch),
      });
    } else {
      setFormData({
        ...formData,
        branches: [...formData.branches, branch],
      });
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.rank) {
      newErrors.rank = 'Rank is required';
    } else if (isNaN(Number(formData.rank)) || Number(formData.rank) <= 0) {
      newErrors.rank = 'Rank must be a positive number';
    }

    if (formData.branches.length === 0) {
      newErrors.branches = 'Please select at least one branch';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Store form data in sessionStorage for use in results page
    // sessionStorage.setItem('predictionData', JSON.stringify(formData));
    const transformedData = {
      ...formData,
      branches: formData.branches.map(branch => BRANCH_CODE_MAP[branch] || branch)
    };
    sessionStorage.setItem('predictionData', JSON.stringify(transformedData));
    
    
    // Simulate API call delay
    setTimeout(() => {
      showToast('Prediction generated successfully!', 'success');
      setIsSubmitting(false);
      navigate('/results');
    }, 1500);
  };

  return (
    <DashboardLayout pageTitle="College Predictor">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <div className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg mb-6">
            <Info size={24} className="text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">How It Works</h3>
              <p className="text-gray-600 text-sm">
                Enter your rank and preferences to get a personalized list of college matches.
                For the most accurate predictions, please provide all requested information.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Exam Type */}
              <div>
                <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Type*
                </label>
                <select
                  id="examType"
                  name="examType"
                  value={formData.examType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {EXAM_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Rank */}
              <div>
                <Input
                  label="Rank*"
                  type="number"
                  id="rank"
                  name="rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                  placeholder="Enter your rank"
                  error={errors.rank}
                  required
                />
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender*
                </label>
                <div className="flex space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === 'Male'}
                      onChange={handleRadioChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === 'Female'}
                      onChange={handleRadioChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === 'Other'}
                      onChange={handleRadioChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Other</span>
                  </label>
                </div>
              </div>
              
              {/* Region */}
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region*
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              {/* Academic Year */}
              <div>
                <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year*
                </label>
                <select
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {ACADEMIC_YEARS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Branches */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Branches*
              </label>
              <p className="text-xs text-gray-500 mb-1">Please search and select each branch separately for accurate results.</p>
              {errors.branches && (
                <p className="text-error-600 text-sm mb-1">{errors.branches}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 mt-2">
                {BRANCHES.map((branch) => (
                  <label key={branch} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.branches.includes(branch)}
                      onChange={() => handleBranchChange(branch)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{branch}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Preferred Colleges*/}
            {/* <div className="mt-6">
              <label htmlFor="preferredColleges" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Colleges (Optional)
              </label>
              <textarea
                id="preferredColleges"
                name="preferredColleges"
                value={formData.preferredColleges}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter names of specific colleges you're interested in (e.g., JNTU, VIT, etc.)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              ></textarea>
            </div> */}
            
            {/* Email */}
            {/* <div className="mt-6">
              <Input
                label="Email (Optional)"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="To receive your prediction report by email"
                helperText="We'll never share your email with anyone else."
              />
            </div> */}
             
             {/* Advertisement Videos Section */}
             <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sponsored Video
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="rounded-lg shadow-md w-full max-h-64 object-cover"
                  controls={false}
                >
                  <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="rounded-lg shadow-md w-full max-h-64 object-cover"
                  controls={false}
                >
                  <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>


            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                Get My Web Options List
              </Button>
            </div>
          </form>
          <div className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg mb-6 mt-10">
            <Info size={24} className="text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-700">Disclaimer : </span>
                This College Predictor Counselling Report is generated based on last year's college and branch-wise cut-off data of B.Tech & TS EAMCET counselling. Experts at mycollegepredictor have evaluated the colleges on multiple parameters to provide this result. We are committed to offering unbiased advice to students. However, mycollegepredictor makes no guarantee that you will definitely secure admission in the predicted branch/college, as actual outcomes depend on preferences exercised by thousands of students during the real-time counselling process. By subscribing to this report, you acknowledge and accept that mycollegepredictor is serving purely an advisory role and that all final decisions are yours. mycollegepredictor will not be held responsible for any of your decisions, actions, or their consequences.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PredictorInputForm;