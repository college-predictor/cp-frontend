'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Filter,
  MapPin,
  Calendar,
  User,
  CheckCircle,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

const ReviewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 'Engineering', 'Medical', 'Management', 'Arts & Science', 'Law', 'Pharmacy'
  ];

  const ratings = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'rating', label: 'Highest Rating' }
  ];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      collegeName: 'Indian Institute of Technology Delhi',
      collegeShortName: 'IIT Delhi',
      category: 'Engineering',
      location: 'New Delhi',
      rating: 4.8,
      overallRating: 4.6,
      reviewTitle: 'Excellent Infrastructure and Faculty',
      reviewText: 'IIT Delhi has been an amazing experience. The faculty is world-class, infrastructure is top-notch, and the research opportunities are abundant. The campus life is vibrant with various clubs and societies. Placement support is excellent with top companies visiting.',
      author: {
        name: 'Rahul Kumar',
        course: 'Computer Science Engineering',
        batch: '2020-2024',
        verified: true,
        avatar: '👨‍🎓'
      },
      ratings: {
        infrastructure: 5,
        faculty: 5,
        placements: 5,
        campus: 4,
        hostel: 4,
        food: 3
      },
      helpful: 45,
      notHelpful: 3,
      date: '2024-01-15',
      pros: ['World-class faculty', 'Excellent placements', 'Research opportunities', 'Brand value'],
      cons: ['High pressure environment', 'Limited campus area', 'Expensive mess food'],
      verified: true
    },
    {
      id: 2,
      collegeName: 'All India Institute of Medical Sciences',
      collegeShortName: 'AIIMS Delhi',
      category: 'Medical',
      location: 'New Delhi',
      rating: 4.9,
      overallRating: 4.7,
      reviewTitle: 'Best Medical College in India',
      reviewText: 'AIIMS Delhi is undoubtedly the best medical college in India. The clinical exposure is unmatched, faculty is highly experienced, and the hospital facilities are world-class. The academic rigor is intense but prepares you well for medical practice.',
      author: {
        name: 'Dr. Priya Sharma',
        course: 'MBBS',
        batch: '2018-2023',
        verified: true,
        avatar: '👩‍⚕️'
      },
      ratings: {
        infrastructure: 5,
        faculty: 5,
        placements: 5,
        campus: 4,
        hostel: 3,
        food: 3
      },
      helpful: 67,
      notHelpful: 2,
      date: '2024-01-10',
      pros: ['Best clinical exposure', 'Renowned faculty', 'Free education', 'Brand recognition'],
      cons: ['Extremely competitive', 'Old hostel facilities', 'Limited recreational activities'],
      verified: true
    },
    {
      id: 3,
      collegeName: 'Indian Institute of Management Ahmedabad',
      collegeShortName: 'IIM Ahmedabad',
      category: 'Management',
      location: 'Ahmedabad',
      rating: 4.7,
      overallRating: 4.5,
      reviewTitle: 'Transformative MBA Experience',
      reviewText: 'IIM Ahmedabad offers a truly transformative MBA experience. The case study method of teaching is challenging but effective. The peer group is exceptional, and the alumni network is invaluable. Placements are outstanding with top consulting and finance roles.',
      author: {
        name: 'Sneha Patel',
        course: 'MBA',
        batch: '2022-2024',
        verified: true,
        avatar: '👩‍💼'
      },
      ratings: {
        infrastructure: 4,
        faculty: 5,
        placements: 5,
        campus: 4,
        hostel: 4,
        food: 4
      },
      helpful: 38,
      notHelpful: 1,
      date: '2024-01-08',
      pros: ['Excellent faculty', 'Strong alumni network', 'Top placements', 'Case study method'],
      cons: ['Very expensive', 'High academic pressure', 'Limited diversity in courses'],
      verified: true
    },
    {
      id: 4,
      collegeName: 'Indian Institute of Technology Bombay',
      collegeShortName: 'IIT Bombay',
      category: 'Engineering',
      location: 'Mumbai',
      rating: 4.7,
      overallRating: 4.6,
      reviewTitle: 'Great Campus and Opportunities',
      reviewText: 'IIT Bombay has a beautiful campus and excellent facilities. The technical clubs and societies provide great learning opportunities. The startup ecosystem is thriving, and many students launch their own ventures. Faculty is supportive and research-oriented.',
      author: {
        name: 'Arjun Singh',
        course: 'Electrical Engineering',
        batch: '2019-2023',
        verified: true,
        avatar: '👨‍💻'
      },
      ratings: {
        infrastructure: 5,
        faculty: 4,
        placements: 5,
        campus: 5,
        hostel: 4,
        food: 4
      },
      helpful: 29,
      notHelpful: 4,
      date: '2024-01-05',
      pros: ['Beautiful campus', 'Strong startup culture', 'Good hostel facilities', 'Active club life'],
      cons: ['Mumbai is expensive', 'High competition', 'Weather can be challenging'],
      verified: true
    },
    {
      id: 5,
      collegeName: 'Delhi University',
      collegeShortName: 'DU',
      category: 'Arts & Science',
      location: 'New Delhi',
      rating: 4.2,
      overallRating: 4.1,
      reviewTitle: 'Diverse Academic Environment',
      reviewText: 'DU offers a diverse academic environment with excellent faculty in liberal arts. The college festivals are amazing, and the cultural activities are top-notch. However, the infrastructure varies significantly across colleges.',
      author: {
        name: 'Kavya Reddy',
        course: 'English Literature',
        batch: '2020-2023',
        verified: true,
        avatar: '👩‍🎓'
      },
      ratings: {
        infrastructure: 3,
        faculty: 4,
        placements: 3,
        campus: 4,
        hostel: 3,
        food: 4
      },
      helpful: 22,
      notHelpful: 7,
      date: '2024-01-02',
      pros: ['Diverse courses', 'Active cultural scene', 'Affordable fees', 'Central location'],
      cons: ['Inconsistent infrastructure', 'Limited placement support', 'Overcrowded'],
      verified: true
    },
    {
      id: 6,
      collegeName: 'National Law School of India University',
      collegeShortName: 'NLSIU Bangalore',
      category: 'Law',
      location: 'Bangalore',
      rating: 4.6,
      overallRating: 4.4,
      reviewTitle: 'Premier Law School Experience',
      reviewText: 'NLSIU provides an excellent legal education with distinguished faculty and rigorous academic programs. The moot court competitions and legal aid programs provide practical exposure. The library is well-stocked and the campus atmosphere is intellectually stimulating.',
      author: {
        name: 'Vikash Gupta',
        course: 'BA LLB',
        batch: '2018-2023',
        verified: true,
        avatar: '👨‍⚖️'
      },
      ratings: {
        infrastructure: 4,
        faculty: 5,
        placements: 4,
        campus: 4,
        hostel: 4,
        food: 3
      },
      helpful: 18,
      notHelpful: 2,
      date: '2023-12-28',
      pros: ['Excellent faculty', 'Strong legal network', 'Good placement record', 'Intellectual environment'],
      cons: ['Limited recreational facilities', 'Intense academic pressure', 'Small batch size'],
      verified: true
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.collegeShortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || review.category === selectedCategory;
    const matchesRating = selectedRating === 'All' || 
                         (selectedRating === '5 Stars' && review.rating >= 4.5) ||
                         (selectedRating === '4 Stars' && review.rating >= 4 && review.rating < 4.5) ||
                         (selectedRating === '3 Stars' && review.rating >= 3 && review.rating < 4) ||
                         (selectedRating === '2 Stars' && review.rating >= 2 && review.rating < 3) ||
                         (selectedRating === '1 Star' && review.rating < 2);
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">College Reviews</h1>
              <p className="text-gray-600 mt-1">Read authentic reviews from {reviews.length.toLocaleString()}+ students</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search colleges, courses, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Write Review
            </button>
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

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {ratings.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedRating('All');
                    setSearchQuery('');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Review Stats */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Review Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Reviews:</span>
                    <span className="font-semibold">50,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Reviews:</span>
                    <span className="font-semibold">45,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rating:</span>
                    <span className="font-semibold">4.3/5</span>
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
                  Showing {sortedReviews.length} reviews
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

            {/* Reviews List */}
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    {/* College Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Link href={`/colleges/${review.id}`}>
                          <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                            {review.collegeName}
                          </h3>
                        </Link>
                        <div className="flex items-center mt-1 text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{review.location}</span>
                          <span className="mx-2">•</span>
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                            {review.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          {renderStars(review.rating)}
                          <span className="ml-2 font-bold text-lg">{review.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Overall: {review.overallRating}/5
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{review.reviewTitle}</h4>
                      <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                    </div>

                    {/* Detailed Ratings */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                      {Object.entries(review.ratings).map(([category, rating]) => (
                        <div key={category} className="text-center">
                          <div className="text-sm text-gray-500 capitalize mb-1">{category}</div>
                          <div className="flex justify-center mb-1">
                            {renderStars(rating)}
                          </div>
                          <div className="text-sm font-semibold">{rating}/5</div>
                        </div>
                      ))}
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h5 className="font-semibold text-green-600 mb-2 flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Pros
                        </h5>
                        <ul className="space-y-1">
                          {review.pros.map((pro, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center">
                              <span className="w-1 h-1 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-600 mb-2 flex items-center">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Cons
                        </h5>
                        <ul className="space-y-1">
                          {review.cons.map((con, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center">
                              <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{review.author.avatar}</span>
                        <div>
                          <div className="flex items-center">
                            <span className="font-semibold text-gray-800">{review.author.name}</span>
                            {review.author.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.author.course} • {review.author.batch}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{getTimeAgo(review.date)}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{review.helpful}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{review.notHelpful}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;