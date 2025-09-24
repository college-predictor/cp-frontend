import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  // Sample testimonial data - in a real app, this would come from an API
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Engineering Student',
      college: 'IIT Delhi',
      rating: 5,
      content: 'EduPortal helped me find the perfect college for my engineering aspirations. The detailed information about placement records and faculty made my decision easier.',
      avatar: '👩‍🎓',
      course: 'Computer Science',
      year: '2023'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'Medical Student',
      college: 'AIIMS Delhi',
      rating: 5,
      content: 'The exam preparation resources and community discussions were invaluable during my NEET preparation. I couldn\'t have done it without this platform.',
      avatar: '👨‍🎓',
      course: 'MBBS',
      year: '2022'
    },
    {
      id: 3,
      name: 'Sneha Patel',
      role: 'MBA Graduate',
      college: 'IIM Ahmedabad',
      rating: 5,
      content: 'The college predictor tool was incredibly accurate. It helped me shortlist colleges based on my CAT score and I got admission in my dream institute.',
      avatar: '👩‍💼',
      course: 'MBA',
      year: '2021'
    },
    {
      id: 4,
      name: 'Arjun Singh',
      role: 'Data Science Student',
      college: 'ISI Kolkata',
      rating: 4,
      content: 'Found amazing course recommendations and connected with seniors through the forums. The platform is a one-stop solution for all education-related queries.',
      avatar: '👨‍💻',
      course: 'Statistics',
      year: '2023'
    },
    {
      id: 5,
      name: 'Kavya Reddy',
      role: 'Law Student',
      college: 'NLSIU Bangalore',
      rating: 5,
      content: 'The detailed college reviews from actual students helped me understand the campus culture and academic environment before making my choice.',
      avatar: '👩‍⚖️',
      course: 'Law',
      year: '2022'
    },
    {
      id: 6,
      name: 'Vikash Gupta',
      role: 'CA Aspirant',
      college: 'ICAI',
      rating: 4,
      content: 'The career guidance section and success stories motivated me to pursue CA. The study materials and mock tests were extremely helpful.',
      avatar: '👨‍💼',
      course: 'Chartered Accountancy',
      year: '2023'
    }
  ];

  const stats = [
    { label: 'Success Stories', value: '50,000+' },
    { label: 'Students Helped', value: '5 Lakh+' },
    { label: 'Average Rating', value: '4.8/5' },
    { label: 'Placement Rate', value: '95%' }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from thousands of students who found their perfect educational path through EduPortal
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-blue-200">
                <Quote className="h-8 w-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center">
                <div className="text-4xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-blue-600 text-sm font-medium">{testimonial.role}</p>
                  <p className="text-gray-600 text-sm">{testimonial.college}</p>
                  <p className="text-gray-500 text-xs">{testimonial.course} • Class of {testimonial.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of successful students who found their perfect educational path. 
            Start your journey today and become our next success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Journey
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Share Your Story
            </button>
          </div>
        </div>

        {/* Review Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-700">Students got into their preferred college</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
            <div className="text-gray-700">Would recommend EduPortal to friends</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
            <div className="text-gray-700">Found better career opportunities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;