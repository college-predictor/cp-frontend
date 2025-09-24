'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Users, BookOpen, Award } from 'lucide-react';

const HeroSection = () => {
  const [searchType, setSearchType] = useState('colleges');
  const [searchQuery, setSearchQuery] = useState('');

  const searchTypes = [
    { id: 'colleges', label: 'Colleges', icon: BookOpen },
    { id: 'exams', label: 'Exams', icon: Award },
    { id: 'courses', label: 'Courses', icon: TrendingUp },
  ];

  const stats = [
    { label: 'Colleges Listed', value: '10,000+', icon: BookOpen },
    { label: 'Students Helped', value: '5 Lakh+', icon: Users },
    { label: 'Courses Available', value: '2,500+', icon: TrendingUp },
    { label: 'Success Stories', value: '50,000+', icon: Award },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="text-yellow-400"> Educational Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover top colleges, competitive exams, courses and connect with fellow students
            across India
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            {/* Search Type Tabs */}
            <div className="flex flex-wrap justify-center mb-6 border-b border-gray-200">
              {searchTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSearchType(type.id)}
                    className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                      searchType === type.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={`Search ${searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-3">Popular Searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['IIT', 'NIT', 'AIIMS', 'JEE Main', 'NEET', 'Engineering', 'Medical', 'MBA'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${term}`}
                    className="bg-gray-100 hover:bg-blue-100 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <IconComponent className="h-8 w-8" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;