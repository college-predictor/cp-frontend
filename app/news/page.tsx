'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ExternalLink, 
  Users, 
  Filter,
  Eye,
  Share,
  Bookmark,
  Tag
} from 'lucide-react';

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 'Exam Updates', 'Admissions', 'College News', 'Policy Changes', 
    'Scholarships', 'Career Guidance', 'Research', 'Technology', 'International'
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' }
  ];

  // Sample news data
  const news = [
    {
      id: 1,
      title: 'JEE Main 2024 Registration Extended: New Deadline Announced',
      summary: 'National Testing Agency (NTA) has extended the registration deadline for JEE Main 2024 by two weeks due to technical issues faced by candidates during the application process.',
      content: 'The National Testing Agency (NTA) has announced an extension of the JEE Main 2024 registration deadline following widespread reports of technical difficulties...',
      category: 'Exam Updates',
      author: 'Education Desk',
      publishedAt: '2024-01-25T10:30:00Z',
      readTime: '3 min',
      views: 15420,
      trending: true,
      featured: true,
      tags: ['JEE Main', 'NTA', 'Registration', 'Engineering'],
      image: '/api/placeholder/600/300',
      source: 'College Predictor News'
    },
    {
      id: 2,
      title: 'New IIT Campus Approved for Telangana: Focus on AI and Robotics',
      summary: 'Ministry of Education approves establishment of new IIT campus in Telangana with specialization in Artificial Intelligence, Robotics, and Advanced Manufacturing.',
      content: 'In a significant development for technical education in South India, the Ministry of Education has given its approval for a new Indian Institute of Technology campus...',
      category: 'College News',
      author: 'Tech Reporter',
      publishedAt: '2024-01-24T14:15:00Z',
      readTime: '4 min',
      views: 8750,
      trending: true,
      featured: true,
      tags: ['IIT', 'Telangana', 'AI', 'Robotics', 'New Campus'],
      image: '/api/placeholder/600/300',
      source: 'Higher Education News'
    },
    {
      id: 3,
      title: 'NEET PG 2024: Counselling Process to Begin from February 15',
      summary: 'Medical Counselling Committee announces the schedule for NEET PG 2024 counselling process. Online registration for qualified candidates starts next month.',
      content: 'The Medical Counselling Committee (MCC) has released the official schedule for NEET PG 2024 counselling process...',
      category: 'Admissions',
      author: 'Medical Education Correspondent',
      publishedAt: '2024-01-23T16:45:00Z',
      readTime: '2 min',
      views: 12300,
      trending: true,
      featured: false,
      tags: ['NEET PG', 'MCC', 'Counselling', 'Medical'],
      image: '/api/placeholder/600/300',
      source: 'Medical News India'
    },
    {
      id: 4,
      title: 'Government Launches New Scholarship Scheme for Economically Weak Students',
      summary: 'Central government introduces comprehensive scholarship program covering tuition fees, accommodation, and living expenses for students from economically disadvantaged backgrounds.',
      content: 'The Government of India has launched a new comprehensive scholarship scheme aimed at supporting students from economically weaker sections...',
      category: 'Scholarships',
      author: 'Policy Reporter',
      publishedAt: '2024-01-22T11:20:00Z',
      readTime: '5 min',
      views: 9540,
      trending: false,
      featured: false,
      tags: ['Scholarship', 'Government', 'Financial Aid', 'Education Policy'],
      image: '/api/placeholder/600/300',
      source: 'Education Policy News'
    },
    {
      id: 5,
      title: 'CAT 2024: New Question Pattern Introduces Logical Reasoning Changes',
      summary: 'Indian Institutes of Management announce modifications in CAT exam pattern including new types of logical reasoning questions and revised sectional time limits.',
      content: 'The Indian Institutes of Management (IIMs) have announced significant changes to the Common Admission Test (CAT) pattern for 2024...',
      category: 'Exam Updates',
      author: 'MBA Desk',
      publishedAt: '2024-01-21T09:10:00Z',
      readTime: '4 min',
      views: 11200,
      trending: false,
      featured: false,
      tags: ['CAT', 'IIM', 'MBA', 'Exam Pattern'],
      image: '/api/placeholder/600/300',
      source: 'Business Education Today'
    },
    {
      id: 6,
      title: 'International Students Rush to Indian Universities: 40% Increase in Applications',
      summary: 'Foreign student enrollment in Indian higher education institutions sees unprecedented growth, with maximum interest in engineering and medical programs.',
      content: 'Indian universities are witnessing a remarkable surge in international student applications, with a 40% increase compared to the previous year...',
      category: 'International',
      author: 'Global Education Writer',
      publishedAt: '2024-01-20T13:30:00Z',
      readTime: '6 min',
      views: 7890,
      trending: false,
      featured: false,
      tags: ['International Students', 'Global Education', 'University', 'Enrollment'],
      image: '/api/placeholder/600/300',
      source: 'Global Campus News'
    }
  ];

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'popular':
        return b.views - a.views;
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Exam Updates': 'bg-blue-500',
      'College News': 'bg-green-500',
      'Admissions': 'bg-purple-500',
      'Policy Changes': 'bg-red-500',
      'Scholarships': 'bg-yellow-500',
      'Career Guidance': 'bg-indigo-500',
      'Research': 'bg-pink-500',
      'Technology': 'bg-gray-500',
      'International': 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const featuredNews = sortedNews.filter(article => article.featured);
  const regularNews = sortedNews.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Education News</h1>
              <p className="text-gray-600 mt-1">Stay updated with the latest in Indian education</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news, topics, institutions..."
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
          {/* Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
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
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {['JEE Main 2024', 'NEET Updates', 'New IIT Campus', 'Scholarship Schemes', 'CAT Changes'].map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(topic)}
                      className="block w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Daily Newsletter</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest education news delivered to your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 rounded text-gray-800 focus:outline-none"
                  />
                  <button className="w-full bg-yellow-400 text-gray-800 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors">
                    Subscribe
                  </button>
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
                  {sortedNews.length} articles found
                </p>
              </div>

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

            {/* Breaking News Alert */}
            {sortedNews.some(article => article.trending) && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-bold text-red-800">Breaking News</span>
                </div>
                <p className="text-red-700 mt-1">
                  {sortedNews.find(article => article.trending)?.title}
                </p>
              </div>
            )}

            {/* Featured News */}
            {featuredNews.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredNews.slice(0, 2).map((article) => (
                    <div key={article.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                        {article.trending && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Breaking
                          </div>
                        )}
                        <div className={`absolute top-4 right-4 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                          {article.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <Link href={`/news/${article.id}`}>
                          <h3 className="font-bold text-xl text-gray-800 mb-3 leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {article.summary}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {getTimeAgo(article.publishedAt)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime} read
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {article.views.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <Link 
                            href={`/news/${article.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                          >
                            Read Full Article
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </Link>
                          <div className="flex items-center space-x-3">
                            <button className="text-gray-500 hover:text-blue-600 transition-colors">
                              <Share className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-yellow-600 transition-colors">
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular News */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Updates</h2>
              <div className="space-y-6">
                {regularNews.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6">
                    <div className="flex items-start space-x-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg relative">
                        <div className={`absolute -top-2 -right-2 ${getCategoryColor(article.category)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                          {article.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {article.trending && (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                              Trending
                            </span>
                          )}
                          <span className="text-gray-500 text-sm">{article.source}</span>
                        </div>

                        <Link href={`/news/${article.id}`}>
                          <h3 className="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {article.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.summary}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {getTimeAgo(article.publishedAt)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {article.views.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                              <Share className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;