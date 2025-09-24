import Link from 'next/link';
import { Calendar, Clock, TrendingUp, ExternalLink, BookOpen, Users } from 'lucide-react';

const LatestNews = () => {
  // Sample news data - in a real app, this would come from an API
  const news = [
    {
      id: 1,
      title: 'JEE Main 2024 Registration Dates Announced',
      summary: 'NTA releases official notification for JEE Main 2024 examination. Registration begins from December 1, 2023.',
      category: 'Exam Updates',
      date: '2023-11-25',
      readTime: '3 min',
      views: 15420,
      trending: true,
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      title: 'New IIT Campus to Open in Goa by 2025',
      summary: 'Ministry of Education announces establishment of new IIT campus in Goa with focus on marine engineering and ocean technology.',
      category: 'College News',
      date: '2023-11-24',
      readTime: '4 min',
      views: 8750,
      trending: false,
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      title: 'NEET PG 2024: Application Process to Begin Soon',
      summary: 'NBE likely to release NEET PG 2024 notification by December. Check eligibility criteria and important dates.',
      category: 'Medical',
      date: '2023-11-23',
      readTime: '2 min',
      views: 12300,
      trending: true,
      image: '/api/placeholder/400/200'
    },
    {
      id: 4,
      title: 'Top Engineering Colleges Increase Intake for 2024',
      summary: 'Several premier engineering institutes announce increased seat capacity for upcoming academic session.',
      category: 'Admissions',
      date: '2023-11-22',
      readTime: '5 min',
      views: 6890,
      trending: false,
      image: '/api/placeholder/400/200'
    },
    {
      id: 5,
      title: 'New Scholarship Scheme for SC/ST Students',
      summary: 'Government launches comprehensive scholarship program covering tuition fees and living expenses for meritorious students.',
      category: 'Scholarships',
      date: '2023-11-21',
      readTime: '3 min',
      views: 9540,
      trending: false,
      image: '/api/placeholder/400/200'
    },
    {
      id: 6,
      title: 'CAT 2024: Exam Pattern Changes Introduced',
      summary: 'IIMs announce modifications in CAT exam pattern including new question types and sectional time limits.',
      category: 'MBA',
      date: '2023-11-20',
      readTime: '4 min',
      views: 11200,
      trending: true,
      image: '/api/placeholder/400/200'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Exam Updates': 'bg-blue-500',
      'College News': 'bg-green-500',
      'Medical': 'bg-red-500',
      'Admissions': 'bg-purple-500',
      'Scholarships': 'bg-yellow-500',
      'MBA': 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Latest Education News
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with the latest happenings in Indian education sector
            </p>
          </div>
          <Link href="/news" className="hidden md:block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All News
          </Link>
        </div>

        {/* Featured News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {news.slice(0, 2).map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                {article.trending && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </div>
                )}
                <div className={`absolute top-4 right-4 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-3 leading-tight hover:text-blue-600 transition-colors">
                  <Link href={`/news/${article.id}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {article.summary}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {getTimeAgo(article.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime} read
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {article.views.toLocaleString()} views
                    </span>
                  </div>
                </div>

                {/* Action */}
                <Link 
                  href={`/news/${article.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read Full Article
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* News List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.slice(2).map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Compact Header */}
              <div className="relative h-32 bg-gradient-to-r from-gray-400 to-gray-600">
                <div className={`absolute top-2 left-2 ${getCategoryColor(article.category)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                  {article.category}
                </div>
                {article.trending && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    🔥
                  </div>
                )}
              </div>

              {/* Compact Content */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2 leading-tight line-clamp-2">
                  <Link href={`/news/${article.id}`} className="hover:text-blue-600 transition-colors">
                    {article.title}
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                  {article.summary}
                </p>

                {/* Compact Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </span>
                  <span>{getTimeAgo(article.date)}</span>
                </div>

                <Link 
                  href={`/news/${article.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  Read More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Education News</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest updates on exam notifications, college admissions, scholarship opportunities, 
              and educational policy changes delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-3">
              Join 50,000+ students who stay informed with our newsletter
            </p>
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/news" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;