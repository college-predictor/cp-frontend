'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Users, TrendingUp, SortAsc, Grid, List, Loader2 } from 'lucide-react';
import { collegeService, College, ApiError, FilterOptions } from '@/lib/api';

const CollegesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('ranking');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalColleges, setTotalColleges] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);
  const [states, setStates] = useState<string[]>(['All States']);
  const [categories, setCategories] = useState<string[]>(['All Categories']);

  // Fetch states and categories on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await collegeService.getFilterOptions();
        if (filters.success) {
          if (filters.data?.states && filters.data.states.length > 0) {
            setStates(['All States', ...filters.data.states]);
          }
          if (filters.data?.categories && filters.data.categories.length > 0) {
            setCategories(['All Categories', ...filters.data.categories]);
          }
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
        // Keep default values on error
      }
    };

    fetchFilters();
  }, []);

  // Reset to page 1 when filters change (separate effect)
  useEffect(() => {
    setPage(1);
    setColleges([]);
    setTotalColleges(0);
  }, [searchQuery, selectedState, selectedType, selectedCategory, sortBy, limit]);

  // Fetch colleges when page or filters change
  useEffect(() => {
    const fetchColleges = async () => {
      const isFirstPage = page === 1;
      try {
        if (isFirstPage) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        const filters = {
          search: searchQuery,
          state: selectedState,
          type: selectedType,
          category: selectedCategory,
          sortBy: sortBy as 'ranking' | 'rating' | 'fees' | 'placement',
          page: page,
          limit: limit,
        };

        const response = await collegeService.getColleges(filters);
        
        if (response.success) {
          const list = response.data.colleges;
          const total = response.data.total;

          // Replace on first page, append on subsequent pages
          setColleges(prev => (isFirstPage ? list : [...prev, ...list]));
          setTotalColleges(total);
        } else {
          setError(response.message || 'Failed to fetch colleges');
          if (!isFirstPage) setPage(p => Math.max(1, p - 1));
        }
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
        if (!isFirstPage) setPage(p => Math.max(1, p - 1));
        console.error('Error fetching colleges:', err);
      } finally {
        if (isFirstPage) setLoading(false);
        else setLoadingMore(false);
      }
    };

    fetchColleges();
  }, [page, searchQuery, selectedState, selectedType, selectedCategory, sortBy, limit]);

  // const states = ['All States', 'Delhi', 'Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'West Bengal', 'Uttar Pradesh'];
  // const categories = ['All Categories', 'Engineering', 'Medical', 'Management', 'Arts & Science', 'Science & Research', 'Law'];
  const types = ['All Types', 'Public', 'Private'];
  const sortOptions = [
    { value: 'ranking', label: 'Ranking' },
    { value: 'rating', label: 'Rating' },
    { value: 'fees', label: 'Fees (Low to High)' },
    { value: 'placement', label: 'Placement Package' }
  ];

  // Since filtering and sorting is done by the API, we just use the colleges as is
  const sortedColleges = colleges;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
              <h1 className="text-3xl font-bold text-gray-800">Find Your Dream College</h1>
              <p className="text-gray-600 mt-1">Explore {totalColleges.toLocaleString()}+ colleges across India</p>
            </div>            {/* Search Bar */}
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
                  {loading ? 'Loading...' : `Showing ${sortedColleges.length} of ${totalColleges} colleges`}
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

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-800 font-semibold mb-2">Error loading colleges</p>
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && sortedColleges.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">No colleges found</p>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSelectedState('');
                    setSelectedType('');
                    setSelectedCategory('');
                    setSearchQuery('');
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Colleges Grid/List */}
            {!loading && !error && sortedColleges.length > 0 && (
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
            )}

            {/* Load More */}
            {!loading && !error && sortedColleges.length < totalColleges && (
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">
                  Showing {sortedColleges.length} of {totalColleges} colleges
                </p>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={loadingMore}
                  className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors ${loadingMore ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                      Loading...
                    </>
                  ) : (
                    'Load More Colleges'
                  )}
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