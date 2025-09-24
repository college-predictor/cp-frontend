'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  Filter,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Target
} from 'lucide-react';

const ExamsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Sample exam data
  const examCategories = [
    { id: 'all', name: 'All', count: 200 },
    { id: 'engineering', name: 'Engineering', count: 45 },
    { id: 'medical', name: 'Medical', count: 25 },
    { id: 'management', name: 'Management', count: 30 },
    { id: 'banking', name: 'Banking & Finance', count: 20 },
    { id: 'ssc', name: 'SSC', count: 15 },
    { id: 'railway', name: 'Railway', count: 12 },
    { id: 'defense', name: 'Defense', count: 18 },
    { id: 'law', name: 'Law', count: 8 },
    { id: 'teaching', name: 'Teaching', count: 10 }
  ];

  const levels = ['All', 'Undergraduate', 'Postgraduate', 'Certification', 'Professional'];

  const exams = [
    {
      id: 1,
      name: 'Joint Entrance Examination Main',
      shortName: 'JEE Main',
      category: 'engineering',
      level: 'Undergraduate',
      conductedBy: 'National Testing Agency (NTA)',
      examDate: '2024-01-24',
      applicationStart: '2023-12-01',
      applicationEnd: '2024-01-15',
      resultDate: '2024-02-15',
      participants: '12 Lakh',
      difficulty: 'High',
      duration: '3 hours',
      mode: 'Computer Based Test',
      frequency: 'Twice a year',
      eligibility: '10+2 with Physics, Chemistry, Mathematics',
      icon: '🔧',
      color: 'bg-blue-500',
      trending: true,
      registrationOpen: true,
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      totalMarks: 300,
      negativeMarking: true,
      officialWebsite: 'https://jeemain.nta.nic.in'
    },
    {
      id: 2,
      name: 'National Eligibility cum Entrance Test',
      shortName: 'NEET',
      category: 'medical',
      level: 'Undergraduate',
      conductedBy: 'National Testing Agency (NTA)',
      examDate: '2024-05-05',
      applicationStart: '2024-02-01',
      applicationEnd: '2024-04-15',
      resultDate: '2024-06-15',
      participants: '18 Lakh',
      difficulty: 'High',
      duration: '3 hours 20 minutes',
      mode: 'Pen and Paper',
      frequency: 'Once a year',
      eligibility: '10+2 with Physics, Chemistry, Biology',
      icon: '⚕️',
      color: 'bg-red-500',
      trending: true,
      registrationOpen: false,
      subjects: ['Physics', 'Chemistry', 'Biology'],
      totalMarks: 720,
      negativeMarking: true,
      officialWebsite: 'https://neet.nta.nic.in'
    },
    {
      id: 3,
      name: 'Common Admission Test',
      shortName: 'CAT',
      category: 'management',
      level: 'Postgraduate',
      conductedBy: 'Indian Institutes of Management',
      examDate: '2024-11-26',
      applicationStart: '2024-07-01',
      applicationEnd: '2024-09-20',
      resultDate: '2024-12-20',
      participants: '3.5 Lakh',
      difficulty: 'High',
      duration: '2 hours',
      mode: 'Computer Based Test',
      frequency: 'Once a year',
      eligibility: 'Bachelor\'s degree with 50% marks',
      icon: '💼',
      color: 'bg-purple-500',
      trending: true,
      registrationOpen: false,
      subjects: ['Verbal Ability', 'Data Interpretation', 'Quantitative Ability'],
      totalMarks: 198,
      negativeMarking: true,
      officialWebsite: 'https://iimcat.ac.in'
    },
    {
      id: 4,
      name: 'Graduate Aptitude Test in Engineering',
      shortName: 'GATE',
      category: 'engineering',
      level: 'Postgraduate',
      conductedBy: 'Indian Institute of Science',
      examDate: '2024-02-03',
      applicationStart: '2023-08-01',
      applicationEnd: '2024-01-10',
      resultDate: '2024-03-15',
      participants: '8.5 Lakh',
      difficulty: 'High',
      duration: '3 hours',
      mode: 'Computer Based Test',
      frequency: 'Once a year',
      eligibility: 'Bachelor\'s degree in Engineering/Technology',
      icon: '⚙️',
      color: 'bg-green-500',
      trending: false,
      registrationOpen: true,
      subjects: ['General Aptitude', 'Subject Specific'],
      totalMarks: 100,
      negativeMarking: true,
      officialWebsite: 'https://gate.iisc.ac.in'
    },
    {
      id: 5,
      name: 'Common Law Admission Test',
      shortName: 'CLAT',
      category: 'law',
      level: 'Undergraduate',
      conductedBy: 'Consortium of National Law Universities',
      examDate: '2024-12-01',
      applicationStart: '2024-01-01',
      applicationEnd: '2024-10-15',
      resultDate: '2024-12-20',
      participants: '75,000',
      difficulty: 'Medium',
      duration: '2 hours',
      mode: 'Computer Based Test',
      frequency: 'Once a year',
      eligibility: '10+2 with 45% marks',
      icon: '⚖️',
      color: 'bg-indigo-500',
      trending: false,
      registrationOpen: true,
      subjects: ['English', 'General Knowledge', 'Legal Reasoning', 'Logical Reasoning', 'Mathematics'],
      totalMarks: 150,
      negativeMarking: true,
      officialWebsite: 'https://consortiumofnlus.ac.in'
    },
    {
      id: 6,
      name: 'National Defence Academy',
      shortName: 'NDA',
      category: 'defense',
      level: 'Undergraduate',
      conductedBy: 'Union Public Service Commission',
      examDate: '2024-04-21',
      applicationStart: '2024-01-01',
      applicationEnd: '2024-03-15',
      resultDate: '2024-06-01',
      participants: '5 Lakh',
      difficulty: 'Medium',
      duration: '2.5 hours',
      mode: 'Pen and Paper',
      frequency: 'Twice a year',
      eligibility: '10+2 for Army & Air Force, 10+2 with Physics & Mathematics for Navy',
      icon: '🛡️',
      color: 'bg-orange-500',
      trending: false,
      registrationOpen: false,
      subjects: ['Mathematics', 'General Ability Test'],
      totalMarks: 900,
      negativeMarking: true,
      officialWebsite: 'https://www.upsc.gov.in'
    }
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory.toLowerCase();
    const matchesLevel = selectedLevel === 'All' || exam.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getDaysUntilExam = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRegistrationStatus = (exam: any) => {
    const today = new Date();
    const appStart = new Date(exam.applicationStart);
    const appEnd = new Date(exam.applicationEnd);
    
    if (today < appStart) return { status: 'upcoming', label: 'Registration Soon', color: 'text-blue-600 bg-blue-100' };
    if (today >= appStart && today <= appEnd) return { status: 'open', label: 'Registration Open', color: 'text-green-600 bg-green-100' };
    return { status: 'closed', label: 'Registration Closed', color: 'text-red-600 bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Competitive Exams</h1>
              <p className="text-gray-600 mt-1">Complete information about {exams.length}+ exams across India</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search exams, categories, conducting bodies..."
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                  <div className="space-y-2">
                    {examCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-blue-100 text-blue-600'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">{category.count}</span>
                      </button>
                    ))}
                  </div>
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

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                    setSearchQuery('');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
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
                  Showing {filteredExams.length} of {exams.length} exams
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-gray-600">Total Exams</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Registration Open</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-orange-600">15+</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600">100+</div>
                <div className="text-sm text-gray-600">Study Resources</div>
              </div>
            </div>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExams.map((exam) => {
                const daysUntil = getDaysUntilExam(exam.examDate);
                const registrationStatus = getRegistrationStatus(exam);
                
                return (
                  <div key={exam.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Header */}
                    <div className={`${exam.color} p-4 text-white relative`}>
                      {exam.trending && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </div>
                      )}
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{exam.icon}</span>
                        <div>
                          <h3 className="font-bold text-xl">{exam.shortName}</h3>
                          <p className="text-sm opacity-90">{exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3 leading-tight">
                        {exam.name}
                      </h4>

                      {/* Key Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Exam Date:
                          </span>
                          <span className="font-semibold">
                            {new Date(exam.examDate).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Duration:
                          </span>
                          <span className="font-semibold">{exam.duration}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            Applicants:
                          </span>
                          <span className="font-semibold">{exam.participants}</span>
                        </div>
                      </div>

                      {/* Registration Status */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${registrationStatus.color}`}>
                          {registrationStatus.status === 'open' && <CheckCircle className="h-3 w-3 inline mr-1" />}
                          {registrationStatus.status === 'closed' && <AlertCircle className="h-3 w-3 inline mr-1" />}
                          {registrationStatus.label}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                          {exam.difficulty} Level
                        </span>
                      </div>

                      {/* Subjects */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Subjects:</p>
                        <div className="flex flex-wrap gap-1">
                          {exam.subjects.slice(0, 3).map((subject, index) => (
                            <span key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                              {subject}
                            </span>
                          ))}
                          {exam.subjects.length > 3 && (
                            <span className="text-xs text-gray-500">+{exam.subjects.length - 3} more</span>
                          )}
                        </div>
                      </div>

                      {/* Countdown */}
                      {daysUntil > 0 && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-4 text-center">
                          <div className="text-blue-600 font-bold text-lg">
                            {daysUntil} days left
                          </div>
                          <div className="text-blue-500 text-sm">until exam date</div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link 
                          href={`/exams/${exam.id}`}
                          className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                        <Link 
                          href={`/exams/${exam.id}/syllabus`}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <FileText className="h-4 w-4" />
                        </Link>
                        <Link 
                          href={`/exams/${exam.id}/preparation`}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <Target className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Load More Exams
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;