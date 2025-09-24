import Link from 'next/link';
import { MapPin, Star, Users, TrendingUp } from 'lucide-react';

const TopColleges = () => {
  // Sample college data - in a real app, this would come from an API
  const colleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      location: 'New Delhi',
      rating: 4.8,
      reviews: 2453,
      type: 'Engineering',
      featured: true,
      fees: '₹2.5 Lakhs',
      placement: '₹25 LPA',
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      name: 'All India Institute of Medical Sciences',
      shortName: 'AIIMS Delhi',
      location: 'New Delhi',
      rating: 4.9,
      reviews: 1876,
      type: 'Medical',
      featured: true,
      fees: '₹1.5 Lakhs',
      placement: '₹30 LPA',
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      name: 'Indian Institute of Management Ahmedabad',
      shortName: 'IIM Ahmedabad',
      location: 'Ahmedabad',
      rating: 4.7,
      reviews: 1234,
      type: 'Management',
      featured: true,
      fees: '₹25 Lakhs',
      placement: '₹35 LPA',
      image: '/api/placeholder/400/300'
    },
    {
      id: 4,
      name: 'Indian Institute of Science',
      shortName: 'IISc Bangalore',
      location: 'Bangalore',
      rating: 4.8,
      reviews: 987,
      type: 'Science & Research',
      featured: true,
      fees: '₹2 Lakhs',
      placement: '₹28 LPA',
      image: '/api/placeholder/400/300'
    },
    {
      id: 5,
      name: 'Delhi University',
      shortName: 'DU',
      location: 'New Delhi',
      rating: 4.5,
      reviews: 5432,
      type: 'Arts & Science',
      featured: false,
      fees: '₹50,000',
      placement: '₹8 LPA',
      image: '/api/placeholder/400/300'
    },
    {
      id: 6,
      name: 'Indian Institute of Technology Bombay',
      shortName: 'IIT Bombay',
      location: 'Mumbai',
      rating: 4.8,
      reviews: 2156,
      type: 'Engineering',
      featured: true,
      fees: '₹2.5 Lakhs',
      placement: '₹27 LPA',
      image: '/api/placeholder/400/300'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Top Colleges in India
            </h2>
            <p className="text-lg text-gray-600">
              Discover the best educational institutions across the country
            </p>
          </div>
          <Link href="/colleges" className="hidden md:block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Colleges
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <div key={college.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* College Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                {college.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{college.shortName}</h3>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {college.location}
                  </div>
                </div>
              </div>

              {/* College Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                    {college.name}
                  </h3>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                    {college.type}
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

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/colleges" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Colleges
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopColleges;