import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Search, 
  FileDown, 
  Filter, 
  BadgeCheck, 
  Settings, 
  ChevronRight 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';


// Student testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'CollegePredict360 helped me find the perfect college for my JEE rank. I got into my dream college!',
    rank: 'JEE Rank: 5,421'
  },
  {
    id: 2,
    name: 'Rahul Patel',
    avatar: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'The PDF report was so helpful in comparing colleges. I showed it to my parents and they were impressed.',
    rank: 'EAMCET Rank: 3,845'
  },
  {
    id: 3,
    name: 'Anjali Reddy',
    avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'The risk level feature helped me pick the right colleges to apply to. Highly recommend!',
    rank: 'EAMCET Rank: 12,103'
  }
];

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();


  // Set page title
  useEffect(() => {
    document.title = 'CollegePredict360 - Predict Your Perfect College';
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section
      <section id="home" className="pt-24 pb-40 md:pt-32 md:pb-52 gradient-bg relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Predict Your Perfect College in Seconds!
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Enter your rank and get a personalized list of top 60 colleges based on real data.
                No more guesswork, just data-driven college predictions.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to={isAuthenticated ? "/predictor" : "/signup"}>
                  <Button size="lg" variant="primary" className="w-full sm:w-auto">
                    Start Now
                  </Button>
                </Link>
                <Link to="/premium">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Students celebrating college admission" 
                className="rounded-lg shadow-xl transform -rotate-2 animate-fade-in -mb-14"
              />
            </div>
          </div>
        </div>
        {/* Wave Separator */}
        {/* <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,138.7C640,139,800,117,960,117.3C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section> */} 

      {/* Hero Section */}
        <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
          {/* Video Carousel Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full absolute top-0 left-0">
              <video 
                key="video1" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover absolute fade-video z-0"
                style={{ animation: 'fadeVideos 30s infinite' }}
              >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
              </video>
              <video 
                key="video2" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover absolute fade-video z-0"
                style={{ animation: 'fadeVideos 30s infinite 10s' }}
              >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
              </video>
              <video 
                key="video3" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover absolute fade-video z-0"
                style={{ animation: 'fadeVideos 30s infinite 20s' }}
              >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-black/50 z-10" />
          </div>

          {/* Foreground Content */}
          <div className="container-custom relative z-20 flex-1 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Predict Your Perfect College in Seconds!
                </h1>
                <p className="text-xl opacity-90 mb-8">
                  Enter your rank and get a personalized list of top 60 colleges based on real data.
                  No more guesswork, just data-driven college predictions.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to={isAuthenticated ? "/predictor" : "/signup"}>
                    <Button size="lg" variant="primary" className="w-full sm:w-auto">
                      Start Now
                    </Button>
                  </Link>
                  <Link to="/premium">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                      View Plans
                    </Button>
                  </Link>
                </div>
              </div>
              {/* <div className="hidden md:block">
                <img 
                  src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Students celebrating college admission" 
                  className="rounded-lg shadow-xl transform -rotate-2 animate-fade-in -mb-14"
                />
              </div> */}
            </div>
          </div>

          {/* Optional wave separator */}
          {/* <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#f9fafb" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,138.7C640,139,800,117,960,117.3C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div> */}
          
        </section>


      {/* How It Works Section */}
      <section className="pt-32 py-16 bg-gray-50" id="how-it-works">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your personalized college predictions in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative animate-fade-in">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-6">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Rank & Preferences</h3>
              <p className="text-gray-600">
                Input your exam score, rank, category, and preferred branches to get started.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">View College Matches</h3>
              <p className="text-gray-600">
                Get a personalized list of colleges with branch and risk level indicators.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-6">
                <FileDown size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Download PDF Report</h3>
              <p className="text-gray-600">
                Save and share your personalized college prediction report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" id="features">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools to help you find your ideal college
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="flex items-start space-x-4 animate-fade-in">
              <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                <Search size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real Cutoff-Based Results</h3>
                <p className="text-gray-600">
                  Our predictions are based on real historical cutoff data from previous years.
                  We analyze trends to provide the most accurate college recommendations.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                <Filter size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customizable Filters</h3>
                <p className="text-gray-600">
                  Filter college results by branch, region, college type, or risk level.
                  Customize your search to find the perfect match for your preferences.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                <BadgeCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Risk Level Indicators</h3>
                <p className="text-gray-600">
                  Each college is tagged with a risk level (Safe, Moderate, or Risky) based on your rank.
                  Easily identify which colleges are within your reach.
                </p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Free + Premium Access</h3>
                <p className="text-gray-600">
                  Get basic predictions for free, or upgrade to Premium for full access to all 60 college matches,
                  PDF downloads, and unlimited predictions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of students who've found their perfect college
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-6 rounded-xl shadow-sm animate-fade-in hover:shadow-md transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.rank}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect College?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who've used CollegePredict360 to find their ideal college match.
          </p>
          <Link to={isAuthenticated ? "/predictor" : "/signup"}>
            {/* <Button 
              size="lg" 
              className="bg-white text-primary-600 hover:bg-gray-100 focus:ring-white"
            >
              Get Started Now <ChevronRight size={20} className="ml-2" />
            </Button> */}
            <Button 
              size="lg" 
              className="bg-primary-600 text-white hover:bg-white hover:text-primary-600 border border-primary-600 transition-colors duration-200 shadow-md hover:shadow-lg focus:ring-4 focus:ring-primary-300"
            >
              Get Started Now <ChevronRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;