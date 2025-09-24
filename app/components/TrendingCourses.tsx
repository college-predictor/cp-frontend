import Link from 'next/link';
import { TrendingUp, Clock, Users, Star, BookOpen, ArrowRight } from 'lucide-react';

const TrendingCourses = () => {
  // Sample course data - in a real app, this would come from an API
  const courses = [
    {
      id: 1,
      name: 'Computer Science Engineering',
      shortName: 'CSE',
      category: 'Engineering',
      duration: '4 Years',
      level: 'Undergraduate',
      popularity: 95,
      avgSalary: '₹12 LPA',
      colleges: 2500,
      students: '8 Lakh',
      trending: true,
      description: 'Learn programming, algorithms, software development, and emerging technologies.',
      skills: ['Programming', 'Data Structures', 'Web Development', 'AI/ML'],
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Medicine (MBBS)',
      shortName: 'MBBS',
      category: 'Medical',
      duration: '5.5 Years',
      level: 'Undergraduate',
      popularity: 92,
      avgSalary: '₹15 LPA',
      colleges: 596,
      students: '1.5 Lakh',
      trending: true,
      description: 'Comprehensive medical education covering diagnosis, treatment, and patient care.',
      skills: ['Diagnosis', 'Surgery', 'Patient Care', 'Medical Research'],
      color: 'bg-red-500'
    },
    {
      id: 3,
      name: 'Master of Business Administration',
      shortName: 'MBA',
      category: 'Management',
      duration: '2 Years',
      level: 'Postgraduate',
      popularity: 88,
      avgSalary: '₹18 LPA',
      colleges: 5000,
      students: '4 Lakh',
      trending: true,
      description: 'Develop leadership, strategic thinking, and business management skills.',
      skills: ['Leadership', 'Strategy', 'Finance', 'Marketing'],
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Data Science',
      shortName: 'Data Science',
      category: 'Technology',
      duration: '1-2 Years',
      level: 'Certification/Masters',
      popularity: 90,
      avgSalary: '₹14 LPA',
      colleges: 800,
      students: '2 Lakh',
      trending: true,
      description: 'Master data analysis, machine learning, and statistical modeling.',
      skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Chartered Accountancy',
      shortName: 'CA',
      category: 'Commerce',
      duration: '4-5 Years',
      level: 'Professional',
      popularity: 85,
      avgSalary: '₹10 LPA',
      colleges: 0,
      students: '3 Lakh',
      trending: false,
      description: 'Professional course in accounting, taxation, and financial management.',
      skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis'],
      color: 'bg-indigo-500'
    },
    {
      id: 6,
      name: 'Mechanical Engineering',
      shortName: 'Mechanical',
      category: 'Engineering',
      duration: '4 Years',
      level: 'Undergraduate',
      popularity: 80,
      avgSalary: '₹8 LPA',
      colleges: 3000,
      students: '5 Lakh',
      trending: false,
      description: 'Study of machines, engines, and mechanical systems design.',
      skills: ['CAD', 'Thermodynamics', 'Manufacturing', 'Robotics'],
      color: 'bg-orange-500'
    }
  ];

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-600 bg-green-100';
    if (popularity >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Trending Courses
            </h2>
            <p className="text-lg text-gray-600">
              Explore the most popular and in-demand courses across various fields
            </p>
          </div>
          <Link href="/courses" className="hidden md:block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Header */}
              <div className={`${course.color} p-4 text-white relative`}>
                {course.trending && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{course.shortName}</h3>
                    <p className="text-sm opacity-90">{course.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{course.popularity}%</div>
                    <div className="text-xs opacity-90">Popular</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-800 mb-2 leading-tight">
                  {course.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Duration:
                    </span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Level:</span>
                    <span className="font-semibold">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Avg. Salary:
                    </span>
                    <span className="font-semibold text-green-600">{course.avgSalary}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-gray-800">{course.colleges > 0 ? course.colleges.toLocaleString() : 'N/A'}</div>
                    <div className="text-xs text-gray-500">Colleges</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">{course.students}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="text-xs text-gray-500">+{course.skills.length - 3} more</span>
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

        {/* Course Categories */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Explore Courses by Category</h3>
            <p className="text-purple-100">
              Find courses across different fields and specializations
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Engineering', count: '2,500+', icon: '⚙️' },
              { name: 'Medical', count: '500+', icon: '⚕️' },
              { name: 'Management', count: '1,200+', icon: '💼' },
              { name: 'Arts & Science', count: '3,000+', icon: '🎨' },
              { name: 'Law', count: '400+', icon: '⚖️' },
              { name: 'Technology', count: '800+', icon: '💻' },
              { name: 'Commerce', count: '600+', icon: '📊' },
              { name: 'Design', count: '300+', icon: '🎨' }
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

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;