interface ProfileInfoProps {
    userData: {
      givenName: string;
      familyName: string;
      email: string;
    };
  }
  
  const ProfileInfo: React.FC<ProfileInfoProps> = ({ userData }) => {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Headline</label>
              <input
                type="text"
                placeholder="Add a professional headline"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Add your location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            placeholder="Write a short bio"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          ></textarea>
          <p className="mt-2 text-sm text-gray-500">
            Share your professional background and interests. Links and promotional content are not permitted.
          </p>
        </div>
      </div>
    );
  };
  
  export default ProfileInfo;
