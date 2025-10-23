'use client';

import AuthGuard from '../components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl  font-bold text-gray-900 mb-6">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard! This page is only accessible to authenticated users.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">My Applications</h2>
            <p className="text-gray-600">Track your college applications</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Saved Colleges</h2>
            <p className="text-gray-600">View your saved colleges</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Predictions</h2>
            <p className="text-gray-600">Your college predictions</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
