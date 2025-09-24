'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MessageSquare, 
  Users, 
  Clock, 
  TrendingUp, 
  Pin, 
  Star,
  Filter,
  Plus,
  Eye,
  ThumbsUp,
  Tag
} from 'lucide-react';

const ForumsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  // Sample forum data
  const categories = [
    { id: 'all', name: 'All', count: 2547, color: 'bg-gray-500' },
    { id: 'engineering', name: 'Engineering', count: 892, color: 'bg-blue-500' },
    { id: 'medical', name: 'Medical', count: 456, color: 'bg-red-500' },
    { id: 'management', name: 'Management', count: 234, color: 'bg-purple-500' },
    { id: 'exams', name: 'Exam Preparation', count: 634, color: 'bg-green-500' },
    { id: 'admissions', name: 'Admissions', count: 187, color: 'bg-orange-500' },
    { id: 'career', name: 'Career Guidance', count: 144, color: 'bg-indigo-500' }
  ];

  const discussions = [
    {
      id: 1,
      title: 'JEE Main 2024: Best preparation strategy for Physics',
      content: 'Looking for effective ways to prepare for JEE Main Physics. Any seniors who have cleared JEE can share their experience?',
      category: 'exams',
      author: {
        name: 'Rahul Kumar',
        avatar: '👨‍🎓',
        reputation: 245,
        level: 'Advanced'
      },
      replies: 23,
      views: 1245,
      likes: 45,
      pinned: false,
      trending: true,
      tags: ['JEE Main', 'Physics', 'Preparation'],
      createdAt: '2 hours ago',
      lastActivity: '30 minutes ago'
    },
    {
      id: 2,
      title: 'NEET 2024: Is NCERT enough for Biology?',
      content: 'Many people say NCERT is sufficient for NEET Biology. Can someone who cleared NEET confirm this?',
      category: 'medical',
      author: {
        name: 'Priya Sharma',
        avatar: '👩‍🎓',
        reputation: 156,
        level: 'Intermediate'
      },
      replies: 67,
      views: 3456,
      likes: 89,
      pinned: true,
      trending: true,
      tags: ['NEET', 'Biology', 'NCERT'],
      createdAt: '5 hours ago',
      lastActivity: '15 minutes ago'
    },
    {
      id: 3,
      title: 'IIT Delhi vs IIT Bombay: Which is better for CSE?',
      content: 'Got admission in both IIT Delhi and IIT Bombay for Computer Science. Need help choosing between them.',
      category: 'engineering',
      author: {
        name: 'Arjun Singh',
        avatar: '👨‍💻',
        reputation: 89,
        level: 'Beginner'
      },
      replies: 156,
      views: 8934,
      likes: 234,
      pinned: false,
      trending: true,
      tags: ['IIT', 'CSE', 'College Selection'],
      createdAt: '1 day ago',
      lastActivity: '2 hours ago'
    },
    {
      id: 4,
      title: 'CAT 2024: How to improve verbal ability section?',
      content: 'Struggling with verbal ability in CAT preparation. What are the best resources and strategies?',
      category: 'management',
      author: {
        name: 'Sneha Patel',
        avatar: '👩‍💼',
        reputation: 67,
        level: 'Beginner'
      },
      replies: 34,
      views: 1876,
      likes: 28,
      pinned: false,
      trending: false,
      tags: ['CAT', 'Verbal Ability', 'MBA'],
      createdAt: '2 days ago',
      lastActivity: '6 hours ago'
    },
    {
      id: 5,
      title: 'AIIMS Delhi hostel life - A complete guide',
      content: 'For those planning to join AIIMS Delhi, here\'s everything you need to know about hostel facilities, mess, and campus life.',
      category: 'medical',
      author: {
        name: 'Dr. Kavya Reddy',
        avatar: '👩‍⚕️',
        reputation: 456,
        level: 'Expert'
      },
      replies: 45,
      views: 2345,
      likes: 78,
      pinned: true,
      trending: false,
      tags: ['AIIMS', 'Hostel', 'Campus Life'],
      createdAt: '3 days ago',
      lastActivity: '1 day ago'
    },
    {
      id: 6,
      title: 'Scholarship opportunities for engineering students',
      content: 'Comprehensive list of scholarships available for engineering students in India. Please add more in comments.',
      category: 'engineering',
      author: {
        name: 'Vikash Gupta',
        avatar: '👨‍🎓',
        reputation: 123,
        level: 'Intermediate'
      },
      replies: 29,
      views: 1567,
      likes: 56,
      pinned: false,
      trending: false,
      tags: ['Scholarships', 'Engineering', 'Financial Aid'],
      createdAt: '4 days ago',
      lastActivity: '12 hours ago'
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || discussion.category === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.replies - a.replies;
      case 'trending':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-purple-600 bg-purple-100';
      case 'Advanced': return 'text-blue-600 bg-blue-100';
      case 'Intermediate': return 'text-green-600 bg-green-100';
      case 'Beginner': return 'text-gray-600 bg-gray-100';
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
              <h1 className="text-3xl font-bold text-gray-800">Discussion Forums</h1>
              <p className="text-gray-600 mt-1">Connect with students, share experiences, and get answers</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search discussions, topics, questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              New Discussion
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-blue-100 text-blue-600'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Forum Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Discussions</span>
                    <span className="font-semibold">2,547</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Members</span>
                    <span className="font-semibold">15,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Expert Contributors</span>
                    <span className="font-semibold">456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Solved Questions</span>
                    <span className="font-semibold">8,923</span>
                  </div>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Amit Kumar', avatar: '👨‍🏫', points: 2456, badge: 'Expert' },
                    { name: 'Priya Singh', avatar: '👩‍🎓', points: 1234, badge: 'Advanced' },
                    { name: 'Rahul Sharma', avatar: '👨‍💻', points: 987, badge: 'Advanced' }
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-2xl mr-3">{contributor.avatar}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{contributor.name}</div>
                        <div className="text-sm text-blue-600">{contributor.points} points</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(contributor.badge)}`}>
                        {contributor.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  {sortedDiscussions.length} discussions
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Replies</option>
                  <option value="trending">Most Liked</option>
                </select>
              </div>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <div key={discussion.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {discussion.pinned && (
                          <Pin className="h-4 w-4 text-green-600" />
                        )}
                        {discussion.trending && (
                          <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${
                          categories.find(cat => cat.id === discussion.category)?.color || 'bg-gray-500'
                        }`}>
                          {categories.find(cat => cat.id === discussion.category)?.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {discussion.createdAt}
                      </div>
                    </div>

                    {/* Title and Content */}
                    <Link href={`/forums/${discussion.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2">
                        {discussion.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {discussion.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author and Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{discussion.author.avatar}</span>
                        <div>
                          <div className="font-medium text-gray-800">{discussion.author.name}</div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(discussion.author.level)}`}>
                              {discussion.author.level}
                            </span>
                            <span className="text-xs text-gray-500">{discussion.author.reputation} points</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{discussion.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                      Last activity: {discussion.lastActivity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Load More Discussions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;