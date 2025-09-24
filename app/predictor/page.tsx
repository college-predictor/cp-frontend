'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, Target, Star, MapPin, Award, CheckCircle, AlertCircle } from 'lucide-react';

interface College {
  name: string;
  branch: string;
  location: string;
  probability: number;
  cutoffRank: number;
  fees: string;
  ranking: number;
  placementRate: number;
}

interface PredictionResult {
  highChances: College[];
  moderateChances: College[];
  lowChances: College[];
}

const PredictorPage = () => {
  const [formData, setFormData] = useState({
    exam: '',
    score: '',
    rank: '',
    category: '',
    state: '',
    preferredBranch: '',
    preferredLocation: ''
  });
  const [predictions, setPredictions] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const exams = [
    'JEE Main',
    'JEE Advanced',
    'NEET',
    'GATE',
    'CAT',
    'CLAT',
    'BITSAT',
    'VITEEE',
    'COMEDK'
  ];

  const categories = [
    'General',
    'OBC',
    'SC',
    'ST',
    'EWS'
  ];

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const branches = [
    'Computer Science Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics and Communication',
    'Chemical Engineering',
    'Biotechnology',
    'Aerospace Engineering',
    'Information Technology',
    'Instrumentation Engineering'
  ];

  // Sample prediction data
  const samplePredictions = {
    highChances: [
      {
        name: 'Indian Institute of Technology Delhi',
        branch: 'Computer Science Engineering',
        location: 'New Delhi',
        probability: 95,
        cutoffRank: 500,
        fees: '₹2.5 Lakhs',
        ranking: 2,
        placementRate: 98
      },
      {
        name: 'Indian Institute of Technology Bombay',
        branch: 'Electrical Engineering',
        location: 'Mumbai',
        probability: 92,
        cutoffRank: 450,
        fees: '₹2.5 Lakhs',
        ranking: 1,
        placementRate: 99
      },
      {
        name: 'Indian Institute of Technology Kanpur',
        branch: 'Computer Science Engineering',
        location: 'Kanpur',
        probability: 88,
        cutoffRank: 600,
        fees: '₹2.5 Lakhs',
        ranking: 4,
        placementRate: 97
      }
    ],
    moderateChances: [
      {
        name: 'Indian Institute of Technology Kharagpur',
        branch: 'Electronics and Communication',
        location: 'Kharagpur',
        probability: 65,
        cutoffRank: 800,
        fees: '₹2.5 Lakhs',
        ranking: 5,
        placementRate: 96
      },
      {
        name: 'Indian Institute of Technology Roorkee',
        branch: 'Civil Engineering',
        location: 'Roorkee',
        probability: 70,
        cutoffRank: 750,
        fees: '₹2.5 Lakhs',
        ranking: 6,
        placementRate: 95
      },
      {
        name: 'Indian Institute of Technology Guwahati',
        branch: 'Chemical Engineering',
        location: 'Guwahati',
        probability: 62,
        cutoffRank: 900,
        fees: '₹2.5 Lakhs',
        ranking: 7,
        placementRate: 94
      }
    ],
    lowChances: [
      {
        name: 'Indian Institute of Technology Hyderabad',
        branch: 'Biotechnology',
        location: 'Hyderabad',
        probability: 35,
        cutoffRank: 300,
        fees: '₹2.5 Lakhs',
        ranking: 8,
        placementRate: 93
      },
      {
        name: 'Indian Institute of Technology Indore',
        branch: 'Mechanical Engineering',
        location: 'Indore',
        probability: 40,
        cutoffRank: 250,
        fees: '₹2.5 Lakhs',
        ranking: 9,
        placementRate: 92
      }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPredictions(samplePredictions);
      setLoading(false);
    }, 2000);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-100';
    if (probability >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getChanceIcon = (probability: number) => {
    if (probability >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (probability >= 50) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Calculator className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered College Predictor
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Predict your chances of admission to top colleges based on your exam scores, 
            rank, and preferences using advanced machine learning algorithms.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Prediction Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-blue-600" />
                  Enter Your Details
                </h2>

                <form onSubmit={handlePredict} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Exam
                    </label>
                    <select
                      name="exam"
                      value={formData.exam}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Choose exam</option>
                      {exams.map(exam => (
                        <option key={exam} value={exam}>{exam}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Score
                    </label>
                    <input
                      type="number"
                      name="score"
                      value={formData.score}
                      onChange={handleInputChange}
                      placeholder="Enter your score"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rank (if available)
                    </label>
                    <input
                      type="number"
                      name="rank"
                      value={formData.rank}
                      onChange={handleInputChange}
                      placeholder="Enter your rank"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select state</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Branch
                    </label>
                    <select
                      name="preferredBranch"
                      value={formData.preferredBranch}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select branch (optional)</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Predicting...
                      </>
                    ) : (
                      <>
                        <Calculator className="h-5 w-5 mr-2" />
                        Predict My Chances
                      </>
                    )}
                  </button>
                </form>

                {/* AI Features */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    AI-Powered Predictions
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Based on historical data of 10+ years</li>
                    <li>• Considers category-wise cutoffs</li>
                    <li>• Real-time seat availability</li>
                    <li>• 95% accuracy rate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              {predictions ? (
                <div className="space-y-8">
                  {/* Summary */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Prediction Results
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {predictions.highChances.length}
                        </div>
                        <div className="text-green-700">High Chances</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          {predictions.moderateChances.length}
                        </div>
                        <div className="text-yellow-700">Moderate Chances</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {predictions.lowChances.length}
                        </div>
                        <div className="text-red-700">Low Chances</div>
                      </div>
                    </div>
                  </div>

                  {/* High Chances */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                      <CheckCircle className="h-6 w-6 mr-2" />
                      High Probability Colleges (80%+ chances)
                    </h3>
                    <div className="space-y-4">
                      {predictions.highChances.map((college, index) => (
                        <div key={index} className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg">{college.name}</h4>
                              <p className="text-blue-600 font-medium">{college.branch}</p>
                              <div className="flex items-center text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {college.location}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getProbabilityColor(college.probability)}`}>
                                {college.probability}% chance
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Cutoff Rank:</span>
                              <div className="font-semibold">{college.cutoffRank}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Annual Fees:</span>
                              <div className="font-semibold">{college.fees}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">NIRF Ranking:</span>
                              <div className="font-semibold flex items-center">
                                <Award className="h-3 w-3 mr-1" />
                                #{college.ranking}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Placement:</span>
                              <div className="font-semibold">{college.placementRate}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Moderate Chances */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
                      <AlertCircle className="h-6 w-6 mr-2" />
                      Moderate Probability Colleges (50-80% chances)
                    </h3>
                    <div className="space-y-4">
                      {predictions.moderateChances.map((college, index) => (
                        <div key={index} className="border border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg">{college.name}</h4>
                              <p className="text-blue-600 font-medium">{college.branch}</p>
                              <div className="flex items-center text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {college.location}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getProbabilityColor(college.probability)}`}>
                                {college.probability}% chance
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Cutoff Rank:</span>
                              <div className="font-semibold">{college.cutoffRank}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Annual Fees:</span>
                              <div className="font-semibold">{college.fees}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">NIRF Ranking:</span>
                              <div className="font-semibold flex items-center">
                                <Award className="h-3 w-3 mr-1" />
                                #{college.ranking}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Placement:</span>
                              <div className="font-semibold">{college.placementRate}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Low Chances */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                      <AlertCircle className="h-6 w-6 mr-2" />
                      Dream Colleges (Below 50% chances)
                    </h3>
                    <div className="space-y-4">
                      {predictions.lowChances.map((college, index) => (
                        <div key={index} className="border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg">{college.name}</h4>
                              <p className="text-blue-600 font-medium">{college.branch}</p>
                              <div className="flex items-center text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {college.location}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getProbabilityColor(college.probability)}`}>
                                {college.probability}% chance
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Cutoff Rank:</span>
                              <div className="font-semibold">{college.cutoffRank}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Annual Fees:</span>
                              <div className="font-semibold">{college.fees}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">NIRF Ranking:</span>
                              <div className="font-semibold flex items-center">
                                <Award className="h-3 w-3 mr-1" />
                                #{college.ranking}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Placement:</span>
                              <div className="font-semibold">{college.placementRate}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">
                      Recommendations
                    </h3>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Focus on colleges with high probability for better chances</li>
                      <li>• Consider alternative branches in top colleges</li>
                      <li>• Apply to a mix of safe, moderate, and dream colleges</li>
                      <li>• Keep backup options ready from state counseling</li>
                      <li>• Consider location preferences for better opportunities</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="mb-6">
                    <Calculator className="h-16 w-16 text-gray-300 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Ready to Predict Your College Chances?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Fill in your exam details on the left to get AI-powered predictions 
                    for your college admission chances.
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 mb-3">What makes our predictor special?</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          95% prediction accuracy
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Based on 10+ years of data
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Category-wise analysis
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Real-time seat updates
                        </li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 mb-3">Supported Exams</h4>
                      <div className="flex flex-wrap gap-2">
                        {exams.slice(0, 6).map(exam => (
                          <span key={exam} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictorPage;