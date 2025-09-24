import Link from 'next/link';
import { Calendar, Clock, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

const PopularExams = () => {
  // Sample exam data - in a real app, this would come from an API
  const exams = [
    {
      id: 1,
      name: 'JEE Main',
      fullName: 'Joint Entrance Examination Main',
      category: 'Engineering',
      date: '2024-01-24',
      registrationEnd: '2024-01-15',
      participants: '12 Lakh',
      difficulty: 'High',
      icon: '🔧',
      color: 'bg-blue-500',
      popular: true
    },
    {
      id: 2,
      name: 'NEET',
      fullName: 'National Eligibility cum Entrance Test',
      category: 'Medical',
      date: '2024-05-05',
      registrationEnd: '2024-04-15',
      participants: '18 Lakh',
      difficulty: 'High',
      icon: '⚕️',
      color: 'bg-red-500',
      popular: true
    },
    {
      id: 3,
      name: 'CAT',
      fullName: 'Common Admission Test',
      category: 'Management',
      date: '2024-11-26',
      registrationEnd: '2024-09-20',
      participants: '3.5 Lakh',
      difficulty: 'High',
      icon: '💼',
      color: 'bg-purple-500',
      popular: true
    },
    {
      id: 4,
      name: 'GATE',
      fullName: 'Graduate Aptitude Test in Engineering',
      category: 'Engineering',
      date: '2024-02-03',
      registrationEnd: '2024-01-10',
      participants: '8.5 Lakh',
      difficulty: 'High',
      icon: '⚙️',
      color: 'bg-green-500',
      popular: false
    },
    {
      id: 5,
      name: 'CLAT',
      fullName: 'Common Law Admission Test',
      category: 'Law',
      date: '2024-12-01',
      registrationEnd: '2024-10-15',
      participants: '75,000',
      difficulty: 'Medium',
      icon: '⚖️',
      color: 'bg-indigo-500',
      popular: false
    },
    {
      id: 6,
      name: 'NDA',
      fullName: 'National Defence Academy',
      category: 'Defence',
      date: '2024-04-21',
      registrationEnd: '2024-03-15',
      participants: '5 Lakh',
      difficulty: 'Medium',
      icon: '🛡️',
      color: 'bg-orange-500',
      popular: false
    }
  ];

  const getDaysUntilExam = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Popular Competitive Exams
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with important exam dates and registration deadlines
            </p>
          </div>
          <Link href="/exams" className="hidden md:block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Exams
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => {
            const daysUntil = getDaysUntilExam(exam.date);
            return (
              <div key={exam.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className={`${exam.color} p-4 text-white relative`}>
                  {exam.popular && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{exam.icon}</span>
                    <div>
                      <h3 className="font-bold text-xl">{exam.name}</h3>
                      <p className="text-sm opacity-90">{exam.category}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3 leading-tight">
                    {exam.fullName}
                  </h4>

                  {/* Key Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Exam Date:</span>
                      <span className="ml-auto font-semibold">
                        {new Date(exam.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Registration Ends:</span>
                      <span className="ml-auto font-semibold text-red-600">
                        {new Date(exam.registrationEnd).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Expected Candidates:</span>
                      <span className="ml-auto font-semibold">{exam.participants}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                      {exam.difficulty} Level
                    </span>
                    {daysUntil > 0 && (
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                        {daysUntil} days left
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link 
                      href={`/exams/${exam.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      View Details
                    </Link>
                    <Link 
                      href={`/exams/${exam.id}/syllabus`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <Award className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Exam Preparation Resources</h3>
              <p className="text-blue-100 mb-6">
                Get access to comprehensive study materials, mock tests, and expert guidance 
                for all major competitive exams.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/preparation" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Materials
                </Link>
                <Link href="/mock-tests" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
                  Mock Tests
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">200+</div>
                  <div className="text-blue-100 text-sm">Exams Covered</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">50K+</div>
                  <div className="text-blue-100 text-sm">Practice Questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/exams" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Exams
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularExams;