'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Users, TrendingUp, SortAsc, Grid, List } from 'lucide-react';

const CollegesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('ranking');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Sample colleges data
  const colleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      location: 'New Delhi',
      state: 'Delhi',
      rating: 4.8,
      reviews: 2453,
      type: 'Public',
      category: 'Engineering',
      established: 1961,
      fees: '₹2.5 Lakhs',
      placement: '₹25 LPA',
      ranking: 2,
      featured: true,
      courses: 42,
      students: 8000,
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      name: 'All India Institute of Medical Sciences',
      shortName: 'AIIMS Delhi',
      location: 'New Delhi',
      state: 'Delhi',
      rating: 4.9,
      reviews: 1876,
      type: 'Public',
      category: 'Medical',
      established: 1956,
      fees: '₹1.5 Lakhs',
      placement: '₹30 LPA',
      ranking: 1,
      featured: true,
      courses: 28,
      students: 3000,
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      name: 'Indian Institute of Management Ahmedabad',
      shortName: 'IIM Ahmedabad',
      location: 'Ahmedabad',
      state: 'Gujarat',
      rating: 4.7,
      reviews: 1234,
      type: 'Public',
      category: 'Management',
      established: 1961,
      fees: '₹25 Lakhs',
      placement: '₹35 LPA',
      ranking: 1,
      featured: true,
      courses: 15,
      students: 1200,
      image: '/api/placeholder/400/300'
    },
    {
      id: 4,
      name: 'Indian Institute of Science',
      shortName: 'IISc Bangalore',
      location: 'Bangalore',
      state: 'Karnataka',
      rating: 4.8,
      reviews: 987,
      type: 'Public',
      category: 'Science & Research',
      established: 1909,
      fees: '₹2 Lakhs',
      placement: '₹28 LPA',
      ranking: 1,
      featured: true,
      courses: 35,
      students: 4500,
      image: '/api/placeholder/400/300'
    },
    {
      id: 5,
      name: 'Delhi University',
      shortName: 'DU',
      location: 'New Delhi',
      state: 'Delhi',
      rating: 4.5,
      reviews: 5432,
      type: 'Public',
      category: 'Arts & Science',
      established: 1922,
      fees: '₹50,000',
      placement: '₹8 LPA',
      ranking: 12,
      featured: false,
      courses: 180,
      students: 400000,
      image: '/api/placeholder/400/300'
    },
    {
      id: 6,
      name: 'Indian Institute of Technology Bombay',
      shortName: 'IIT Bombay',
      location: 'Mumbai',
      state: 'Maharashtra',
      rating: 4.8,
      reviews: 2156,
      type: 'Public',
      category: 'Engineering',
      established: 1958,
      fees: '₹2.5 Lakhs',
      placement: '₹27 LPA',
      ranking: 3,
      featured: true,
      courses: 45,
      students: 9000,
      image: '/api/placeholder/400/300'
    }
  ];

  const states = ['All States', 'Delhi', 'Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'West Bengal', 'Uttar Pradesh'];
  const types = ['All Types', 'Public', 'Private', 'Deemed'];
  const categories = ['All Categories', 'Engineering', 'Medical', 'Management', 'Arts & Science', 'Science & Research', 'Law'];
  const sortOptions = [
    { value: 'ranking', label: 'Ranking' },
    { value: 'rating', label: 'Rating' },
    { value: 'fees', label: 'Fees (Low to High)' },
    { value: 'placement', label: 'Placement Package' }
  ];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = !selectedState || selectedState === 'All States' || college.state === selectedState;
    const matchesType = !selectedType || selectedType === 'All Types' || college.type === selectedType;
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || college.category === selectedCategory;
    
    return matchesSearch && matchesState && matchesType && matchesCategory;
  });

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    switch (sortBy) {
      case 'ranking':
        return a.ranking - b.ranking;
      case 'rating':
        return b.rating - a.rating;
      case 'fees':
        return parseFloat(a.fees.replace(/[₹,Lakhs]/g, '')) - parseFloat(b.fees.replace(/[₹,Lakhs]/g, ''));
      case 'placement':
        return parseFloat(b.placement.replace(/[₹,LPA]/g, '')) - parseFloat(a.placement.replace(/[₹,LPA]/g, ''));
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Find Your Dream College</h1>
              <p className="text-gray-600 mt-1">Explore {colleges.length.toLocaleString()}+ colleges across India</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search colleges, locations, courses..."
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
                {/* State Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

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

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedState('');
                    setSelectedType('');
                    setSelectedCategory('');
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
                  Showing {sortedColleges.length} of {colleges.length} colleges
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Colleges Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
              {sortedColleges.map((college) => (
                <div key={college.id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
                  {/* College Image/Header */}
                  <div className={`${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'} relative bg-gradient-to-r from-blue-500 to-purple-600`}>
                    {college.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      #{college.ranking}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{college.shortName}</h3>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {college.location}
                      </div>
                    </div>
                  </div>

                  {/* College Details */}
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                        {college.name}
                      </h3>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                        {college.category}
                      </span>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-semibold text-green-800">{college.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm ml-2">
                        <Users className="h-4 w-4 inline mr-1" />
                        {college.reviews.toLocaleString()} reviews
                      </span>
                      <span className="text-gray-500 text-sm ml-auto">
                        Est. {college.established}
                      </span>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-500 text-xs">Annual Fees</p>
                        <p className="font-semibold text-gray-800">{college.fees}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Avg. Package
                        </p>
                        <p className="font-semibold text-green-600">{college.placement}</p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{college.courses} Courses</span>
                      <span>{college.students.toLocaleString()} Students</span>
                      <span className="capitalize">{college.type}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link 
                        href={`/colleges/${college.id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {sortedColleges.length === colleges.length && (
              <div className="text-center mt-12">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Load More Colleges
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegesPage;