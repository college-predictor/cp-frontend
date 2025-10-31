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
  ThumbsUp, MapPin as LocationIcon, Navigation, FileCheck,
  ListChecks, HelpCircle, CheckCircle2, LineChart,
  Globe2, UserCheck, Rocket, Handshake, Sun, Moon,
  Utensils, Dumbbell, HeartPulse, LifeBuoy, Leaf,
  Bus, Sparkles, Medal, Filter, CheckCircle
} from 'lucide-react';

const socialIconConfig = {
  instagram: { icon: Instagram, label: 'Instagram' },
  youtube: { icon: Youtube, label: 'YouTube' },
  facebook: { icon: Facebook, label: 'Facebook' },
  twitter: { icon: Twitter, label: 'Twitter' },
  linkedin: { icon: Linkedin, label: 'LinkedIn' },
  website: { icon: Globe, label: 'Website' },
  discord: { icon: MessageCircle, label: 'Community' }
} as const;

interface CollegeData {
  id: number;
  name: string;
  shortName: string;
  aboutHTML: string;
  established: number;
  type: string;
  category: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string[];
    email: string[];
    website: string;
    helpline?: {
      admission?: {
        phone?: string;
        email?: string;
      };
      scholarships?: {
        phone?: string;
        email?: string;
      };
      general?: {
        phone?: string;
        email?: string;
      };
    };
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
  fee_structures: {
    undergraduate?: {
      [degreeType: string]: {
        tuition: string;
        mess?: string;
        hostel?: string;
        other?: string;
        total: string;
      }
    };
    postgraduate?: {
      [degreeType: string]: {
        tuition: string;
        mess?: string;
        hostel?: string;
        other?: string;
        total: string;
      }
    };
    phd?: {
      tuition: string;
      mess?: string;
      hostel?: string;
      other?: string;
      total: string;
      stipend?: string;
    };
  };
  placement: {
    averagePackage: string;
    highestPackage: string;
    placementRate: number;
    medianPackage: string;
    topRecruiters: string[];
    internationalOffers: number;
    salaryTrends: Array<{
      year: number;
      average: string;
      highest: string;
      placementRate: number;
    }>;
    sectorDistribution: Array<{
      sector: string;
      percentage: number;
    }>;
    internshipStats: {
      totalInternships: number;
      ppoRate: number;
      globalInternships: number;
      averageStipend: string;
    };
    placementProcess: Array<{
      step: string;
      description: string;
    }>;
    successStories: Array<{
      name: string;
      company: string;
      package: string;
      role: string;
      story: string;
    }>;
    branchwise: Array<{
      name: string;
      averagePackage: string;
      medianPackage: string;
      highestPackage: string;
      placementRate: number;
      offers: number;
      topRoles: string[];
      recruiters: string[];
    }>;
  };
  admissions: {
    overview: string;
    methods: {
      type: "Exam-Based" | "Non-Exam-Based";
      methods: Array<{
        name: string;
        applicationPrograms: string[];
        eligibility: string[];
        requiredDocuments: string[];
        steps: Array<{
          step: string;
          description?: string;
          deadline?: string;
          link?: string;
        }>;
      }>;
    }[];
    generalGuidelines: string;
    importantLinks: Array<{
      label: string;
      url: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  academics: {
    courses: {
      name: string;
      duration: string;
      graduation_level: string;
      degree: string;
      classroom_size?: string;
      hod?: {
        name: string;
        image: string;
        mobile: string;
        email: string;
      };
    }[];
    certifications: {
      name: string;
      description: string;
      duration: string;
      fees: string;
    }[];
    facultyCount: number;
    studentFacultyRatio: string;
  };
  infrastructure: {
    overview: string;
    keyHighlights: string[];
    campus: {
      area: string;
      buildings: number;
      labs: number;
      libraries: number;
    };
    facilities: string[];
    innovationCenters: Array<{
      name: string;
      focus: string;
      description: string;
      link?: string;
      gallery: Array<{
        url: string;
        description: string;
        year: number;
        photographerCredit: string;
      }>;
    }>;
    digitalInfrastructure: string[];
    sustainabilityInitiatives: Array<{
      title: string;
      impact: string;
    }>;
    transport: Array<{
      mode: string;
      frequency: string;
    }>;
  };
  campusExperience: {
    lifestyleHighlights: Array<{
      title: string;
      description: string;
    }>;
    supportServices: Array<{
      name: string;
      description: string;
    }>;
    diningOptions: Array<{
      name: string;
      type: string;
      signature: string;
      openTill: string;
    }>;
    sportsAndFitness: Array<{
      name: string;
      details: string;
    }>;
    wellnessPrograms: Array<{
      name: string;
      description: string;
    }>;
    residential: Array<{
      name: string;
      hostel_type: string;
      capacity: number;
      rooms: string;
      facilities: string[];
      gallery: Array<{
        url: string;
        description: string;
        year: number;
        photographerCredit: string;
      }>;
      description: string;
      reviews: Array<{
        student: string;
        batch: string;
        comment: string;
        ratings: {
          cleanliness: number;
          foodQuality: number;
          infrastructure: number;
          overall: number;
        };
      }>;
    }>;
  };
  clubs: Array<{
    name: string;
    description: string;
    category: string;
    members: number;
    meetingFrequency: string;
    achievements: string[];
    contactEmail: string;
    social: Partial<Record<keyof typeof socialIconConfig, string>>;
    mediaEmbed?: string;
  }>;
  events: Array<{
    name: string;
    type: string;
    description: string;
    date: string;
    image: string;
    location: string;
    registrationLink: string;
    highlights: string[];
    social: Partial<Record<keyof typeof socialIconConfig, string>>;
    mediaEmbed?: string;
  }>;
  reviews: {
    highlights: string[];
    distribution: Array<{
      label: string;
      value: number;
    }>;
    testimonials: Array<{
      name: string;
      program: string;
      batch: string;
      rating: number;
      content: string;
      date: string;
      verified: boolean;
    }>;
  };
  images: {
    campus: Array<{
      description: string;
      url: string;
      date: string;
    }>;
    hostel: Array<{
      description: string;
      url: string;
      date: string;
    }>;
    facilities: Array<{
      description: string;
      url: string;
      date: string;
    }>;
    events: Array<{
      description: string;
      url: string;
      date: string;
    }>;
  };
  alumniNetwork: {
    totalAlumni: number;
    notableAlumni: Array<{
      name: string;
      batch: string;
      position: string;
      company: string;
      image: string;
    }>;
  };
  scholarships: Array<{
    name: string;
    amount: string;
    eligibility: string;
    description: string;
    deadline?: string;
    applyLink?: string;
  }>;
  startups: Array<{
    name: string;
    founder: string;
    description: string;
    funding: string;
    image: string;
  }>;
  news: Array<{
    title: string;
    date: string;
    category: string;
    excerpt: string;
    image: string;
  }>;
  socialMedia: {
    official: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
      linkedin?: string;
    };
  };
  nearbyPlaces: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
}

const CollegePage = () => {
  const params = useParams();
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageCategory, setSelectedImageCategory] = useState<keyof CollegeData['images']>('campus');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedMethodType, setSelectedMethodType] = useState(0);
  const [expandedMethod, setExpandedMethod] = useState(0);


  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const collegeId = params.id;

        // Helper function to handle API response format
        const fetchAPI = async (url: string) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
          }
          const result = await response.json();
          if (!result.success) {
            console.log(result);
            throw new Error(result.message || 'API request failed');
          }
          return result.data;
        };

        // Fetch all data in parallel
        const [
          mainData,
          reviewsData,
          ratingsData,
          newsData
        ] = await Promise.all([
          fetchAPI(`http://localhost:8000/api/v1/colleges/${collegeId}`),
          fetchAPI(`http://localhost:8000/api/v1/colleges/${collegeId}/reviews`),
          fetchAPI(`http://localhost:8000/api/v1/colleges/${collegeId}/ratings`),
          fetchAPI(`http://localhost:8000/api/v1/colleges/${collegeId}/news`)
        ]);

        // Map the backend response to the frontend CollegeData structure
        const collegeData: CollegeData = {
          id: mainData.college_details.id,
          name: mainData.college_details.name,
          shortName: mainData.college_details.shortName,
          aboutHTML: mainData.college_details.aboutHTML,
          established: mainData.college_details.established,
          type: mainData.college_details.type,
          category: mainData.college_details.category,
          location: mainData.college_details.location,
          contact: mainData.college_details.contact,
          
          ratings: ratingsData,
          
          fee_structures: mainData.college_fee_structure,
          
          placement: {
            averagePackage: mainData.college_placements.averagePackage,
            highestPackage: mainData.college_placements.highestPackage,
            placementRate: mainData.college_placements.placementRate,
            medianPackage: mainData.college_placements.medianPackage,
            topRecruiters: mainData.college_placements.topRecruiters,
            internationalOffers: mainData.college_placements.internationalOffers,
            salaryTrends: mainData.college_placements.salaryTrends,
            sectorDistribution: mainData.college_placements.sectorDistribution,
            internshipStats: mainData.college_placements.internshipStats,
            placementProcess: mainData.college_placements.placementProcess,
            successStories: mainData.college_placements.successStories,
            branchwise: mainData.college_branch_placements.branches
          },

          admissions: mainData.college_admissions,

          academics: {
            courses: mainData.college_academics.courses,
            certifications: mainData.college_academics.certifications,
            facultyCount: mainData.college_academics.facultyCount,
            studentFacultyRatio: mainData.college_academics.studentFacultyRatio
          },
          
          infrastructure: {
            overview: mainData.college_infrastructure.overview,
            keyHighlights: mainData.college_infrastructure.keyHighlights,
            campus: mainData.college_infrastructure.campus,
            facilities: mainData.college_infrastructure.facilities,
            innovationCenters: mainData.college_infrastructure.innovationCenters,
            digitalInfrastructure: mainData.college_infrastructure.digitalInfrastructure,
            sustainabilityInitiatives: mainData.college_infrastructure.sustainabilityInitiatives,
            transport: mainData.college_infrastructure.transport
          },
          
          campusExperience: {
            lifestyleHighlights: mainData.college_campus_experience.lifestyleHighlights,
            supportServices: mainData.college_campus_experience.supportServices,
            diningOptions: mainData.college_campus_experience.diningOptions,
            sportsAndFitness: mainData.college_campus_experience.sportsAndFitness,
            wellnessPrograms: mainData.college_campus_experience.wellnessPrograms,
            residential: [
              {
                name: "Sunrise Hostel",
                hostel_type: "boys",
                capacity: 200,
                rooms: "Single, Double",
                facilities: ["Wi-Fi", "Laundry", "Common Room", "Mess"],
                gallery: [
                  {
                    url: "https://example.com/sunrise-hostel-1.jpg",
                    description: "Front view of Sunrise Hostel",
                    year: 2023,
                    photographerCredit: "John Doe",
                  },
                  {
                    url: "https://example.com/sunrise-hostel-2.jpg",
                    description: "Common room in Sunrise Hostel",
                    year: 2023,
                    photographerCredit: "Jane Smith",
                  },
                ],
                description: "A modern boys' hostel with all essential amenities.",
                reviews: [
                  {
                    student: "Rahul Sharma",
                    batch: "2024",
                    comment: "The hostel is clean and well-maintained. Food quality is good.",
                    ratings: {
                      cleanliness: 4,
                      foodQuality: 4,
                      infrastructure: 5,
                      overall: 4,
                    },
                  },
                  {
                    student: "Amit Verma",
                    batch: "2023",
                    comment: "Great facilities but the Wi-Fi speed could be improved.",
                    ratings: {
                      cleanliness: 5,
                      foodQuality: 3,
                      infrastructure: 4,
                      overall: 4,
                    },
                  },
                ],
              },
              {
                name: "Moonlight Hostel",
                hostel_type: "girls",
                capacity: 150,
                rooms: "Single, Triple",
                facilities: ["Wi-Fi", "24/7 Security", "Gym", "Mess"],
                gallery: [
                  {
                    url: "https://example.com/moonlight-hostel-1.jpg",
                    description: "Entrance of Moonlight Hostel",
                    year: 2023,
                    photographerCredit: "Alice Johnson",
                  },
                  {
                    url: "https://example.com/moonlight-hostel-2.jpg",
                    description: "Dining area in Moonlight Hostel",
                    year: 2023,
                    photographerCredit: "Bob Brown",
                  },
                ],
                description: "A safe and secure hostel for girls with modern facilities.",
                reviews: [
                  {
                    student: "Priya Singh",
                    batch: "2025",
                    comment: "The hostel is very secure and the gym is well-equipped.",
                    ratings: {
                      cleanliness: 5,
                      foodQuality: 4,
                      infrastructure: 5,
                      overall: 5,
                    },
                  },
                  {
                    student: "Anjali Mehta",
                    batch: "2024",
                    comment: "The rooms are spacious and the staff is very helpful.",
                    ratings: {
                      cleanliness: 4,
                      foodQuality: 5,
                      infrastructure: 4,
                      overall: 4,
                    },
                  },
                ],
              },
              {
                name: "Moonlight Hostel",
                hostel_type: "co-ed",
                capacity: 150,
                rooms: "Single, Triple",
                facilities: ["Wi-Fi", "24/7 Security", "Gym", "Mess"],
                gallery: [
                  {
                    url: "https://example.com/moonlight-hostel-1.jpg",
                    description: "Entrance of Moonlight Hostel",
                    year: 2023,
                    photographerCredit: "Alice Johnson",
                  },
                  {
                    url: "https://example.com/moonlight-hostel-2.jpg",
                    description: "Dining area in Moonlight Hostel",
                    year: 2023,
                    photographerCredit: "Bob Brown",
                  },
                ],
                description: "A safe and secure hostel for girls with modern facilities.",
                reviews: [
                  {
                    student: "Priya Singh",
                    batch: "2025",
                    comment: "The hostel is very secure and the gym is well-equipped.",
                    ratings: {
                      cleanliness: 5,
                      foodQuality: 4,
                      infrastructure: 5,
                      overall: 5,
                    },
                  },
                  {
                    student: "Anjali Mehta",
                    batch: "2024",
                    comment: "The rooms are spacious and the staff is very helpful.",
                    ratings: {
                      cleanliness: 4,
                      foodQuality: 5,
                      infrastructure: 4,
                      overall: 4,
                    },
                  },
                ],
              },
            ]
          },
          
          clubs: mainData.college_clubs.clubs.map((club: any) => ({
            name: club.name,
            description: club.description,
            category: 'Technical',
            members: 150,
            meetingFrequency: 'Weekly',
            achievements: club.achievements || [],
            contactEmail: club.contactEmail,
            social: club.social || {},
            mediaEmbed: club.mediaEmbed
          })),
          
          events: mainData.college_events.events.map((event: any) => ({
            name: event.name,
            type: event.type,
            description: event.description,
            date: event.date,
            image: event.image,
            location: event.location,
            registrationLink: event.registrationLink,
            highlights: event.highlights || [],
            social: event.social || {},
            mediaEmbed: event.mediaEmbed
          })),
          
          reviews: {
            highlights: reviewsData.highlights,
            distribution: reviewsData.distribution,
            testimonials: reviewsData.testimonials.map((t: any) => ({
              name: t.name,
              program: t.program,
              batch: t.batch,
              rating: t.rating,
              content: t.content,
              date: '2024',
              verified: true
            }))
          },
          
          images: mainData.college_gallery.images,
          
          alumniNetwork: {
            totalAlumni: mainData.college_alumni.totalAlumni,
            notableAlumni: mainData.college_alumni.notableAlumni.map((alumni: any) => ({
              name: alumni.name,
              batch: alumni.batch,
              position: alumni.position,
              company: alumni.company,
              image: alumni.image
            }))
          },
          
          scholarships: mainData.college_scholarships.scholarships.map((s: any) => ({
            name: s.name,
            amount: s.amount,
            eligibility: s.eligibility,
            description: s.description,
            deadline: s.deadline,
            applyLink: s.applyLink
          })),
          
          startups: mainData.college_startups.startups.map((s: any) => ({
            name: s.name,
            founder: s.founder,
            description: s.description,
            funding: s.funding,
            image: s.image
          })),
          
          news: newsData.items.map((n: any) => ({
            title: n.title,
            date: n.date,
            category: n.category,
            excerpt: n.excerpt,
            image: n.image
          })),
          
          socialMedia: mainData.college_social_media,
          
          nearbyPlaces: mainData.college_nearby_places.places.map((p: any) => ({
            name: p.name,
            distance: p.distance,
            type: p.type
          }))
        };
        console.log('Fetched College Data:', collegeData.admissions);
        setCollege(collegeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch college data');
        console.error('Error fetching college data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeData();
  }, [params.id]);

  useEffect(() => {
    if (college && college.placement.branchwise.length > 0) {
      setSelectedBranch((prev) => prev || college.placement.branchwise[0].name);
    }
  }, [college]);

  const toggleMethod = (index) => {
    setExpandedMethod(expandedMethod === index ? -1 : index);
  };

  // Add filter options for courses and certifications
  const filterOptions = [
    { id: 'all', label: 'All Programs', icon: BookOpen },
    { id: 'B.Tech', label: 'B.Tech', icon: GraduationCap },
    { id: 'B.Sc', label: 'B.Sc', icon: GraduationCap },
    { id: 'M.Tech', label: 'M.Tech', icon: Award },
    { id: 'PhD', label: 'PhD', icon: Trophy },
    { id: 'certifications', label: 'Certifications', icon: CheckCircle2 }
  ];

  const filteredCourses = college && selectedFilter === 'all' 
    ? college.academics.courses 
    : selectedFilter === 'certifications'
    ? []
    : college?.academics.courses.filter(course => course.degree === selectedFilter);

  const showCertifications = selectedFilter === 'all' || selectedFilter === 'certifications';

  // Define the type for degree parameter
  const getDegreeColor = (degree: 'B.Tech' | 'B.Sc' | 'M.Tech' | 'PhD' | string) => {
    const colors: Record<string, string> = {
      'B.Tech': 'blue',
      'B.Sc': 'indigo',
      'M.Tech': 'green',
      'PhD': 'purple'
    };
    return colors[degree] || 'gray';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-red-600">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading College Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!college) {
    return null;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'campus', label: 'Campus', icon: Home },
    { id: 'clubs', label: 'Clubs & Events', icon: Activity },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: 'reviews', label: 'Reviews', icon: MessageCircle },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'news', label: 'News', icon: FileText }
  ];

  const placementHighlights = [
    {
      label: 'Average Package',
      value: college.placement.averagePackage,
      subtext: 'Class of 2024',
      icon: TrendingUp,
      accent: 'bg-green-50 text-green-700'
    },
    {
      label: 'Median Package',
      value: college.placement.medianPackage,
      subtext: 'Balances new-age & core roles',
      icon: LineChart,
      accent: 'bg-blue-50 text-blue-700'
    },
    {
      label: 'Highest Package',
      value: college.placement.highestPackage,
      subtext: 'Global offer',
      icon: Trophy,
      accent: 'bg-purple-50 text-purple-700'
    },
    {
      label: 'Placement Rate',
      value: `${college.placement.placementRate}%`,
      subtext: 'Students placed',
      icon: Users,
      accent: 'bg-yellow-50 text-yellow-700'
    },
    {
      label: 'International Offers',
      value: college.placement.internationalOffers.toString(),
      subtext: 'Across North America, Europe & APAC',
      icon: Globe2,
      accent: 'bg-rose-50 text-rose-700'
    }
  ];

  const selectedBranchData = college.placement.branchwise.find(
    (branch) => branch.name === selectedBranch
  );

  const timelineIcons = [Sun, BookOpen, Utensils, Activity, Moon];

  const renderSocialLinks = (
    social: Partial<Record<keyof typeof socialIconConfig, string | undefined>>
  ) =>
    Object.entries(social).map(([platform, url]) => {
      if (!url) return null;
      const config = socialIconConfig[platform as keyof typeof socialIconConfig];
      if (!config) return null;
      const Icon = config.icon;
      return (
        <Link
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <Icon className="h-3.5 w-3.5" />
          {config.label}
        </Link>
      );
    });

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
                  <div dangerouslySetInnerHTML={{ __html: college.aboutHTML }} />
                </div>

                {/* Fees Structure */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Fees Structure</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(college.fee_structures).map(([graduationLevel, degreeTypes]) => (
                      <div key={graduationLevel} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm">{graduationLevel}</h3>
                        <div className="space-y-3">
                          {Object.entries(degreeTypes as Record<string, any>).map(([degreeType, feeObj]) => (
                            <div key={degreeType} className="border border-gray-100 rounded-md p-2 bg-white">
                              <div className="font-semibold text-blue-700 mb-1 text-xs">{degreeType}</div>
                              <div className="space-y-1">
                                {Object.entries(feeObj).map(([feeKey, feeValue]) => {
                                  if (!feeValue) return null;
                                  return (
                                    <div key={feeKey} className="flex justify-between text-sm">
                                      <span className="capitalize text-gray-600">{feeKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                                      <span className="font-medium text-gray-800">{String(feeValue)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scholarships & Financial Aid */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Scholarships & Financial Aid</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.scholarships.map((scholarship, index) => (
                      <div key={index} className="border border-blue-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-sm mb-1">{scholarship.name}</h3>
                            <p className="text-lg font-bold text-blue-600">{scholarship.amount}</p>
                          </div>
                          <Award className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{scholarship.description}</p>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-600">{scholarship.eligibility}</p>
                          </div>
                          
                          {scholarship.deadline && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Deadline:</span> {scholarship.deadline}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {scholarship.applyLink && (
                          <Link
                            href={scholarship.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Apply Now
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>


                {/* Latest News */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest News</h2>
                  <div className="relative">
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="flex gap-4 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
                        {college.news.map((newsItem, index) => (
                          <div 
                            key={index} 
                            className="flex-shrink-0 w-72 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            style={{ scrollSnapAlign: 'start' }}
                          >
                            <img src={newsItem.image} alt={newsItem.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                                  {newsItem.category}
                                </span>
                                <span className="text-gray-500 text-xs">{newsItem.date}</span>
                              </div>
                              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{newsItem.title}</h3>
                              <p className="text-gray-600 text-sm line-clamp-2">{newsItem.excerpt}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                    .scrollbar-hide {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `}</style>
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
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Academic Programs</h1>
                    <p className="text-gray-600">Explore our comprehensive range of courses and certifications</p>
                  </div>

                  <div className="flex gap-6">
                    {/* Left Sidebar - Filters */}
                    <div className="w-64 flex-shrink-0">
                      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                        <div className="flex items-center gap-2 mb-6">
                          <Filter className="h-5 w-5 text-gray-700" />
                          <h2 className="text-lg font-semibold text-gray-900">Filter Programs</h2>
                        </div>
                        
                        <div className="space-y-2">
                          {filterOptions.map((option) => {
                            const Icon = option.icon;
                            const isActive = selectedFilter === option.id;
                            return (
                              <button
                                key={option.id}
                                onClick={() => setSelectedFilter(option.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                  isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                <span className="font-medium">{option.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Faculty Stats */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-900 mb-4">Faculty Overview</h3>
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                              <div className="text-2xl font-bold text-blue-600">{college.academics.facultyCount}+</div>
                              <div className="text-xs text-gray-600 mt-1">Faculty Members</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
                              <div className="text-2xl font-bold text-green-600">{college.academics.studentFacultyRatio}</div>
                              <div className="text-xs text-gray-600 mt-1">Student-Faculty Ratio</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                      {/* Course Cards */}
                      {filteredCourses.length > 0 && (
                        <div className="space-y-6 mb-8">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {selectedFilter === 'all' ? 'Degree Programs' : `${selectedFilter} Programs`}
                          </h2>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredCourses.map((course, index) => {
                              const color = getDegreeColor(course.degree);
                              return (
                                <div
                                  key={index}
                                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
                                >
                                  <div className={`h-2 bg-gradient-to-r from-${color}-400 to-${color}-600`}></div>
                                  
                                  <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700`}>
                                            {course.degree}
                                          </span>
                                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                            {course.duration}
                                          </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                                        <p className="text-sm text-gray-600">{course.graduation_level}</p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                                      <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg bg-${color}-50`}>
                                          <Users className={`h-4 w-4 text-${color}-600`} />
                                        </div>
                                        <div>
                                          <div className="text-xs text-gray-500">Batch Size</div>
                                          <div className="text-sm font-semibold text-gray-900">{course.classroom_size || 'N/A'}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg bg-${color}-50`}>
                                          <BookOpen className={`h-4 w-4 text-${color}-600`} />
                                        </div>
                                        <div>
                                          <div className="text-xs text-gray-500">Annual Fees</div>
                                          <div className="text-sm font-semibold text-gray-900">{course.fees}</div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* HOD Card */}
                                    {course.hod && (
                                      <div className={`bg-gradient-to-br from-${color}-50 to-white rounded-lg p-4 border border-${color}-100`}>
                                        <div className="flex items-start gap-3">
                                          <img
                                            src={course.hod.image}
                                            alt={course.hod.name}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <div className="text-xs font-semibold text-gray-500 mb-1">Head of Department</div>
                                            <h4 className="font-bold text-gray-900 mb-2">{course.hod.name}</h4>
                                            <div className="space-y-1">
                                              <a
                                                href={`tel:${course.hod.mobile}`}
                                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 transition-colors"
                                              >
                                                <Phone className="h-3 w-3" />
                                                <span>{course.hod.mobile}</span>
                                              </a>
                                              <a
                                                href={`mailto:${course.hod.email}`}
                                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 transition-colors truncate"
                                              >
                                                <Mail className="h-3 w-3 flex-shrink-0" />
                                                <span className="truncate">{course.hod.email}</span>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {showCertifications && college.academics.certifications.length > 0 && (
                        <div className="space-y-6">
                          <h2 className="text-2xl font-bold text-gray-900">Professional Certifications</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {college.academics.certifications.map((cert, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 p-6"
                              >
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 mb-4">
                                  <CheckCircle2 className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-semibold text-gray-900">{cert.duration}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Fees:</span>
                                    <span className="font-semibold text-gray-900">{cert.fees}</span>
                                  </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                  <div className="text-xs text-gray-500 mb-1">Eligibility</div>
                                  <div className="text-sm font-medium text-gray-700">{cert.eligibility}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Empty State */}
                      {filteredCourses.length === 0 && !showCertifications && (
                        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No programs found</h3>
                          <p className="text-gray-600">Try selecting a different filter</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admissions' && (
              <div className="space-y-8 max-w-7xl mx-auto p-6">
                {/* Overview Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-8 border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">Admissions Overview</h1>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">{college.admissions.overview}</p>
                </div>

                {/* Method Type Tabs */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="flex border-b border-gray-200">
                    {college.admissions.methods.map((methodGroup, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMethodType(index)}
                        className={`flex-1 px-6 py-4 font-semibold transition-all ${
                          selectedMethodType === index
                            ? 'bg-blue-500 text-white border-b-2 border-blue-600'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {methodGroup.type}
                      </button>
                    ))}
                  </div>

                  {/* Methods Content */}
                  <div className="p-6">
                    {college.admissions.methods[selectedMethodType].methods.map((method, methodIndex) => (
                      <div key={methodIndex} className="mb-6 last:mb-0">
                        <button
                          onClick={() => toggleMethod(methodIndex)}
                          className="w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-5 transition-colors border-2 border-gray-200 hover:border-blue-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-6 w-6 text-blue-600" />
                              <h3 className="text-xl font-bold text-gray-800 text-left">{method.name}</h3>
                            </div>
                            <span className="text-blue-600 text-2xl">{expandedMethod === methodIndex ? '−' : '+'}</span>
                          </div>
                        </button>

                        {expandedMethod === methodIndex && (
                          <div className="mt-4 space-y-6 pl-4">
                            {/* Application Programs */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-green-600" />
                                Applicable Programs
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {method.applicationPrograms.map((program, idx) => (
                                  <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {program}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Eligibility */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                Eligibility Requirements
                              </h4>
                              <ul className="space-y-2">
                                {method.eligibility.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Required Documents */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FileCheck className="h-5 w-5 text-purple-600" />
                                Required Documents
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {method.requiredDocuments.map((doc, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded">
                                    <FileCheck className="h-4 w-4 text-purple-500" />
                                    <span className="text-sm">{doc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Application Steps */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <ListChecks className="h-5 w-5 text-orange-600" />
                                Application Steps
                              </h4>
                              <div className="space-y-3">
                                {method.steps.map((stepItem, idx) => (
                                  <div key={idx} className="flex gap-4 border-l-4 border-orange-300 pl-4 py-2">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                      {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-gray-800">{stepItem.step}</h5>
                                      {stepItem.description && (
                                        <p className="text-gray-600 text-sm mt-1">{stepItem.description}</p>
                                      )}
                                      <div className="flex flex-wrap gap-3 mt-2">
                                        {stepItem.deadline && (
                                          <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                                            <Calendar className="h-3 w-3" />
                                            Deadline: {stepItem.deadline}
                                          </span>
                                        )}
                                        {stepItem.link && (
                                          <a
                                            href={stepItem.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
                                          >
                                            <ExternalLink className="h-3 w-3" />
                                            Visit Link
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* General Guidelines */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ListChecks className="h-6 w-6 text-blue-600" />
                    General Guidelines
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{college.admissions.generalGuidelines}</p>
                </div>

                {/* Important Links */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ExternalLink className="h-6 w-6 text-blue-600" />
                    Important Links
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {college.admissions.importantLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors border border-blue-200"
                      >
                        <span className="font-medium text-blue-800">{link.label}</span>
                        <ExternalLink className="h-4 w-4 text-blue-600" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {college.admissions.faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">Q:</span>
                          <span>{faq.question}</span>
                        </h3>
                        <p className="text-gray-600 pl-6">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'placements' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Placement Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                    {placementHighlights.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="border border-gray-200 rounded-xl p-4">
                          <div className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold ${item.accent} mb-3`}>
                            <Icon className="h-4 w-4 mr-2" />
                            {item.label}
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                          <p className="text-xs text-gray-500 mt-1">{item.subtext}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Year-over-Year Trends</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Graduating Year</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Average Package</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Highest Package</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Placement Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {college.placement.salaryTrends.map((trend) => (
                            <tr key={trend.year}>
                              <td className="px-4 py-3 font-medium text-gray-800">{trend.year}</td>
                              <td className="px-4 py-3 text-gray-600">{trend.average}</td>
                              <td className="px-4 py-3 text-gray-600">{trend.highest}</td>
                              <td className="px-4 py-3 text-gray-600">{trend.placementRate}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Sector-wise Placement</h2>
                    <div className="space-y-4">
                      {college.placement.sectorDistribution.map((sector) => (
                        <div key={sector.sector}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{sector.sector}</span>
                            <span className="text-blue-600 font-semibold">{sector.percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-2 bg-blue-500"
                              style={{ width: `${sector.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Branch-wise Outcomes</h2>
                      <p className="text-sm text-gray-500 mt-1">Toggle between branches to view tailored placement stats.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {college.placement.branchwise.map((branch) => (
                        <button
                          key={branch.name}
                          onClick={() => setSelectedBranch(branch.name)}
                          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                            selectedBranch === branch.name
                              ? 'border-blue-500 bg-blue-50 text-blue-600'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600'
                          }`}
                        >
                          {branch.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedBranchData && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[
                          {
                            label: 'Average Package',
                            value: selectedBranchData.averagePackage,
                            subtext: 'CTC for the latest batch',
                            icon: TrendingUp,
                            accent: 'bg-green-50 text-green-700'
                          },
                          {
                            label: 'Median Package',
                            value: selectedBranchData.medianPackage,
                            subtext: 'Balanced between profiles',
                            icon: LineChart,
                            accent: 'bg-blue-50 text-blue-700'
                          },
                          {
                            label: 'Highest Package',
                            value: selectedBranchData.highestPackage,
                            subtext: 'Dream offer secured',
                            icon: Trophy,
                            accent: 'bg-purple-50 text-purple-700'
                          },
                          {
                            label: 'Placement Rate',
                            value: `${selectedBranchData.placementRate}%`,
                            subtext: `${selectedBranchData.offers} offers rolled out`,
                            icon: Users,
                            accent: 'bg-yellow-50 text-yellow-700'
                          }
                        ].map((card) => {
                          const Icon = card.icon;
                          return (
                            <div key={card.label} className="border border-gray-200 rounded-xl p-4">
                              <div className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold ${card.accent} mb-3`}>
                                <Icon className="h-4 w-4 mr-2" />
                                {card.label}
                              </div>
                              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                              <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="h-5 w-5 text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-800">Top Roles Offered</h3>
                          </div>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            {selectedBranchData.topRoles.map((role) => (
                              <li key={role}>{role}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Handshake className="h-5 w-5 text-green-500" />
                            <h3 className="text-lg font-semibold text-gray-800">Key Recruiting Partners</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedBranchData.recruiters.map((recruiter) => (
                              <span key={recruiter} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                {recruiter}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Internships & PPOs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2 text-gray-700">
                          <Briefcase className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-semibold uppercase tracking-wide">Total Internships</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{college.placement.internshipStats.totalInternships}</div>
                        <p className="text-xs text-gray-500 mt-1">Across domestic and international roles</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2 text-gray-700">
                          <UserCheck className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-semibold uppercase tracking-wide">PPO Conversion</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{college.placement.internshipStats.ppoRate}%</div>
                        <p className="text-xs text-gray-500 mt-1">Pre-placement offers accepted</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2 text-gray-700">
                          <Globe2 className="h-5 w-5 text-purple-500" />
                          <span className="text-sm font-semibold uppercase tracking-wide">Global Internships</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{college.placement.internshipStats.globalInternships}</div>
                        <p className="text-xs text-gray-500 mt-1">Opportunities across 14 countries</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2 text-gray-700">
                          <DollarSign className="h-5 w-5 text-amber-500" />
                          <span className="text-sm font-semibold uppercase tracking-wide">Avg Stipend</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{college.placement.internshipStats.averageStipend}</div>
                        <p className="text-xs text-gray-500 mt-1">Monthly average across domains</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Recruiters</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {college.placement.topRecruiters.map((company, index) => (
                        <div key={index} className="border border-dashed border-blue-200 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                          <span className="text-sm font-semibold text-gray-800">{company}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Placement Process</h2>
                    <div className="space-y-4">
                      {college.placement.placementProcess.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-blue-600 font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{step.step}</h4>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Success Stories</h2>
                    <div className="space-y-4">
                      {college.placement.successStories.map((story, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-800">{story.name}</h3>
                              <p className="text-sm text-gray-600">{story.role} @ {story.company}</p>
                            </div>
                            <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                              <Rocket className="h-4 w-4" />
                              {story.package}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{story.story}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campus' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-500">
                  <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-blue-700 mb-6">🌟 Campus AI Shots</h2>
                  <Sparkles className="h-6 w-6 text-blue-600 mb-4 animate-bounce" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {college.campusExperience.lifestyleHighlights.map((highlight, index) => (
                    <div
                    key={index}
                    className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                    <h3 className="font-semibold text-blue-800 mb-2">{highlight.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{highlight.description}</p>
                    </div>
                  ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Support Ecosystem</h2>
                    <div className="space-y-4">
                      {college.campusExperience.supportServices.map((service, index) => {
                        const icons = [LifeBuoy, HeartPulse, Medal];
                        const Icon = icons[index % icons.length];
                        return (
                          <div key={index} className="flex gap-4 border border-gray-100 rounded-lg p-4">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{service.name}</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Dining & Late-night Spots</h2>
                    <div className="space-y-4">
                      {college.campusExperience.diningOptions.map((dining, index) => (
                        <div key={index} className="flex items-start gap-4 rounded-lg border border-gray-100 p-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-rose-50 text-rose-600">
                            <Utensils className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-gray-800">{dining.name}</h3>
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{dining.type}</span>
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">Open till {dining.openTill}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Signature: {dining.signature}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Sports & Fitness</h2>
                    <div className="space-y-4">
                      {college.campusExperience.sportsAndFitness.map((item, index) => (
                        <div key={index} className="flex gap-4 rounded-lg border border-gray-100 p-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 text-green-600">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Wellness Programs</h2>
                    <div className="space-y-4">
                      {college.campusExperience.wellnessPrograms.map((program, index) => (
                        <div key={index} className="flex gap-4 rounded-lg border border-gray-100 p-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Leaf className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{program.name}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{program.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Residential Life</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {college.campusExperience.residential.map((hostel, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5 hover:border-blue-300 transition-colors"
                      >
                        <div className="grid grid-cols-5 gap-6">
                          {/* Left Section */}
                          <div className="col-span-3">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold text-gray-800">{hostel.name}</h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  hostel.hostel_type.toLowerCase().includes('girls')
                                    ? 'bg-pink-100 text-pink-600'
                                    : hostel.hostel_type.toLowerCase().includes('boys')
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-green-100 text-green-600'
                                }`}
                              >
                                {hostel.hostel_type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{hostel.description}</p>
                            <div className="text-sm text-gray-600 mb-4">
                              <p><strong>Capacity:</strong> {hostel.capacity}</p>
                              <p><strong>Rooms:</strong> {hostel.rooms}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {hostel.facilities.map((facility, facilityIndex) => (
                                <span
                                  key={facilityIndex}
                                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                                >
                                  {facility}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
                              {hostel.gallery.map((image, imageIndex) => (
                                <div
                                  key={imageIndex}
                                  className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
                                  onClick={() => setSelectedImage(image.url)}
                                >
                                  <img
                                    src={image.url}
                                    alt={image.description}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <ImageIcon className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Section */}
                          <div className="col-span-2 overflow-y-auto max-h-[350px]">
                            <div className="space-y-4">
                              <h4 className="text-md font-semibold text-gray-800">Student Reviews</h4>
                              {hostel.reviews.map((review, reviewIndex) => (
                                <div
                                  key={reviewIndex}
                                  className="border border-gray-200 rounded-lg p-4 bg-white"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="font-medium text-gray-800">{review.student}</p>
                                      <p className="text-sm text-gray-600">{review.batch}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {Array.from({ length: 5 }).map((_, starIndex) => (
                                        <Star
                                          key={starIndex}
                                          className={`h-4 w-4 ${
                                            starIndex < review.ratings.overall
                                              ? 'text-yellow-400 fill-current'
                                              : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                                  <div className="grid lg:grid-cols-3 gap-2 text-xs text-gray-600">
                                    <div>
                                      <strong>Cleanliness:</strong> {review.ratings.cleanliness}/5
                                    </div>
                                    <div>
                                      <strong>Food Quality:</strong> {review.ratings.foodQuality}/5
                                    </div>
                                    <div>
                                      <strong>Infrastructure:</strong> {review.ratings.infrastructure}/5
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'clubs' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Student Clubs & Societies</h2>
                      <p className="text-sm text-gray-600">Explore active communities spanning technology, arts, culture, sports, and entrepreneurship.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{college.clubs.length}+ student-led clubs</p>
                        <p className="text-xs text-blue-600">Join orientation week to sign up</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.clubs.map((club) => (
                      <div
                        key={club.name}
                        className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-5 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{club.name}</h3>
                              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{club.description}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {club.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {club.mediaEmbed && (
                          <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-gray-200">
                            <iframe
                              src={club.mediaEmbed}
                              title={`${club.name} highlight`}
                              className="h-full w-full"
                              loading="lazy"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          {renderSocialLinks(club.social)}
                        </div>

                        <div className="mt-4 rounded-lg bg-white px-3 py-2 text-xs text-gray-600">
                          Reach out at{' '}
                          <a
                            href={`mailto:${club.contactEmail}`}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            {club.contactEmail}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Flagship Festivals & Annual Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {college.events.map((event) => (
                      <div
                        key={event.name}
                        className="flex flex-col overflow-hidden rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <img src={event.image} alt={event.name} className="h-40 w-full object-cover" />
                        <div className="p-5 flex flex-col gap-4">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-3">
                              <span className="bg-purple-100 text-purple-600 px-2.5 py-1 rounded text-xs font-semibold">
                                {event.type}
                              </span>
                              <div className="text-right">
                                <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {event.date}
                                </div>
                                <div className="mt-2 inline-flex items-start gap-1 text-[11px] text-gray-500">
                                  <MapPin className="h-3.5 w-3.5 text-blue-500" />
                                  <span className="max-w-[12rem] leading-4">{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                          </div>

                          <ul className="space-y-2 text-sm text-gray-600">
                            {event.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Medal className="h-4 w-4 text-amber-500 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          {event.mediaEmbed && (
                            <div className="aspect-video overflow-hidden rounded-lg border border-gray-200">
                              <iframe
                                src={event.mediaEmbed}
                                title={`${event.name} aftermovie`}
                                className="h-full w-full"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              ></iframe>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-3">
                            <Link
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Register now
                            </Link>
                            <div className="flex flex-wrap gap-2">
                              {renderSocialLinks(event.social)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Campus Infrastructure</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {college.infrastructure.overview}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {college.infrastructure.keyHighlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/40 p-3"
                      >
                        <Sparkles className="h-4 w-4 text-blue-500 mt-1" />
                        <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
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

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Innovation & Research Hubs</h2>
                  <div className="space-y-4">
                    {college.infrastructure.innovationCenters.map((center, index) => (
                      <div key={index} className="rounded-lg border border-blue-100 p-4 hover:border-blue-200 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">{center.name}</h3>
                            <p className="text-sm text-blue-600 mb-1">Focus: {center.focus}</p>
                          </div>
                          <Rocket className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{center.description}</p>
                        {center.link && (
                          <Link
                            href={center.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                          >
                            Explore hub
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart Campus Stack</h2>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {college.infrastructure.digitalInfrastructure.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Wifi className="h-5 w-5 text-blue-600 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sustainability Playbook</h2>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {college.infrastructure.sustainabilityInitiatives.map((item, index) => (
                        <li key={index} className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
                          <div className="flex items-start gap-3">
                            <Leaf className="h-5 w-5 text-emerald-500 mt-0.5" />
                            <div>
                              <p className="font-semibold text-gray-800">{item.title}</p>
                              <p className="text-gray-600 text-sm">{item.impact}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Mobility & Connectivity</h2>
                  <div className="space-y-4">
                    {college.infrastructure.transport.map((option, index) => (
                      <div key={index} className="flex items-start gap-4 rounded-lg border border-gray-100 p-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-sky-50 text-sky-600">
                          <Bus className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{option.mode}</h3>
                          <p className="text-sm text-gray-600">{option.frequency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Sentiment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.reviews.distribution.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-800">{item.label}</span>
                          <span className="text-blue-600 font-semibold">{item.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-2 bg-blue-500"
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">What Students Love</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.reviews.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1" />
                        <p className="text-gray-700 text-sm leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Testimonials</h2>
                  <div className="space-y-6">
                    {college.reviews.testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                            <p className="text-sm text-gray-600">{testimonial.program}</p>
                            <p className="text-xs text-blue-600 uppercase tracking-wide">{testimonial.batch}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`h-4 w-4 ${
                                  starIndex < testimonial.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">{testimonial.content}</p>
                      </div>
                    ))}
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
                        onClick={() => setSelectedImage(image.url)}
                      >
                        <img src={image.url} alt={image.description} className="w-full h-full object-cover" />
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
                  <div>
                    <p className="text-gray-600">{college.location.address}, {college.location.city}, {college.location.state} - {college.location.pincode}</p>

                    <div className="mt-3 rounded overflow-hidden border border-gray-100">
                      <iframe
                        src={`https://www.google.com/maps?q=${college.location.coordinates.lat},${college.location.coordinates.lng}&z=15&output=embed`}
                        width="100%"
                        height="200"
                        className="border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        title={`${college.name} location`}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              
                {/* Helplines */}
                {college.contact.helpline && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  {/* Admission Helpline */}
                  {college.contact.helpline.admission && (
                    <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Admission Helpline</p>
                    {college.contact.helpline.admission.phone && (
                      <p className="text-blue-600 font-semibold">
                      <Phone className="inline h-4 w-4 mr-1" />
                      {college.contact.helpline.admission.phone}
                      </p>
                    )}
                    {college.contact.helpline.admission.email && (
                      <p className="text-blue-600 font-semibold">
                      <Mail className="inline h-4 w-4 mr-1" />
                      {college.contact.helpline.admission.email}
                      </p>
                    )}
                    </div>
                  )}
                  {/* Scholarships Helpline */}
                  {college.contact.helpline.scholarships && (
                    <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Scholarship Helpline</p>
                    {college.contact.helpline.scholarships.phone && (
                      <p className="text-green-600 font-semibold">
                      <Phone className="inline h-4 w-4 mr-1" />
                      {college.contact.helpline.scholarships.phone}
                      </p>
                    )}
                    {college.contact.helpline.scholarships.email && (
                      <p className="text-green-600 font-semibold">
                      <Mail className="inline h-4 w-4 mr-1" />
                      {college.contact.helpline.scholarships.email}
                      </p>
                    )}
                    </div>
                  )}
                  {/* General Helpline */}
                  {college.contact.helpline.general && (
                    <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">General Helpline</p>
                    {college.contact.helpline.general.phone && (
                      <p className="text-gray-600 font-semibold">
                      <Phone className="inline h-4 w-4 mr-1" />
                      {college.contact.helpline.general.phone}
                      </p>
                    )}
                    {college.contact.helpline.general.email && (
                      <p className="text-gray-600 font-semibold">
                      <Mail className="inline h-4 w-4 mr-1" />
                      {college.contact.helpline.general.email}
                      </p>
                    )}
                    </div>
                  )}
                  </div>
                )}
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