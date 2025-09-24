import Link from 'next/link';
import { BookOpen, Award, Users, MessageSquare, TrendingUp, Calculator } from 'lucide-react';

const FeaturedSections = () => {
  const features = [
    {
      title: 'College Finder',
      description: 'Discover top colleges across India with detailed information, admission criteria, and reviews.',
      icon: BookOpen,
      href: '/colleges',
      color: 'bg-blue-500',
      stats: '10,000+ Colleges'
    },
    {
      title: 'Exam Guide',
      description: 'Complete information about competitive exams, syllabus, and preparation strategies.',
      icon: Award,
      href: '/exams',
      color: 'bg-green-500',
      stats: '200+ Exams'
    },
    {
      title: 'Course Explorer',
      description: 'Explore various courses, career prospects, and industry trends to make informed decisions.',
      icon: TrendingUp,
      href: '/courses',
      color: 'bg-purple-500',
      stats: '2,500+ Courses'
    },
    {
      title: 'Discussion Forums',
      description: 'Connect with students, share experiences, and get answers from the community.',
      icon: MessageSquare,
      href: '/forums',
      color: 'bg-orange-500',
      stats: '1 Lakh+ Members'
    },
    {
      title: 'Student Reviews',
      description: 'Read authentic reviews from students about colleges, courses, and placement records.',
      icon: Users,
      href: '/reviews',
      color: 'bg-red-500',
      stats: '50,000+ Reviews'
    },
    {
      title: 'College Predictor',
      description: 'Predict your chances of admission to top colleges based on your exam scores.',
      icon: Calculator,
      href: '/predictor',
      color: 'bg-indigo-500',
      stats: 'AI Powered'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Everything You Need for Your Education Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From finding the right college to connecting with fellow students, we've got you covered at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link key={index} href={feature.href}>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-center mb-4">
                    <div className={`${feature.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">
                        {feature.stats}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-6">Join thousands of students who found their perfect educational path with us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </Link>
              <Link href="/about" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;