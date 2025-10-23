'use client';

import AuthGuard from '../components/AuthGuard';
import { auth } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
        
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-6 mb-6">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="h-24 w-24 rounded-full border-4 border-blue-500"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-blue-500">
                  {user.displayName 
                    ? user.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                    : user.email?.[0]?.toUpperCase() || 'U'
                  }
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.displayName || 'User'}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={user.displayName || ''} 
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={user.email || ''} 
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                <input 
                  type="text" 
                  value={user.uid || ''} 
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
                <input 
                  type="text" 
                  value={user.metadata?.creationTime || ''} 
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
