'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Clock, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  ChevronRight,
  Star,
  Target,
  DollarSign
} from 'lucide-react';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 'Engineering', 'Medical', 'Management', 'Arts & Science', 'Law', 
    'Commerce', 'Design', 'Technology', 'Pharmacy', 'Agriculture'
  ];

  const levels = ['All', 'Undergraduate', 'Postgraduate', 'Doctorate', 'Diploma', 'Certificate'];
  const durations = ['All', '1 Year', '2 Years', '3 Years', '4 Years', '5+ Years'];
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'salary', label: 'Highest Salary' },
    { value: 'duration', label: 'Duration' },
    { value: 'alphabetical', label: 'A to Z' }
  ];

  // Sample courses data
  const courses = [
    {
      id: 1,
      name: 'Computer Science Engineering',
      shortName: 'CSE',
      category: 'Engineering',
      level: 'Undergraduate',
      duration: '4 Years',
      description: 'Comprehensive program covering programming, algorithms, software development, AI/ML, and emerging technologies.',
      avgSalary: '₹12 LPA',
      topSalary: '₹50 LPA',
      popularity: 95,
      colleges: 2500,
      students: '8 Lakh',
      trending: true,
      difficulty: 'High',
      skills: ['Programming', 'Data Structures', 'Web Development', 'AI/ML', 'Database Management'],
      careerOptions: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Full Stack Developer'],
      topColleges: ['IIT Delhi', 'IIT Bombay', 'BITS Pilani', 'NIT Trichy'],
      entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Bachelor of Medicine and Bachelor of Surgery',
      shortName: 'MBBS',
      category: 'Medical',
      level: 'Undergraduate',
      duration: '5.5 Years',
      description: 'Comprehensive medical education covering anatomy, physiology, pathology, pharmacology, and clinical practice.',
      avgSalary: '₹15 LPA',
      topSalary: '₹80 LPA',
      popularity: 92,
      colleges: 596,
      students: '1.5 Lakh',
      trending: true,
      difficulty: 'Very High',
      skills: ['Clinical Skills', 'Diagnosis', 'Surgery', 'Patient Care', 'Medical Research'],
      careerOptions: ['Doctor', 'Surgeon', 'Medical Researcher', 'Healthcare Administrator'],
      topColleges: ['AIIMS Delhi', 'CMC Vellore', 'KGMU', 'JIPMER'],
      entranceExams: ['NEET', 'AIIMS MBBS', 'JIPMER MBBS'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Master of Business Administration',
      shortName: 'MBA',
      category: 'Management',
      level: 'Postgraduate',
      duration: '2 Years',
      description: 'Advanced business education focusing on leadership, strategy, finance, marketing, and operations management.',
      avgSalary: '₹18 LPA',
      topSalary: '₹60 LPA',
      popularity: 88,
      colleges: 5000,
      students: '4 Lakh',
      trending: true,
      difficulty: 'High',
      skills: ['Leadership', 'Strategy', 'Finance', 'Marketing', 'Operations'],
      careerOptions: ['Management Consultant', 'Business Analyst', 'Marketing Manager', 'Investment Banker'],
      topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'ISB Hyderabad'],
      entranceExams: ['CAT', 'XAT', 'GMAT', 'MAT'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'Data Science',
      shortName: 'Data Science',
      category: 'Technology',
      level: 'Postgraduate',
      duration: '2 Years',
      description: 'Interdisciplinary field combining statistics, programming, and domain expertise to extract insights from data.',
      avgSalary: '₹14 LPA',
      topSalary: '₹45 LPA',
      popularity: 90,
      colleges: 800,
      students: '2 Lakh',
      trending: true,
      difficulty: 'High',
      skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'Big Data'],
      careerOptions: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Research Scientist'],
      topColleges: ['IIT Madras', 'ISI Kolkata', 'IIM Bangalore', 'IIIT Hyderabad'],
      entranceExams: ['GATE', 'JAM', 'JECA', 'University Specific'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Chartered Accountancy',
      shortName: 'CA',
      category: 'Commerce',
      level: 'Professional',
      duration: '4-5 Years',
      description: 'Professional accounting course covering auditing, taxation, financial management, and corporate laws.',
      avgSalary: '₹10 LPA',
      topSalary: '₹35 LPA',
      popularity: 85,
      colleges: 0,
      students: '3 Lakh',
      trending: false,
      difficulty: 'Very High',
      skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis', 'Corporate Law'],
      careerOptions: ['Chartered Accountant', 'Tax Consultant', 'Financial Advisor', 'Company Secretary'],
      topColleges: ['ICAI Centers', 'Various Coaching Institutes'],
      entranceExams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: 'Bachelor of Laws',
      shortName: 'LLB',
      category: 'Law',
      level: 'Undergraduate',
      duration: '3 Years',
      description: 'Legal education covering constitutional law, criminal law, civil law, and legal procedures.',
      avgSalary: '₹6 LPA',
      topSalary: '₹25 LPA',
      popularity: 78,
      colleges: 1500,
      students: '5 Lakh',
      trending: false,
      difficulty: 'Medium',
      skills: ['Legal Research', 'Case Analysis', 'Advocacy', 'Legal Writing', 'Court Procedures'],
      careerOptions: ['Lawyer', 'Judge', 'Legal Advisor', 'Corporate Counsel'],
      topColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'ILS Pune', 'Symbiosis Law School'],
      entranceExams: ['CLAT', 'AILET', 'LSAT India', 'University Specific'],
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesDuration = selectedDuration === 'All' || course.duration.includes(selectedDuration.split(' ')[0]);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesDuration;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity;
      case 'salary':
        return parseFloat(b.avgSalary.replace(/[₹,LPA]/g, '')) - parseFloat(a.avgSalary.replace(/[₹,LPA]/g, ''));
      case 'duration':
        return parseFloat(a.duration) - parseFloat(b.duration);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Very High': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Explore Courses</h1>
              <p className="text-gray-600 mt-1">Discover {courses.length.toLocaleString()}+ courses across various fields</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses, skills, career options..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                    setSelectedDuration('All');
                    setSearchQuery('');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Course Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Courses:</span>
                    <span className="font-semibold">2,500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Career Options:</span>
                    <span className="font-semibold">10,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Salary:</span>
                    <span className="font-semibold">₹8.5 LPA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <p className="text-gray-600">
                  Showing {sortedCourses.length} of {courses.length} courses
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Course Header */}
                  <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                    {course.trending && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4 text-white">
                      <h3 className="font-bold text-lg">{course.shortName}</h3>
                      <p className="text-sm opacity-90">{course.category}</p>
                    </div>
                    <div className="absolute top-3 left-3 bg-white/20 text-white px-2 py-1 rounded text-xs font-semibold">
                      {course.level}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h4 className="font-bold text-xl text-gray-800 mb-2 leading-tight">
                      {course.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          Duration
                        </div>
                        <div className="font-semibold">{course.duration}</div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Avg. Salary
                        </div>
                        <div className="font-semibold text-green-600">{course.avgSalary}</div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg text-center">
                      <div>
                        <div className="font-bold text-gray-800">{course.popularity}%</div>
                        <div className="text-xs text-gray-500">Popular</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{course.colleges > 0 ? course.colleges.toLocaleString() : 'N/A'}</div>
                        <div className="text-xs text-gray-500">Colleges</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{course.students}</div>
                        <div className="text-xs text-gray-500">Students</div>
                      </div>
                    </div>

                    {/* Difficulty & Skills */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty} Level
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 2).map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {course.skills.length > 2 && (
                          <span className="text-xs text-gray-500">+{course.skills.length - 2}</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link 
                        href={`/courses/${course.id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Explore Course
                      </Link>
                      <Link 
                        href={`/colleges?course=${course.id}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <BookOpen className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Categories Section */}
            <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Popular Course Categories</h3>
                <p className="text-purple-100">
                  Explore courses across different fields and find your perfect match
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Engineering', count: '2,500+', icon: '⚙️', color: 'bg-blue-500' },
                  { name: 'Medical', count: '500+', icon: '⚕️', color: 'bg-red-500' },
                  { name: 'Management', count: '1,200+', icon: '💼', color: 'bg-purple-500' },
                  { name: 'Technology', count: '800+', icon: '💻', color: 'bg-green-500' },
                  { name: 'Arts & Science', count: '3,000+', icon: '🎨', color: 'bg-yellow-500' },
                  { name: 'Law', count: '400+', icon: '⚖️', color: 'bg-indigo-500' },
                  { name: 'Commerce', count: '600+', icon: '📊', color: 'bg-pink-500' },
                  { name: 'Design', count: '300+', icon: '🎨', color: 'bg-orange-500' }
                ].map((category, index) => (
                  <Link key={index} href={`/courses?category=${category.name.toLowerCase()}`}>
                    <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="font-semibold">{category.name}</div>
                      <div className="text-sm text-purple-200">{category.count}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Load More Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;