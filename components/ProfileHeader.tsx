import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
  userData: {
    givenName: string;
    familyName: string;
    email: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData }) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <button
            onClick={() => router.push('/profile/edit')}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
            aria-label="Edit Profile"
            tabIndex={0}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {userData.givenName?.charAt(0)}{userData.familyName?.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {userData.givenName} {userData.familyName}
            </h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
