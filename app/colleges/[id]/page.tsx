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
  Bus, Sparkles, Medal
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
    placementProcess: string[];
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
    applicationProcess: string;
    steps: string[];
    importantDates: Array<{
      event: string;
      startDate: string;
      endDate: string;
      status: 'Upcoming' | 'Ongoing' | 'Closed';
    }>;
    eligibility: Array<{
      program: string;
      criteria: string[];
    }>;
    requiredExams: Array<{
      name: string;
      score: string;
      weightage: string;
    }>;
    documents: string[];
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  academics: {
    courses: {
      undergraduate: string[];
      postgraduate: string[];
      phd: string[];
    };
    departments: Array<{
      name: string;
      summary: string;
      strengths: string[];
      undergraduateCourses: string[];
      postgraduateCourses: string[];
      phdCourses: string[];
    }>;
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
    hostel: {
      capacity: number;
      rooms: string;
      facilities: string[];
    };
    innovationCenters: Array<{
      name: string;
      focus: string;
      description: string;
      link?: string;
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
  socialMedia: {
    official: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
      linkedin?: string;
    };
  };
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
      content: string;
      rating: number;
    }>;
  };
  images: {
    campus: string[];
    hostel: string[];
    facilities: string[];
    events: string[];
  };
  campusExperience: {
    lifestyleHighlights: Array<{
      title: string;
      description: string;
    }>;
    dailyTimeline: Array<{
      time: string;
      activity: string;
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
  clubs: Array<{
    name: string;
    description: string;
    achievements: string[];
    contactEmail: string;
    social: {
      instagram?: string;
      youtube?: string;
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      discord?: string;
      website?: string;
    };
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
    social: {
      instagram?: string;
      youtube?: string;
      facebook?: string;
      twitter?: string;
      website?: string;
      linkedin?: string;
    };
    mediaEmbed?: string;
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
  const [selectedImageCategory, setSelectedImageCategory] = useState<keyof CollegeData['images']>('campus');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

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
        medianPackage: '₹23 LPA',
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey', 'Flipkart'],
        internationalOffers: 32,
        salaryTrends: [
          { year: 2024, average: '₹25 LPA', highest: '₹2.1 Cr', placementRate: 95 },
          { year: 2023, average: '₹24 LPA', highest: '₹1.8 Cr', placementRate: 94 },
          { year: 2022, average: '₹22 LPA', highest: '₹1.6 Cr', placementRate: 92 },
          { year: 2021, average: '₹20 LPA', highest: '₹1.4 Cr', placementRate: 90 }
        ],
        sectorDistribution: [
          { sector: 'Technology & Product', percentage: 42 },
          { sector: 'Consulting & Strategy', percentage: 21 },
          { sector: 'Finance & Analytics', percentage: 16 },
          { sector: 'Core Engineering', percentage: 14 },
          { sector: 'Research & Higher Studies', percentage: 7 }
        ],
        internshipStats: {
          totalInternships: 780,
          ppoRate: 68,
          globalInternships: 94,
          averageStipend: '₹1.5 LPM'
        },
        placementProcess: [
          'Pre-placement talks and company registrations open in August.',
          'Students shortlist companies and submit resumes for profile-based shortlisting.',
          'Aptitude tests, group discussions, and technical interviews run from November.',
          'Final placement interviews are conducted in multiple slots through December and January.'
        ],
        successStories: [
          {
            name: 'Ishaan Malhotra',
            company: 'Google Mountain View',
            package: '$265K',
            role: 'Software Engineer',
            story:
              'Secured a role through the international placement drive after leading projects at the Analytics Club and winning the ACM ICPC regionals.'
          },
          {
            name: 'Megha Rao',
            company: 'McKinsey & Company',
            package: '₹42 LPA',
            role: 'Business Analyst',
            story:
              'Converted a pre-placement offer following a summer internship where she co-authored a digital transformation roadmap for a Fortune 100 client.'
          }
        ],
        branchwise: [
          {
            name: 'Computer Science & Engineering',
            averagePackage: '₹32 LPA',
            medianPackage: '₹29 LPA',
            highestPackage: '₹2.1 Cr',
            placementRate: 99,
            offers: 210,
            topRoles: ['Software Engineer', 'AI/ML Engineer', 'Product Manager'],
            recruiters: ['Google', 'Microsoft', 'Apple', 'LinkedIn']
          },
          {
            name: 'Electrical Engineering',
            averagePackage: '₹24 LPA',
            medianPackage: '₹22 LPA',
            highestPackage: '₹78 LPA',
            placementRate: 96,
            offers: 185,
            topRoles: ['Hardware Engineer', 'Energy Consultant', 'Analog Design Engineer'],
            recruiters: ['Texas Instruments', 'Qualcomm', 'Samsung', 'GE']
          },
          {
            name: 'Mechanical Engineering',
            averagePackage: '₹18 LPA',
            medianPackage: '₹16 LPA',
            highestPackage: '₹52 LPA',
            placementRate: 93,
            offers: 160,
            topRoles: ['Manufacturing Engineer', 'Automotive R&D Engineer', 'Supply Chain Analyst'],
            recruiters: ['Bosch', 'Mahindra', 'Rolls-Royce', 'Tata Motors']
          },
          {
            name: 'Mathematics & Computing',
            averagePackage: '₹28 LPA',
            medianPackage: '₹25 LPA',
            highestPackage: '₹1.2 Cr',
            placementRate: 98,
            offers: 140,
            topRoles: ['Quant Analyst', 'Data Scientist', 'Risk Strategist'],
            recruiters: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'DE Shaw']
          },
          {
            name: 'Chemical Engineering',
            averagePackage: '₹16 LPA',
            medianPackage: '₹14 LPA',
            highestPackage: '₹39 LPA',
            placementRate: 91,
            offers: 120,
            topRoles: ['Process Engineer', 'Sustainability Consultant', 'R&D Scientist'],
            recruiters: ['ExxonMobil', 'Shell', 'ITC', 'Honeywell']
          }
        ]
      },
      admissions: {
        applicationProcess:
          'Admissions at IIT Delhi follow national-level entrance examinations with centralized counselling and institute-level verification.',
        steps: [
          'Qualify JEE Main and appear for JEE Advanced with a competitive All India Rank.',
          'Register for the Joint Seat Allocation Authority (JoSAA) counselling and complete choice filling.',
          'Lock preferred branches during the counselling window and await seat allotment results.',
          'Report to IIT Delhi for document verification, fee payment, and orientation formalities.'
        ],
        importantDates: [
          { event: 'JEE Main Session 1', startDate: '2023-01-24', endDate: '2023-02-01', status: 'Closed' },
          { event: 'JEE Advanced Examination', startDate: '2023-06-04', endDate: '2023-06-04', status: 'Closed' },
          { event: 'JoSAA Counselling', startDate: '2023-06-19', endDate: '2023-07-31', status: 'Closed' },
          { event: 'Institute Reporting', startDate: '2023-08-10', endDate: '2023-08-15', status: 'Ongoing' },
          { event: 'Orientation & Induction', startDate: '2023-08-20', endDate: '2023-08-25', status: 'Upcoming' }
        ],
        eligibility: [
          {
            program: 'B.Tech Programmes',
            criteria: [
              'Minimum 75% marks in Class XII (65% for SC/ST candidates).',
              'Mandatory subjects: Physics, Chemistry, Mathematics.',
              'Valid JEE Advanced rank within the opening and closing ranges announced by JoSAA.'
            ]
          },
          {
            program: 'M.Tech Programmes',
            criteria: [
              'Bachelor’s degree in relevant discipline with at least 60% aggregate.',
              'Valid GATE score meeting the departmental cut-off.',
              'Departmental interview for certain specialisations.'
            ]
          },
          {
            program: 'MBA Programmes',
            criteria: [
              'Bachelor’s degree with minimum 60% aggregate.',
              'Competitive CAT percentile (98+ recommended).',
              'Personal interview and writing ability test conducted by DMS, IIT Delhi.'
            ]
          }
        ],
        requiredExams: [
          { name: 'JEE Advanced', score: 'AIR within top 5000', weightage: '60%' },
          { name: 'Class XII Board Exams', score: 'Minimum 75% aggregate', weightage: '10%' },
          { name: 'JoSAA Counselling', score: 'Seat allotment & document verification', weightage: '30%' }
        ],
        documents: [
          'JEE Advanced admit card and rank card',
          'Class X and XII mark sheets and passing certificates',
          'Category, PwD, or EWS certificate (if applicable)',
          'Passport-sized colour photographs',
          'Government-issued photo ID and proof of address'
        ],
        faqs: [
          {
            question: 'Is there any relaxation for reserved categories?',
            answer:
              'IIT Delhi follows the Government of India reservation policy with relaxed cut-offs, fee concessions, and preparatory courses for eligible categories.'
          },
          {
            question: 'Can international students apply?',
            answer:
              'International candidates can apply through the DASA scheme, ICCR scholarships, or specific MoUs that IIT Delhi maintains with partner institutions.'
          }
        ]
      },
      academics: {
        courses: {
          undergraduate: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Electrical', 'B.Tech Civil'],
          postgraduate: ['M.Tech', 'MBA', 'M.Sc', 'M.Des'],
          phd: ['Ph.D in Engineering', 'Ph.D in Science', 'Ph.D in Management']
        },
        departments: [
          {
            name: 'Computer Science & Engineering',
            summary: 'Advanced computing, artificial intelligence, and scalable systems research with strong industry partnerships.',
            strengths: ['AI & ML Centers', 'High Performance Computing Lab', 'Startup Incubation Support'],
            undergraduateCourses: ['B.Tech Computer Science and Engineering', 'Dual Degree (B.Tech + M.Tech) Computer Science'],
            postgraduateCourses: ['M.Tech Computer Science & Engineering', 'M.S.(R) Computer Science'],
            phdCourses: ['Ph.D Computer Science & Engineering']
          },
          {
            name: 'Electrical Engineering',
            summary: 'Power systems, microelectronics, and communications programs with modern laboratories and national projects.',
            strengths: ['VLSI & Nanoelectronics Lab', 'Smart Grid Research', '5G & IoT Testbeds'],
            undergraduateCourses: ['B.Tech Electrical Engineering', 'B.Tech Engineering Physics'],
            postgraduateCourses: ['M.Tech Power Electronics', 'M.Tech Communications Engineering'],
            phdCourses: ['Ph.D Electrical Engineering']
          },
          {
            name: 'Mechanical Engineering',
            summary: 'Focus on design, manufacturing, thermal sciences, and robotics with extensive cross-disciplinary collaborations.',
            strengths: ['Robotics & Automation Center', 'Advanced Manufacturing Lab', 'Thermal Systems Research'],
            undergraduateCourses: ['B.Tech Mechanical Engineering', 'B.Tech Production & Industrial Engineering'],
            postgraduateCourses: ['M.Tech Design Engineering', 'M.Tech Thermal Engineering'],
            phdCourses: ['Ph.D Mechanical Engineering']
          },
          {
            name: 'Civil Engineering',
            summary: 'Sustainable infrastructure, transportation, and water resources engineering projects impacting smart city initiatives.',
            strengths: ['Structural Dynamics Lab', 'Smart Cities Mission Projects', 'Geospatial Research Hub'],
            undergraduateCourses: ['B.Tech Civil Engineering'],
            postgraduateCourses: ['M.Tech Structural Engineering', 'M.Tech Transportation Engineering'],
            phdCourses: ['Ph.D Civil Engineering']
          },
          {
            name: 'Chemical Engineering',
            summary: 'Bridges fundamental sciences with industrial processes, sustainability goals, and new materials development.',
            strengths: ['Renewable Energy Processes', 'Process Simulation Suite', 'Materials Innovation Center'],
            undergraduateCourses: ['B.Tech Chemical Engineering'],
            postgraduateCourses: ['M.Tech Process Engineering', 'M.Tech Polymer Science & Technology'],
            phdCourses: ['Ph.D Chemical Engineering']
          },
          {
            name: 'Aerospace Engineering',
            summary: 'Aerodynamics, propulsion, avionics, and space technologies supported by world-class testing facilities.',
            strengths: ['Wind Tunnel Facility', 'UAV & Space Systems Lab', 'ISRO & DRDO Projects'],
            undergraduateCourses: ['B.Tech Aerospace Engineering'],
            postgraduateCourses: ['M.Tech Aerodynamics & Propulsion', 'M.Tech Flight Mechanics & Control'],
            phdCourses: ['Ph.D Aerospace Engineering']
          }
        ],
        facultyCount: 450,
        studentFacultyRatio: '1:8'
      },
      infrastructure: {
        overview:
          'IIT Delhi’s 325-acre smart campus blends academic rigor with collaborative spaces, innovation districts, and student-centric amenities designed to support round-the-clock learning and community life.',
        keyHighlights: [
          'Integrated academic, hostel, and recreational zones within a 10-minute walk',
          '24/7 digitized access to libraries, labs, and collaborative studios',
          'IoT-enabled sustainability initiatives cutting emissions by 35%'
        ],
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
        },
        innovationCenters: [
          {
            name: 'Technology Business Incubator',
            focus: 'Startup acceleration & seed funding support',
            description: 'Provides co-working space, mentorship, and investor connects for student-led ventures.',
            link: 'https://tbi.iitd.ac.in'
          },
          {
            name: 'Centre for AI & Robotics',
            focus: 'Artificial Intelligence & Autonomous Systems',
            description: 'Houses advanced computing clusters, robotics labs, and industry-sponsored research pods.',
            link: 'https://cair.iitd.ac.in'
          },
          {
            name: 'Sustainable Energy Lab',
            focus: 'Renewable energy & climate tech',
            description: 'Dedicated facility for solar, wind, and energy storage research in partnership with global energy players.',
            link: 'https://sustenergy.iitd.ac.in'
          }
        ],
        digitalInfrastructure: [
          '10 Gbps backbone network with campus-wide Wi-Fi 6 coverage',
          'Smart classrooms equipped with AR/VR pods and lecture capture systems',
          'AI-enabled library discovery system with 24/7 digital access',
          'Student super-app consolidating attendance, courseware, and campus services'
        ],
        sustainabilityInitiatives: [
          {
            title: 'Net-Zero by 2030 Roadmap',
            impact: 'Current campus emissions already reduced by 35% via solar rooftops and smart metering.'
          },
          {
            title: 'Water Positive Campus',
            impact: 'Rainwater harvesting, greywater recycling, and AI-monitored usage save 18 million litres annually.'
          },
          {
            title: 'Zero-Waste Hostels',
            impact: 'Segregated waste streams with biogas plants powering hostel kitchens.'
          }
        ],
        transport: [
          { mode: 'EV Shuttle Network', frequency: 'Runs every 7 minutes covering all hostels and departments' },
          { mode: 'City Bus Interchange', frequency: 'Dedicated DTC services at campus gate during peak hours' },
          { mode: 'Cycling Infrastructure', frequency: '700+ shared bicycles with docking stations across campus' }
        ]
      },
      socialMedia: {
        official: {
          facebook: 'https://facebook.com/iitdelhi',
          twitter: 'https://twitter.com/iitdelhi',
          instagram: 'https://instagram.com/iitdelhi',
          youtube: 'https://youtube.com/iitdelhi',
          linkedin: 'https://linkedin.com/school/iitdelhi'
        }
      },
      reviews: {
        highlights: [
          'Faculty actively encourage interdisciplinary research and innovation.',
          'Robust alumni mentorship ensures industry exposure and networking.',
          'Student bodies run over 200 clubs that keep the campus vibrant year-round.'
        ],
        distribution: [
          { label: 'Academics', value: 96 },
          { label: 'Placements', value: 94 },
          { label: 'Infrastructure', value: 91 },
          { label: 'Campus Life', value: 89 },
          { label: 'Value for Money', value: 88 }
        ],
        testimonials: [
          {
            name: 'Ananya Verma',
            program: 'B.Tech Computer Science',
            batch: 'Class of 2025',
            content:
              'The curriculum is rigorous but the ecosystem pushes you to innovate. Access to labs and mentorship helped me co-found a startup in my second year.',
            rating: 5
          },
          {
            name: 'Rahul Mehta',
            program: 'MBA',
            batch: 'Class of 2023',
            content:
              'Industry projects, leadership labs, and the peer group at DMS IIT Delhi prepared me for consulting roles with top firms.',
            rating: 4
          },
          {
            name: 'Sneha Kulkarni',
            program: 'M.Tech Mechanical Engineering',
            batch: 'Class of 2024',
            content:
              'International collaborations and fully-equipped research centres made it easy to pursue cutting-edge work in sustainable manufacturing.',
            rating: 5
          }
        ]
      },
      images: {
        campus: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
        hostel: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
        facilities: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
        events: ['/api/placeholder/800/600', '/api/placeholder/800/600']
      },
      campusExperience: {
        lifestyleHighlights: [
          {
            title: 'Interdisciplinary Learning Pods',
            description: 'Evenings see cross-disciplinary teams collaborating on hackathons, design jams, and policy labs.'
          },
          {
            title: 'Vibrant Cultural Calendar',
            description: 'From open mic nights to classical concerts, multiple student societies host performances every week.'
          },
          {
            title: 'Nightlife that Nurtures',
            description: '24/7 reading rooms, late-night cafes, and safe mobility ensure productivity beyond classroom hours.'
          }
        ],
        dailyTimeline: [
          { time: '06:30', activity: 'Joggers, cyclists, and sports teams take over the athletics track and fitness trails.' },
          { time: '09:00', activity: 'Core lectures and lab sessions kick off across departments with blended learning setups.' },
          { time: '13:00', activity: 'Hostel messes and food courts serve regional cuisines alongside healthy salad bars.' },
          { time: '17:30', activity: 'Clubs meet for rehearsals, coding sprints, debating leagues, and social impact initiatives.' },
          { time: '22:00', activity: 'Study lounges, maker spaces, and the central library remain abuzz with collaborative projects.' }
        ],
        supportServices: [
          {
            name: 'Career Development Cell',
            description: 'Resume clinics, mock interviews, and sector-specific mentoring led by alumni and industry experts.'
          },
          {
            name: 'Student Wellbeing Office',
            description: 'On-call counsellors, wellness workshops, and mental health first-aiders deployed hostel-wise.'
          },
          {
            name: 'Academic Success Studio',
            description: 'Peer-assisted learning modules, writing labs, and analytics-backed course planning support.'
          }
        ],
        diningOptions: [
          { name: 'Himalayan Hub', type: 'Multi-cuisine Food Court', signature: 'Pan-Asian live counters & organic salad bar', openTill: '01:00 AM' },
          { name: 'Nilgiri Mess', type: 'Hostel Dining', signature: 'Local farm-to-table menu with weekly millet specials', openTill: '10:00 PM' },
          { name: 'The Innovation Café', type: 'Grab-n-Go & Specialty Coffee', signature: 'Nitro brews, protein bowls, keto-friendly snacks', openTill: '02:00 AM' }
        ],
        sportsAndFitness: [
          { name: 'Olympic-size Aquatic Complex', details: 'Heated pool with underwater cameras and FINA-compliant lanes.' },
          { name: 'High-Performance Gym', details: 'Strength & conditioning arena with wearable tech tracking and physiotherapy suite.' },
          { name: 'Multi-sport Indoor Arena', details: 'Badminton, squash, climbing wall, and esports lab under one roof.' }
        ],
        wellnessPrograms: [
          { name: 'Mindful Mondays', description: 'Guided meditation and breathwork sessions facilitated by certified practitioners.' },
          { name: 'Fit@IITD', description: 'Campus-wide step challenges, sports leagues, and personalised fitness coaching.' },
          { name: 'Thrive Circles', description: 'Peer-led support groups discussing academic resilience and work-life balance.' }
        ]
      },
      alumniNetwork: {
        totalAlumni: 50000,
        notableAlumni: [
          { name: 'Sundar Pichai', position: 'CEO', company: 'Google', image: '/api/placeholder/100/100' },
          { name: 'Vinod Khosla', position: 'Co-founder', company: 'Sun Microsystems', image: '/api/placeholder/100/100' },
          { name: 'Rajat Gupta', position: 'Former MD', company: 'McKinsey', image: '/api/placeholder/100/100' }
        ]
      },
      clubs: [
        {
          name: 'Robotics Club',
          description: 'Designs autonomous systems, humanoids, and swarm robotics while mentoring school outreach teams.',
          achievements: [
            'ABU Robocon India 2024 champions with three innovation laurels',
            'Published two IEEE papers on modular swarm navigation in 2023'
          ],
          contactEmail: 'robotics.club@iitd.ac.in',
          social: {
            instagram: 'https://www.instagram.com/iitdrobotics/',
            youtube: 'https://www.youtube.com/@iitdrobotics',
            discord: 'https://discord.gg/robotics-iitd',
            website: 'https://robotics.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/0uaquGZKx_0'
        },
        {
          name: 'Coding Club',
          description: 'Competitive programming, open-source cohorts, and hackathons powering the institute tech community.',
          achievements: [
            'Ranked #2 globally in ICPC 2024 Asia-West regionals',
            'Maintains 40+ open-source repositories adopted by startups'
          ],
          contactEmail: 'coding.club@iitd.ac.in',
          social: {
            twitter: 'https://twitter.com/iitdcoding',
            linkedin: 'https://www.linkedin.com/company/iitd-coding-club/',
            website: 'https://codingclub.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/PkZNo7MFNFg'
        },
        {
          name: 'Entrepreneurship & Leadership Cell',
          description: 'Startup accelerator, mentorship network, and angel connect platform run by student founders.',
          achievements: [
            'Incubated 22 funded startups in the last three cohorts',
            'Hosted Asia’s largest campus investor day with 180 VCs'
          ],
          contactEmail: 'els.iitd@iitd.ac.in',
          social: {
            instagram: 'https://www.instagram.com/iitd_elc/',
            linkedin: 'https://www.linkedin.com/company/iitd-entrepreneurship-cell/',
            facebook: 'https://www.facebook.com/iitdelhi.ecell',
            website: 'https://ecell.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/t6fdJ5N0X9Q'
        },
        {
          name: 'Music Society (MeLa)',
          description: 'Choirs, bands, and producers collaborating on fusions, EDM, and classical showcases.',
          achievements: [
            'Released “Raaga Reloaded” EP featuring 15 campus artists',
            'Winners of Mood Indigo “Battle of Bands” 2023'
          ],
          contactEmail: 'music.society@iitd.ac.in',
          social: {
            instagram: 'https://www.instagram.com/mela_iitd/',
            youtube: 'https://www.youtube.com/channel/UCMeLaSessions',
            website: 'https://mela.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/7NOSDKb0HlU'
        },
        {
          name: 'Lenscraft Collective',
          description: 'Photography and film-making storytellers documenting campus, culture, and research breakthroughs.',
          achievements: [
            'Curated India’s first student-run XR photo festival',
            'Official photography partner for 30+ national events'
          ],
          contactEmail: 'lenscraft@iitd.ac.in',
          social: {
            instagram: 'https://www.instagram.com/iitd_lenscraft/',
            youtube: 'https://www.youtube.com/@lenscraftfilms',
            website: 'https://lenscraft.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/1La4QzGeaaQ'
        },
        {
          name: 'Stagecraft Society',
          description: 'Theatre troupe producing dramas, improv, and street plays on social impact narratives.',
          achievements: [
            'Best script & ensemble at IIT Bombay’s StageFest 2024',
            'Styled 12-city street play tour on sustainability awareness'
          ],
          contactEmail: 'stagecraft@iitd.ac.in',
          social: {
            facebook: 'https://www.facebook.com/stagecraftiitd',
            instagram: 'https://www.instagram.com/stagecraft_iitd/',
            youtube: 'https://www.youtube.com/@stagecraftplays'
          },
          mediaEmbed: 'https://www.youtube.com/embed/JXh1Gd2N4Vg'
        }
      ],
      events: [
        {
          name: 'Rendezvous',
          type: 'Cultural Fest',
          description: 'Four-day celebration with concerts, workshops, and 180+ competitions attracting 120K+ attendees.',
          date: '2024-03-15',
          image: '/api/placeholder/400/300',
          location: 'Main Campus • Open Air Theatre & Cultural Blocks',
          registrationLink: 'https://rendezvous.iitd.ac.in/register',
          highlights: [
            'Headliner nights featuring global indie and fusion artists',
            'Experiential villages, creator meetups, and interactive art trails',
            'Flagship competitions: Blitzkrieg, Stage Play, Campus Princess'
          ],
          social: {
            instagram: 'https://www.instagram.com/rendezvousiitd/',
            youtube: 'https://www.youtube.com/@rendezvousiitd',
            facebook: 'https://www.facebook.com/rendezvousiitd',
            website: 'https://rendezvous.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/0uaquGZKx_0'
        },
        {
          name: 'Tryst',
          type: 'Tech Fest',
          description: 'National technology conclave with keynote speakers, makeathons, and industry showcases.',
          date: '2024-02-20',
          image: '/api/placeholder/400/300',
          location: 'Convention Centre & Research Park',
          registrationLink: 'https://tryst.iitd.ac.in/register',
          highlights: [
            '48-hour flagship hackathon with $25K prize pool',
            'Hands-on labs in AI, quantum, space tech, and climate action',
            'Deep-tech expo co-hosted with 35 research labs and unicorns'
          ],
          social: {
            twitter: 'https://twitter.com/trystiitd',
            linkedin: 'https://www.linkedin.com/company/tryst-iit-delhi/',
            youtube: 'https://www.youtube.com/@trystiitdelhi',
            website: 'https://tryst.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/wX78iKhInsc'
        },
        {
          name: 'E-Summit',
          type: 'Startup Summit',
          description: 'Entrepreneurship summit uniting founders, investors, and policymakers for curated masterclasses.',
          date: '2024-09-05',
          image: '/api/placeholder/400/300',
          location: 'Technology Business Incubator & Lecture Hall Complex',
          registrationLink: 'https://esummit.iitd.ac.in/register',
          highlights: [
            'Reverse pitch arena with 60+ venture funds',
            'Founder fireside chats with unicorn leaders and alumni',
            'Micro accelerator demo day featuring 15 campus startups'
          ],
          social: {
            instagram: 'https://www.instagram.com/esummitiitd/',
            linkedin: 'https://www.linkedin.com/company/iitd-esummit/',
            website: 'https://esummit.iitd.ac.in'
          },
          mediaEmbed: 'https://www.youtube.com/embed/t6fdJ5N0X9Q'
        }
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

  useEffect(() => {
    if (college && college.placement.branchwise.length > 0) {
      setSelectedBranch((prev) => prev || college.placement.branchwise[0].name);
    }
  }, [college]);

  useEffect(() => {
    if (college && college.academics.departments.length > 0) {
      setSelectedDepartment((prev) => prev || college.academics.departments[0].name);
    }
  }, [college]);

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

  const getStatusBadgeClasses = (
    status: CollegeData['admissions']['importantDates'][number]['status']
  ) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-600';
      case 'Ongoing':
        return 'bg-green-100 text-green-600';
      case 'Closed':
        return 'bg-gray-200 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'campus', label: 'Campus Life', icon: Home },
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

  const selectedDepartmentData = college.academics.departments.find(
    (dept) => dept.name === selectedDepartment
  );

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

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Scholarships & Financial Aid</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.scholarships.map((scholarship, index) => (
                      <div key={index} className="border border-dashed border-blue-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">{scholarship.name}</h3>
                            <p className="text-sm text-blue-600">{scholarship.amount}</p>
                          </div>
                          <Award className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{scholarship.description}</p>
                        <p className="text-xs uppercase tracking-wide text-gray-500">Eligibility: {scholarship.eligibility}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Funding & Grants</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="rounded-lg bg-green-50 border border-green-100 p-5 text-center">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700">{college.funding.totalFunding}</div>
                      <p className="text-sm text-gray-600">Total Funding Secured</p>
                    </div>
                    <div className="lg:col-span-2 rounded-lg border border-gray-200 p-5">
                      <h3 className="font-semibold text-gray-800 mb-3">Funding Sources</h3>
                      <div className="flex flex-wrap gap-2">
                        {college.funding.sources.map((source, index) => (
                          <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Recent Grants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {college.funding.recentGrants.map((grant, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-600">{grant.source}</span>
                            <span className="text-xs text-gray-500">{grant.year}</span>
                          </div>
                          <p className="text-lg font-semibold text-gray-800">{grant.amount}</p>
                          <p className="text-sm text-gray-600">{grant.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="space-y-8">
                {/* Departments */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Departments</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {college.academics.departments.map((dept) => {
                      const isActive = selectedDepartment === dept.name;
                      return (
                        <button
                          key={dept.name}
                          type="button"
                          onClick={() => setSelectedDepartment(dept.name)}
                          className={`text-left rounded-lg border p-4 transition-colors ${
                            isActive
                              ? 'border-blue-500 bg-blue-50 shadow-sm'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-800 mb-1">{dept.name}</h3>
                            </div>
                            <div className={`rounded-full border p-1 ${isActive ? 'border-blue-400 bg-white text-blue-500' : 'border-gray-200 text-gray-400'}`}>
                              <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {dept.strengths.slice(0, 3).map((strength) => (
                              <span key={strength} className="rounded-full bg-blue-100 text-blue-600 px-2 py-0.5 text-xs font-medium">
                                {strength}
                              </span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedDepartmentData && (
                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Courses Offered — {selectedDepartmentData.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedDepartmentData.strengths.map((strength) => (
                          <span key={strength} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                            {strength}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-800">Undergraduate</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            {selectedDepartmentData.undergraduateCourses.map((course) => (
                              <li key={course} className="rounded-lg bg-white px-3 py-2 shadow-sm">{course}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="h-5 w-5 text-green-600" />
                            <h4 className="font-semibold text-gray-800">Postgraduate</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            {selectedDepartmentData.postgraduateCourses.map((course) => (
                              <li key={course} className="rounded-lg bg-white px-3 py-2 shadow-sm">{course}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Trophy className="h-5 w-5 text-purple-600" />
                            <h4 className="font-semibold text-gray-800">Doctoral</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            {selectedDepartmentData.phdCourses.map((course) => (
                              <li key={course} className="rounded-lg bg-white px-3 py-2 shadow-sm">{course}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
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

            {activeTab === 'admissions' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Admission Process</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{college.admissions.applicationProcess}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.admissions.steps.map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <ListChecks className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Step {index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Important Dates</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">Event</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">Start Date</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">End Date</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {college.admissions.importantDates.map((dateItem, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 font-medium text-gray-800">{dateItem.event}</td>
                            <td className="px-4 py-3 text-gray-600">{dateItem.startDate}</td>
                            <td className="px-4 py-3 text-gray-600">{dateItem.endDate}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(dateItem.status)}`}>
                                {dateItem.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Eligibility Criteria</h2>
                    <div className="space-y-4">
                      {college.admissions.eligibility.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold text-gray-800">{item.program}</h3>
                          </div>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            {item.criteria.map((criterion, criterionIndex) => (
                              <li key={criterionIndex}>{criterion}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Required Exams & Documents</h2>
                    <div className="space-y-4">
                      {college.admissions.requiredExams.map((exam, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Award className="h-5 w-5 text-green-500" />
                              <h3 className="font-semibold text-gray-800">{exam.name}</h3>
                            </div>
                            <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-medium">{exam.weightage}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{exam.score}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Documents Checklist</h3>
                      <div className="flex flex-wrap gap-2">
                        {college.admissions.documents.map((document, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                          >
                            <FileCheck className="h-3 w-3 text-blue-500" />
                            {document}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Admissions FAQs</h2>
                  <div className="space-y-4">
                    {college.admissions.faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="h-5 w-5 text-blue-500 mt-1" />
                          <div>
                            <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                            <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                          </div>
                        </div>
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
                          <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Success Stories</h2>
                    <div className="space-y-4">
                      {college.placement.successStories.map((story, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
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
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Campus Vibe Snapshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {college.campusExperience.lifestyleHighlights.map((highlight, index) => {
                      const icons = [Sparkles, Sun, Moon];
                      const Icon = icons[index % icons.length];
                      return (
                        <div key={index} className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-5">
                          <Icon className="h-6 w-6 text-blue-600 mb-3" />
                          <h3 className="font-semibold text-gray-800 mb-2">{highlight.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{highlight.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">A Day on Campus</h2>
                  <div className="relative pl-6">
                    <div className="absolute left-2 top-1 bottom-1 w-px bg-blue-100"></div>
                    {college.campusExperience.dailyTimeline.map((slot, index) => {
                      const Icon = timelineIcons[index % timelineIcons.length];
                      const isLast = index === college.campusExperience.dailyTimeline.length - 1;
                      return (
                        <div key={index} className={`relative flex gap-4 pb-6 ${isLast ? 'pb-0' : ''}`}>
                          <div className="absolute -left-[22px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{slot.time}</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{slot.activity}</p>
                          </div>
                        </div>
                      );
                    })}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Accommodation Overview</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Capacity: {college.infrastructure.hostel.capacity.toLocaleString()} students</li>
                        <li>• Room Types: {college.infrastructure.hostel.rooms}</li>
                        <li>• Separate hostels for boys and girls</li>
                        <li>• 24/7 Security</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">In-Hostel Essentials</h3>
                      <div className="flex flex-wrap gap-2">
                        {college.infrastructure.hostel.facilities.map((facility, index) => (
                          <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <div>
                      <p className="font-semibold text-gray-800">Hostel Rating: {college.ratings.hostelLife}/5</p>
                      <p className="text-sm text-gray-600">Aggregated from verified student reviews</p>
                    </div>
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
                            <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
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