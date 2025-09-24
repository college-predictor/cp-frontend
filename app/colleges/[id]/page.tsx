'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, Phone, Mail, Globe, Star, Users, Calendar, Award, 
  BookOpen, Home, TrendingUp, Heart, Share2, Bookmark, 
  ExternalLink, ChevronRight, Play, Image as ImageIcon,
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  GraduationCap, Building, Briefcase, Trophy, Clock,
  DollarSign, Activity, Coffee, Wifi, Car, Shield,
  Camera, Video, FileText, Download, Eye, MessageCircle,
  ThumbsUp, MapPin as LocationIcon, Navigation
} from 'lucide-react';

interface CollegeData {
  id: number;
  name: string;
  shortName: string;
  established: number;
  type: 'Public' | 'Private' | 'Deemed';
  category: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    phone: string[];
    email: string[];
    website: string;
    admissionHelpline: string;
  };
  ratings: {
    overall: number;
    academics: number;
    infrastructure: number;
    faculty: number;
    placement: number;
    hostelLife: number;
    socialLife: number;
    totalReviews: number;
  };
  fees: {
    tuition: string;
    hostel: string;
    other: string;
    total: string;
  };
  placement: {
    averagePackage: string;
    highestPackage: string;
    placementRate: number;
    topRecruiters: string[];
  };
  academics: {
    courses: {
      undergraduate: string[];
      postgraduate: string[];
      phd: string[];
    };
    departments: string[];
    facultyCount: number;
    studentFacultyRatio: string;
  };
  infrastructure: {
    campus: {
      area: string;
      buildings: number;
      labs: number;
      libraries: number;
    };
    facilities: string[];
    hostel: {
      capacity: number;
      rooms: string;
      facilities: string[];
    };
  };
  socialMedia: {
    official: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
      linkedin?: string;
    };
    student: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
  };
  images: {
    campus: string[];
    hostel: string[];
    facilities: string[];
    events: string[];
  };
  alumniNetwork: {
    totalAlumni: number;
    notableAlumni: Array<{
      name: string;
      position: string;
      company: string;
      image: string;
    }>;
  };
  clubs: string[];
  events: Array<{
    name: string;
    type: string;
    description: string;
    date: string;
    image: string;
  }>;
  scholarships: Array<{
    name: string;
    amount: string;
    eligibility: string;
    description: string;
  }>;
  nearbyPlaces: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  news: Array<{
    title: string;
    date: string;
    category: string;
    excerpt: string;
    image: string;
  }>;
  startups: Array<{
    name: string;
    founder: string;
    description: string;
    funding: string;
    image: string;
  }>;
  funding: {
    totalFunding: string;
    sources: string[];
    recentGrants: Array<{
      amount: string;
      source: string;
      purpose: string;
      year: number;
    }>;
  };
}

const CollegePage = () => {
  const params = useParams();
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageCategory, setSelectedImageCategory] = useState('campus');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data - In a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API call
    const mockCollegeData: CollegeData = {
      id: parseInt(params.id as string),
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      established: 1961,
      type: 'Public',
      category: 'Engineering',
      location: {
        address: 'Hauz Khas, New Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110016',
        coordinates: { lat: 28.5449, lng: 77.1929 }
      },
      contact: {
        phone: ['+91-11-2659-1999', '+91-11-2659-1000'],
        email: ['info@iitd.ac.in', 'admissions@iitd.ac.in'],
        website: 'https://www.iitd.ac.in',
        admissionHelpline: '+91-11-2659-1945'
      },
      ratings: {
        overall: 4.8,
        academics: 4.9,
        infrastructure: 4.7,
        faculty: 4.8,
        placement: 4.9,
        hostelLife: 4.5,
        socialLife: 4.6,
        totalReviews: 2453
      },
      fees: {
        tuition: '₹2,50,000',
        hostel: '₹25,000',
        other: '₹15,000',
        total: '₹2,90,000'
      },
      placement: {
        averagePackage: '₹25 LPA',
        highestPackage: '₹2.1 Cr',
        placementRate: 95,
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey', 'Flipkart']
      },
      academics: {
        courses: {
          undergraduate: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Electrical', 'B.Tech Civil'],
          postgraduate: ['M.Tech', 'MBA', 'M.Sc', 'M.Des'],
          phd: ['Ph.D in Engineering', 'Ph.D in Science', 'Ph.D in Management']
        },
        departments: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Chemical', 'Aerospace'],
        facultyCount: 450,
        studentFacultyRatio: '1:8'
      },
      infrastructure: {
        campus: {
          area: '325 acres',
          buildings: 45,
          labs: 120,
          libraries: 6
        },
        facilities: ['Wi-Fi Campus', 'Sports Complex', 'Medical Center', 'Cafeterias', 'Bank', 'Post Office'],
        hostel: {
          capacity: 8000,
          rooms: 'Single & Double',
          facilities: ['Wi-Fi', 'Mess', 'Common Room', 'Gym', 'Laundry']
        }
      },
      socialMedia: {
        official: {
          facebook: 'https://facebook.com/iitdelhi',
          twitter: 'https://twitter.com/iitdelhi',
          instagram: 'https://instagram.com/iitdelhi',
          youtube: 'https://youtube.com/iitdelhi',
          linkedin: 'https://linkedin.com/school/iitdelhi'
        },
        student: {
          facebook: 'https://facebook.com/iitdelhistudents',
          instagram: 'https://instagram.com/iitd_students',
          youtube: 'https://youtube.com/iitdstudentlife'
        }
      },
      images: {
        campus: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
        hostel: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
        facilities: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
        events: ['/api/placeholder/800/600', '/api/placeholder/800/600']
      },
      alumniNetwork: {
        totalAlumni: 50000,
        notableAlumni: [
          { name: 'Sundar Pichai', position: 'CEO', company: 'Google', image: '/api/placeholder/100/100' },
          { name: 'Vinod Khosla', position: 'Co-founder', company: 'Sun Microsystems', image: '/api/placeholder/100/100' },
          { name: 'Rajat Gupta', position: 'Former MD', company: 'McKinsey', image: '/api/placeholder/100/100' }
        ]
      },
      clubs: ['Robotics Club', 'Photography Club', 'Drama Club', 'Music Society', 'Literary Society', 'Coding Club'],
      events: [
        { name: 'Rendezvous', type: 'Cultural Fest', description: 'Annual cultural festival', date: '2024-03-15', image: '/api/placeholder/400/300' },
        { name: 'Tryst', type: 'Tech Fest', description: 'Technical festival', date: '2024-02-20', image: '/api/placeholder/400/300' }
      ],
      scholarships: [
        { name: 'Merit Scholarship', amount: '₹50,000', eligibility: 'Top 10%', description: 'For meritorious students' },
        { name: 'Need-based Aid', amount: '₹1,00,000', eligibility: 'Family income < 5 LPA', description: 'Financial assistance' }
      ],
      nearbyPlaces: [
        { name: 'Green Park Metro', distance: '2 km', type: 'Transport' },
        { name: 'Deer Park', distance: '1 km', type: 'Recreation' },
        { name: 'INA Market', distance: '3 km', type: 'Shopping' }
      ],
      news: [
        { title: 'IIT Delhi ranks #1 in engineering', date: '2024-01-15', category: 'Rankings', excerpt: 'Latest NIRF rankings released', image: '/api/placeholder/300/200' },
        { title: 'New AI research center inaugurated', date: '2024-01-10', category: 'Research', excerpt: 'State-of-the-art facility opened', image: '/api/placeholder/300/200' }
      ],
      startups: [
        { name: 'Zomato', founder: 'Deepinder Goyal', description: 'Food delivery platform', funding: '$2B+', image: '/api/placeholder/200/150' },
        { name: 'Paytm', founder: 'Vijay Shekhar Sharma', description: 'Digital payments', funding: '$3B+', image: '/api/placeholder/200/150' }
      ],
      funding: {
        totalFunding: '₹500 Cr',
        sources: ['Government of India', 'Private Donations', 'Research Grants'],
        recentGrants: [
          { amount: '₹50 Cr', source: 'MHRD', purpose: 'Infrastructure Development', year: 2024 },
          { amount: '₹25 Cr', source: 'DST', purpose: 'Research Projects', year: 2023 }
        ]
      }
    };

    setCollege(mockCollegeData);
  }, [params.id]);

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'campus', label: 'Campus Life', icon: Home },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: 'reviews', label: 'Reviews', icon: MessageCircle },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'news', label: 'News', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {college.type} • {college.category}
                </div>
                <div className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Est. {college.established}
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{college.name}</h1>
              <p className="text-xl opacity-90 mb-6 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {college.location.address}, {college.location.city}, {college.location.state}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold">{college.ratings.overall}</span>
                  <span className="ml-1 opacity-75">({college.ratings.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span>{college.placement.averagePackage} avg package</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{college.placement.placementRate}% placement rate</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
                <button className="flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
                <Link
                  href={college.contact.website}
                  target="_blank"
                  className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Official Website
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="opacity-75">Total Students:</span>
                    <span className="font-semibold">8,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Campus Area:</span>
                    <span className="font-semibold">{college.infrastructure.campus.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Faculty:</span>
                    <span className="font-semibold">{college.academics.facultyCount}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Annual Fees:</span>
                    <span className="font-semibold">{college.fees.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* About Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About {college.shortName}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {college.name} is one of India's premier institutions of higher learning and research. 
                    Established in {college.established}, it has been at the forefront of engineering education 
                    and technological innovation for over six decades. The institute is renowned for its 
                    rigorous academic programs, world-class faculty, and outstanding alumni who have made 
                    significant contributions to various fields globally.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Key Highlights</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <Award className="h-4 w-4 text-blue-500 mr-2" />
                          NIRF Ranking: #2 (Engineering)
                        </li>
                        <li className="flex items-center">
                          <Trophy className="h-4 w-4 text-blue-500 mr-2" />
                          Institute of National Importance
                        </li>
                        <li className="flex items-center">
                          <GraduationCap className="h-4 w-4 text-blue-500 mr-2" />
                          NAAC Grade: A++
                        </li>
                        <li className="flex items-center">
                          <Globe className="h-4 w-4 text-blue-500 mr-2" />
                          International Collaborations: 100+
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Recognition</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• QS World University Rankings: Top 200</li>
                        <li>• Times Higher Education Rankings</li>
                        <li>• Best Engineering Institute Award</li>
                        <li>• Research Excellence Recognition</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Latest News */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest News</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {college.news.map((newsItem, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img src={newsItem.image} alt={newsItem.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                              {newsItem.category}
                            </span>
                            <span className="text-gray-500 text-xs">{newsItem.date}</span>
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-2">{newsItem.title}</h3>
                          <p className="text-gray-600 text-sm">{newsItem.excerpt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alumni Network */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Notable Alumni</h2>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600">{college.alumniNetwork.totalAlumni.toLocaleString()}+</div>
                    <div className="text-gray-600">Alumni Worldwide</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {college.alumniNetwork.notableAlumni.map((alumni, index) => (
                      <div key={index} className="text-center">
                        <img src={alumni.image} alt={alumni.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                        <h3 className="font-semibold text-gray-800">{alumni.name}</h3>
                        <p className="text-sm text-gray-600">{alumni.position}</p>
                        <p className="text-sm text-blue-600">{alumni.company}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Startups */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Successful Startups</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {college.startups.map((startup, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                          <img src={startup.image} alt={startup.name} className="w-12 h-12 rounded-lg mr-3 object-cover" />
                          <div>
                            <h3 className="font-semibold text-gray-800">{startup.name}</h3>
                            <p className="text-sm text-gray-600">Founded by {startup.founder}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{startup.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                            {startup.funding} funding
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="space-y-8">
                {/* Departments */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Departments</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.academics.departments.map((dept, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800">{dept}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Courses Offered</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Undergraduate Programs</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {college.academics.courses.undergraduate.map((course, index) => (
                          <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-blue-600 mr-3" />
                            <span className="text-gray-700">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Postgraduate Programs</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {college.academics.courses.postgraduate.map((course, index) => (
                          <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                            <Award className="h-5 w-5 text-green-600 mr-3" />
                            <span className="text-gray-700">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Doctoral Programs</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {college.academics.courses.phd.map((course, index) => (
                          <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                            <Trophy className="h-5 w-5 text-purple-600 mr-3" />
                            <span className="text-gray-700">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Faculty */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Faculty Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{college.academics.facultyCount}+</div>
                      <div className="text-gray-600">Total Faculty Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{college.academics.studentFacultyRatio}</div>
                      <div className="text-gray-600">Student-Faculty Ratio</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'placements' && (
              <div className="space-y-8">
                {/* Placement Statistics */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Placement Statistics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{college.placement.averagePackage}</div>
                      <div className="text-gray-600">Average Package</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{college.placement.highestPackage}</div>
                      <div className="text-gray-600">Highest Package</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">{college.placement.placementRate}%</div>
                      <div className="text-gray-600">Placement Rate</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Recruiters</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {college.placement.topRecruiters.map((company, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="font-medium text-gray-800">{company}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campus' && (
              <div className="space-y-8">
                {/* Hostel Life */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Hostel Life</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Accommodation</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Capacity: {college.infrastructure.hostel.capacity.toLocaleString()} students</li>
                        <li>• Room Types: {college.infrastructure.hostel.rooms}</li>
                        <li>• Separate hostels for boys and girls</li>
                        <li>• 24/7 Security</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {college.infrastructure.hostel.facilities.map((facility, index) => (
                          <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                      <span className="font-semibold">Hostel Rating: {college.ratings.hostelLife}/5</span>
                    </div>
                    <p className="text-gray-600 text-sm">Based on student reviews and feedback</p>
                  </div>
                </div>

                {/* Clubs and Activities */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Clubs & Societies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.clubs.map((club, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center">
                        <Activity className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800">{club}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Events and Fests */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Events & Festivals</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {college.events.map((event, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img src={event.image} alt={event.name} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
                              {event.type}
                            </span>
                            <span className="text-gray-500 text-xs flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.date}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-2">{event.name}</h3>
                          <p className="text-gray-600 text-sm">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div className="space-y-8">
                {/* Infrastructure */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Campus Infrastructure</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="text-center">
                      <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{college.infrastructure.campus.buildings}</div>
                      <div className="text-gray-600 text-sm">Buildings</div>
                    </div>
                    <div className="text-center">
                      <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{college.infrastructure.campus.labs}</div>
                      <div className="text-gray-600 text-sm">Laboratories</div>
                    </div>
                    <div className="text-center">
                      <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{college.infrastructure.campus.libraries}</div>
                      <div className="text-gray-600 text-sm">Libraries</div>
                    </div>
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{college.infrastructure.campus.area}</div>
                      <div className="text-gray-600 text-sm">Campus Area</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Campus Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.infrastructure.facilities.map((facility, index) => {
                      const getIcon = (facility: string) => {
                        if (facility.includes('Wi-Fi')) return Wifi;
                        if (facility.includes('Sports')) return Activity;
                        if (facility.includes('Medical')) return Shield;
                        if (facility.includes('Cafeteria')) return Coffee;
                        if (facility.includes('Bank')) return DollarSign;
                        return Building;
                      };
                      const Icon = getIcon(facility);
                      
                      return (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="text-gray-700">{facility}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Photo Gallery</h2>
                  
                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Object.keys(college.images).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedImageCategory(category as keyof typeof college.images)}
                        className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                          selectedImageCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.images[selectedImageCategory as keyof typeof college.images].map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img src={image} alt={`${selectedImageCategory} ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest News & Updates</h2>
                  <div className="space-y-6">
                    {college.news.map((newsItem, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-4">
                          <img src={newsItem.image} alt={newsItem.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                                {newsItem.category}
                              </span>
                              <span className="text-gray-500 text-sm flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {newsItem.date}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{newsItem.title}</h3>
                            <p className="text-gray-600 mb-4">{newsItem.excerpt}</p>
                            <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                              Read More <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs can be implemented similarly */}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    {college.contact.phone.map((phone, index) => (
                      <p key={index} className="text-gray-600">{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    {college.contact.email.map((email, index) => (
                      <p key={index} className="text-gray-600">{email}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <p className="text-gray-600">{college.location.address}, {college.location.city}, {college.location.state} - {college.location.pincode}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-800 mb-2">Admission Helpline</p>
                <p className="text-blue-600 font-semibold">{college.contact.admissionHelpline}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Official Pages</p>
                  <div className="flex flex-wrap gap-2">
                    {college.socialMedia.official.facebook && (
                      <Link href={college.socialMedia.official.facebook} target="_blank" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                        <Facebook className="h-4 w-4" />
                      </Link>
                    )}
                    {college.socialMedia.official.twitter && (
                      <Link href={college.socialMedia.official.twitter} target="_blank" className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200">
                        <Twitter className="h-4 w-4" />
                      </Link>
                    )}
                    {college.socialMedia.official.instagram && (
                      <Link href={college.socialMedia.official.instagram} target="_blank" className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200">
                        <Instagram className="h-4 w-4" />
                      </Link>
                    )}
                    {college.socialMedia.official.youtube && (
                      <Link href={college.socialMedia.official.youtube} target="_blank" className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                        <Youtube className="h-4 w-4" />
                      </Link>
                    )}
                    {college.socialMedia.official.linkedin && (
                      <Link href={college.socialMedia.official.linkedin} target="_blank" className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Student Communities</p>
                  <div className="flex flex-wrap gap-2">
                    {college.socialMedia.student.facebook && (
                      <Link href={college.socialMedia.student.facebook} target="_blank" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                        <Facebook className="h-4 w-4" />
                      </Link>
                    )}
                    {college.socialMedia.student.instagram && (
                      <Link href={college.socialMedia.student.instagram} target="_blank" className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200">
                        <Instagram className="h-4 w-4" />
                      </Link>
                    )}
                    {college.socialMedia.student.youtube && (
                      <Link href={college.socialMedia.student.youtube} target="_blank" className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                        <Youtube className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ratings Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(college.ratings).filter(([key]) => key !== 'totalReviews').map(([category, rating]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Nearby Places</h3>
              <div className="space-y-3">
                {college.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{place.name}</p>
                      <p className="text-sm text-gray-600">{place.type}</p>
                    </div>
                    <span className="text-blue-600 font-semibold text-sm">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Scholarships</h3>
              <div className="space-y-4">
                {college.scholarships.map((scholarship, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800">{scholarship.name}</h4>
                    <p className="text-green-600 font-semibold">{scholarship.amount}</p>
                    <p className="text-sm text-gray-600 mt-1">{scholarship.description}</p>
                    <p className="text-xs text-blue-600 mt-1">Eligibility: {scholarship.eligibility}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Funding & Grants</h3>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-green-600">{college.funding.totalFunding}</div>
                <div className="text-gray-600 text-sm">Total Funding Received</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800 mb-2">Funding Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {college.funding.sources.map((source, index) => (
                      <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="font-medium text-gray-800 mb-2">Recent Grants</p>
                  <div className="space-y-2">
                    {college.funding.recentGrants.map((grant, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{grant.amount}</span>
                          <span className="text-gray-500">{grant.year}</span>
                        </div>
                        <p className="text-gray-600">{grant.source} - {grant.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full">
            <img src={selectedImage} alt="Gallery" className="max-w-full max-h-full object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegePage;