// components/EditProfileModal.tsx
'use client';
import { useState } from 'react';
import { updateUserAttributes } from 'aws-amplify/auth';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    givenName?: string;
    familyName?: string;
  };
  onUpdate: () => void;
}

export default function EditProfileModal({ 
  isOpen, 
  onClose, 
  currentUser,
  onUpdate 
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    given_name: currentUser.givenName || '',
    family_name: currentUser.familyName || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateUserAttributes({
        userAttributes: {
          given_name: formData.given_name,
          family_name: formData.family_name,
        },
      });
      
      onUpdate(); // Refresh parent component data
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={formData.given_name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                given_name: e.target.value
              }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={formData.family_name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                family_name: e.target.value
              }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

