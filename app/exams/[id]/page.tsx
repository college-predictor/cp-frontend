'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Award, 
  BookOpen, 
  Calendar,
  Clock,
  Target,
  Star,
  TrendingUp,
  ExternalLink,
  Download,
  Share,
  Bookmark,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Building,
  GraduationCap,
  DollarSign,
  Home,
  Wifi,
  Coffee,
  Car,
  Heart,
  Camera,
  FileText,
  Newspaper,
  Music,
  PartyPopper,
  Trophy,
  Briefcase,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface ExamDetailPageProps {
  params: {
    id: string;
  };
}

const ExamDetailPage = ({ params }: ExamDetailPageProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Sample exam data - in real app, this would be fetched based on the ID
  const examData = {
    id: 1,
    name: 'Joint Entrance Examination Main',
    shortName: 'JEE Main',
    icon: '🔧',
    category: 'Engineering',
    level: 'Undergraduate',
    
    // Basic Information
    conductedBy: 'National Testing Agency (NTA)',
    establishedYear: 2013,
    headquarters: 'New Delhi, India',
    examDate: '2024-01-24',
    applicationStart: '2023-12-01',
    applicationEnd: '2024-01-15',
    resultDate: '2024-02-15',
    frequency: 'Twice a year',
    mode: 'Computer Based Test',
    duration: '3 hours',
    language: ['Hindi', 'English', 'Gujarati', 'Marathi', 'Bengali', 'Assamese', 'Punjabi', 'Malayalam', 'Kannada', 'Tamil', 'Telugu', 'Urdu'],
    
    // Contact Information
    contact: {
      address: 'National Testing Agency, M-Block, Connaught Circus, New Delhi - 110001',
      phone: '+91-11-4075-9000',
      email: 'ntajeemain@gmail.com',
      helpdesk: '+91-11-6922-7700',
      website: 'https://jeemain.nta.nic.in',
      socialMedia: {
        facebook: 'https://www.facebook.com/nta.ac.in',
        twitter: 'https://twitter.com/ntaofficial',
        youtube: 'https://www.youtube.com/channel/UCl-BNlq1EbCvE8jbxLYCXDA',
        linkedin: 'https://www.linkedin.com/company/national-testing-agency'
      }
    },

    // Statistics
    statistics: {
      totalApplicants: 1200000,
      totalSeats: 100000,
      acceptanceRate: 8.3,
      averageScore: 89,
      topScore: 300,
      participatingInstitutes: 100
    },

    // Location & Nearby Places
    location: {
      examCenters: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'],
      nearbyPlaces: [
        { name: 'Connaught Place', distance: '2 km', type: 'Shopping' },
        { name: 'India Gate', distance: '5 km', type: 'Monument' },
        { name: 'Red Fort', distance: '8 km', type: 'Historical' },
        { name: 'Lodhi Gardens', distance: '12 km', type: 'Park' }
      ]
    },

    // Eligibility & Requirements
    eligibility: {
      qualification: '10+2 with Physics, Chemistry, Mathematics',
      minimumMarks: '75% for General, 65% for SC/ST',
      ageLimit: 'No age limit',
      attempts: 'No limit on attempts',
      nationality: 'Indian/OCI/PIO/Foreign nationals'
    },

    // Exam Pattern
    examPattern: {
      totalQuestions: 90,
      totalMarks: 300,
      duration: '3 hours',
      sections: [
        { name: 'Physics', questions: 30, marks: 100, duration: '1 hour' },
        { name: 'Chemistry', questions: 30, marks: 100, duration: '1 hour' },
        { name: 'Mathematics', questions: 30, marks: 100, duration: '1 hour' }
      ],
      markingScheme: '+4 for correct, -1 for incorrect',
      negativeMarking: true
    },

    // Syllabus
    syllabus: {
      physics: ['Mechanics', 'Thermodynamics', 'Waves and Optics', 'Electricity and Magnetism', 'Modern Physics'],
      chemistry: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry'],
      mathematics: ['Algebra', 'Trigonometry', 'Coordinate Geometry', 'Calculus', 'Statistics', 'Probability']
    },

    // Participating Institutes
    institutes: [
      {
        name: 'Indian Institute of Technology, Delhi',
        type: 'IIT',
        location: 'New Delhi',
        rating: 4.8,
        totalSeats: 900,
        cutoff: 250,
        fees: '₹2,08,000 per year',
        image: '/api/placeholder/300/200'
      },
      {
        name: 'National Institute of Technology, Trichy',
        type: 'NIT',
        location: 'Tamil Nadu',
        rating: 4.6,
        totalSeats: 700,
        cutoff: 220,
        fees: '₹1,55,000 per year',
        image: '/api/placeholder/300/200'
      },
      {
        name: 'Indian Institute of Information Technology, Hyderabad',
        type: 'IIIT',
        location: 'Hyderabad',
        rating: 4.5,
        totalSeats: 500,
        cutoff: 200,
        fees: '₹3,50,000 per year',
        image: '/api/placeholder/300/200'
      }
    ],

    // Scholarships
    scholarships: [
      {
        name: 'Merit-cum-Means Scholarship',
        provider: 'MHRD',
        amount: '₹1,000 per month',
        eligibility: 'Family income < ₹1 lakh',
        deadline: '2024-03-31'
      },
      {
        name: 'National Scholarship Portal',
        provider: 'Government of India',
        amount: '₹12,000 per year',
        eligibility: 'SC/ST/OBC candidates',
        deadline: '2024-04-15'
      },
      {
        name: 'INSPIRE Scholarship',
        provider: 'DST',
        amount: '₹80,000 per year',
        eligibility: 'Top 1% in Class 12',
        deadline: '2024-05-30'
      }
    ],

    // Latest News
    news: [
      {
        id: 1,
        title: 'JEE Main 2024 Registration Extended Until January 15',
        summary: 'NTA extends registration deadline due to technical issues...',
        date: '2024-01-10',
        category: 'Registration',
        source: 'Official Notification',
        importance: 'high'
      },
      {
        id: 2,
        title: 'New Exam Centers Added in Northeast States',
        summary: 'Additional centers in Assam, Meghalaya, and Tripura...',
        date: '2024-01-08',
        category: 'Exam Centers',
        source: 'NTA Updates',
        importance: 'medium'
      },
      {
        id: 3,
        title: 'Syllabus Changes for Mathematics Section',
        summary: 'Minor modifications in coordinate geometry topics...',
        date: '2024-01-05',
        category: 'Syllabus',
        source: 'Academic Update',
        importance: 'medium'
      }
    ],

    // Success Stories
    successStories: [
      {
        name: 'Arjun Kumar',
        score: 300,
        rank: 1,
        institute: 'IIT Delhi',
        branch: 'Computer Science',
        year: 2023,
        quote: 'Consistent practice and mock tests were key to my success.',
        image: '/api/placeholder/150/150'
      },
      {
        name: 'Priya Sharma',
        score: 295,
        rank: 15,
        institute: 'IIT Bombay',
        branch: 'Electrical Engineering',
        year: 2023,
        quote: 'Time management during the exam made all the difference.',
        image: '/api/placeholder/150/150'
      }
    ],

    // Preparation Resources
    preparation: {
      recommendedBooks: [
        { title: 'Concepts of Physics', author: 'H.C. Verma', subject: 'Physics', rating: 4.8 },
        { title: 'Organic Chemistry', author: 'O.P. Tandon', subject: 'Chemistry', rating: 4.6 },
        { title: 'Higher Algebra', author: 'Hall and Knight', subject: 'Mathematics', rating: 4.7 }
      ],
      onlinePlatforms: [
        { name: 'Unacademy', rating: 4.5, price: '₹999/month' },
        { name: "BYJU'S", rating: 4.3, price: '₹1,200/month' },
        { name: 'Vedantu', rating: 4.4, price: '₹800/month' }
      ],
      coachingInstitutes: [
        { name: 'Allen Career Institute', location: 'Kota', rating: 4.7, fees: '₹1,50,000/year' },
        { name: 'Aakash Institute', location: 'Pan India', rating: 4.5, fees: '₹1,20,000/year' },
        { name: 'FIITJEE', location: 'Multiple Cities', rating: 4.6, fees: '₹1,80,000/year' }
      ]
    },

    // Reviews & Ratings
    reviews: {
      overall: 4.3,
      difficulty: 4.5,
      fairness: 4.2,
      organization: 4.1,
      totalReviews: 15420,
      distribution: {
        5: 6200,
        4: 4800,
        3: 2900,
        2: 1100,
        1: 420
      }
    },

    // Events & Important Dates
    events: [
      { name: 'Registration Opens', date: '2023-12-01', status: 'completed' },
      { name: 'Last Date to Apply', date: '2024-01-15', status: 'ongoing' },
      { name: 'Admit Card Release', date: '2024-01-20', status: 'upcoming' },
      { name: 'Exam Date (Session 1)', date: '2024-01-24', status: 'upcoming' },
      { name: 'Result Declaration', date: '2024-02-15', status: 'upcoming' }
    ],

    // FAQ
    faq: [
      {
        question: 'How many times can I attempt JEE Main?',
        answer: 'There is no limit on the number of attempts for JEE Main. You can appear for the exam as many times as you want.'
      },
      {
        question: 'Is there negative marking in JEE Main?',
        answer: 'Yes, there is negative marking. You get +4 marks for correct answers and -1 mark for incorrect answers.'
      },
      {
        question: 'Can I change my exam center after registration?',
        answer: 'No, you cannot change your exam center after completing the registration process.'
      }
    ]
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Info },
    { id: 'pattern', name: 'Exam Pattern', icon: FileText },
    { id: 'institutes', name: 'Institutes', icon: Building },
    { id: 'preparation', name: 'Preparation', icon: BookOpen },
    { id: 'news', name: 'Latest News', icon: Newspaper },
    { id: 'reviews', name: 'Reviews', icon: Star },
  ];

  const renderStarRating = (rating: number, size: string = 'w-4 h-4') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <span className="text-4xl">{examData.icon}</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{examData.name}</h1>
                <p className="text-lg opacity-90">{examData.shortName} • {examData.category} • {examData.level}</p>
                <p className="text-sm opacity-75 mt-1">Conducted by {examData.conductedBy}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </button>
              <button className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{examData.statistics.totalApplicants.toLocaleString()}</div>
              <div className="text-sm opacity-75">Total Applicants</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{examData.statistics.acceptanceRate}%</div>
              <div className="text-sm opacity-75">Acceptance Rate</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{examData.examPattern.totalMarks}</div>
              <div className="text-sm opacity-75">Total Marks</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{examData.statistics.participatingInstitutes}+</div>
              <div className="text-sm opacity-75">Institutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Exam Date:
                        </span>
                        <span className="font-semibold">{new Date(examData.examDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Duration:
                        </span>
                        <span className="font-semibold">{examData.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Target className="h-4 w-4 mr-2" />
                          Mode:
                        </span>
                        <span className="font-semibold">{examData.mode}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          Frequency:
                        </span>
                        <span className="font-semibold">{examData.frequency}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Application Start:</span>
                        <span className="font-semibold">{new Date(examData.applicationStart).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Application End:</span>
                        <span className="font-semibold">{new Date(examData.applicationEnd).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Result Date:</span>
                        <span className="font-semibold">{new Date(examData.resultDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Established:</span>
                        <span className="font-semibold">{examData.establishedYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Address</p>
                          <p className="text-gray-600 text-sm">{examData.contact.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Phone</p>
                          <p className="text-gray-600 text-sm">{examData.contact.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Email</p>
                          <p className="text-gray-600 text-sm">{examData.contact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Website</p>
                          <a href={examData.contact.website} className="text-blue-600 text-sm hover:underline">
                            {examData.contact.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href={examData.contact.socialMedia.facebook} className="text-blue-600 hover:text-blue-700">
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a href={examData.contact.socialMedia.twitter} className="text-blue-400 hover:text-blue-500">
                        <Twitter className="h-6 w-6" />
                      </a>
                      <a href={examData.contact.socialMedia.youtube} className="text-red-600 hover:text-red-700">
                        <Youtube className="h-6 w-6" />
                      </a>
                      <a href={examData.contact.socialMedia.linkedin} className="text-blue-700 hover:text-blue-800">
                        <Linkedin className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Eligibility Criteria</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Educational Qualification</p>
                        <p className="text-gray-600">{examData.eligibility.qualification}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Minimum Marks</p>
                        <p className="text-gray-600">{examData.eligibility.minimumMarks}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Age Limit</p>
                        <p className="text-gray-600">{examData.eligibility.ageLimit}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Number of Attempts</p>
                        <p className="text-gray-600">{examData.eligibility.attempts}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Events Timeline */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Important Dates</h2>
                  <div className="space-y-4">
                    {examData.events.map((event, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                        <div className={`w-3 h-3 rounded-full ${
                          event.status === 'completed' ? 'bg-green-500' :
                          event.status === 'ongoing' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{event.name}</p>
                          <p className="text-gray-600 text-sm">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.status === 'completed' ? 'bg-green-100 text-green-600' :
                          event.status === 'ongoing' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Exam Pattern Tab */}
            {activeTab === 'pattern' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam Pattern</h2>
                  
                  {/* Pattern Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{examData.examPattern.totalQuestions}</div>
                      <div className="text-gray-600">Total Questions</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{examData.examPattern.totalMarks}</div>
                      <div className="text-gray-600">Total Marks</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{examData.examPattern.duration}</div>
                      <div className="text-gray-600">Duration</div>
                    </div>
                  </div>

                  {/* Section-wise Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Section-wise Distribution</h3>
                    {examData.examPattern.sections.map((section, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{section.name}</h4>
                          <span className="text-sm text-gray-600">{section.duration}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Questions: </span>
                            <span className="font-medium">{section.questions}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Marks: </span>
                            <span className="font-medium">{section.marks}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Marking Scheme */}
                  <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Marking Scheme</h3>
                    <p className="text-gray-700">{examData.examPattern.markingScheme}</p>
                    {examData.examPattern.negativeMarking && (
                      <p className="text-red-600 text-sm mt-1">⚠️ Negative marking applicable</p>
                    )}
                  </div>
                </div>

                {/* Syllabus */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Syllabus</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(examData.syllabus).map(([subject, topics]) => (
                      <div key={subject} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 capitalize">{subject}</h3>
                        <ul className="space-y-2">
                          {(topics as string[]).map((topic, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Institutes Tab */}
            {activeTab === 'institutes' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Participating Institutes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {examData.institutes.map((institute, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                            {institute.type}
                          </div>
                          <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-semibold">{institute.rating}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-2">{institute.name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                Location:
                              </span>
                              <span className="font-medium">{institute.location}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Total Seats:</span>
                              <span className="font-medium">{institute.totalSeats}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Cutoff:</span>
                              <span className="font-medium">{institute.cutoff}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Fees:</span>
                              <span className="font-medium">{institute.fees}</span>
                            </div>
                          </div>
                          <Link href={`/colleges/${institute.name.toLowerCase().replace(/\s+/g, '-')}`} className="mt-4 block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preparation Tab */}
            {activeTab === 'preparation' && (
              <div className="space-y-8">
                {/* Recommended Books */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Books</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {examData.preparation.recommendedBooks.map((book, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">{book.title}</h3>
                            <p className="text-gray-600 text-sm">by {book.author}</p>
                          </div>
                          {renderStarRating(book.rating)}
                        </div>
                        <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                          {book.subject}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Online Platforms */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Online Learning Platforms</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {examData.preparation.onlinePlatforms.map((platform, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                        <h3 className="font-semibold text-gray-800 mb-2">{platform.name}</h3>
                        <div className="flex items-center justify-center mb-2">
                          {renderStarRating(platform.rating)}
                          <span className="ml-2 text-sm text-gray-600">({platform.rating})</span>
                        </div>
                        <p className="text-blue-600 font-semibold">{platform.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coaching Institutes */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Coaching Institutes</h2>
                  <div className="space-y-4">
                    {examData.preparation.coachingInstitutes.map((institute, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{institute.name}</h3>
                          <div className="flex items-center">
                            {renderStarRating(institute.rating)}
                            <span className="ml-2 text-sm text-gray-600">({institute.rating})</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Location: </span>
                            <span className="font-medium">{institute.location}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Fees: </span>
                            <span className="font-medium">{institute.fees}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scholarships */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Scholarships</h2>
                  <div className="space-y-4">
                    {examData.scholarships.map((scholarship, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">{scholarship.name}</h3>
                            <p className="text-gray-600 text-sm">by {scholarship.provider}</p>
                          </div>
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                            {scholarship.amount}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Eligibility: </span>
                            <span className="font-medium">{scholarship.eligibility}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Deadline: </span>
                            <span className="font-medium">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Latest News Tab */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest News & Updates</h2>
                  <div className="space-y-4">
                    {examData.news.map((newsItem) => (
                      <div key={newsItem.id} className={`border-l-4 p-4 rounded-r-lg ${getImportanceColor(newsItem.importance)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{newsItem.title}</h3>
                          <span className="text-xs text-gray-500">{new Date(newsItem.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{newsItem.summary}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                              {newsItem.category}
                            </span>
                            <span className="text-xs text-gray-500">{newsItem.source}</span>
                          </div>
                          <Link href={`/news/${newsItem.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Read More →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Overall Rating */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews & Ratings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{examData.reviews.overall}</div>
                      <div className="flex items-center justify-center mb-2">
                        {renderStarRating(examData.reviews.overall, 'w-6 h-6')}
                      </div>
                      <p className="text-gray-600">Based on {examData.reviews.totalReviews.toLocaleString()} reviews</p>
                    </div>
                    
                    <div className="space-y-3">
                      {Object.entries(examData.reviews.distribution).reverse().map(([star, count]) => (
                        <div key={star} className="flex items-center space-x-3">
                          <span className="text-sm font-medium">{star} ★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ width: `${(count / examData.reviews.totalReviews) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{count.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating Categories */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">{examData.reviews.difficulty}</div>
                      <div className="text-sm text-gray-600">Difficulty</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">{examData.reviews.fairness}</div>
                      <div className="text-sm text-gray-600">Fairness</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">{examData.reviews.organization}</div>
                      <div className="text-sm text-gray-600">Organization</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">{examData.reviews.overall}</div>
                      <div className="text-sm text-gray-600">Overall</div>
                    </div>
                  </div>
                </div>

                {/* Success Stories */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Success Stories</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {examData.successStories.map((story, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {story.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{story.name}</h3>
                            <p className="text-gray-600 text-sm">Rank {story.rank} • Score: {story.score}</p>
                            <p className="text-blue-600 text-sm">{story.institute} • {story.branch}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 italic">"{story.quote}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="space-y-6 sticky top-32">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Brochure
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </button>
                </div>
              </div>

              {/* Exam Centers */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Exam Centers</h3>
                <div className="space-y-2">
                  {examData.location.examCenters.slice(0, 6).map((center, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{center}</span>
                      <MapPin className="h-3 w-3 text-gray-400" />
                    </div>
                  ))}
                  <button className="text-blue-600 text-sm hover:underline">View all centers</button>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Available Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {examData.language.slice(0, 6).map((lang, index) => (
                    <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                  {examData.language.length > 6 && (
                    <span className="text-blue-600 text-xs">+{examData.language.length - 6} more</span>
                  )}
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {examData.faq.slice(0, 2).map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <p className="font-medium text-gray-800 text-sm mb-1">{faq.question}</p>
                      <p className="text-gray-600 text-xs">{faq.answer.substring(0, 100)}...</p>
                    </div>
                  ))}
                  <Link href="#" className="text-blue-600 text-sm hover:underline">View all FAQs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailPage;