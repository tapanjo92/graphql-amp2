import { useState, useEffect } from "react";
import { getCurrentUser, fetchUserAttributes, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

type UserData = {
  givenName: string;
  familyName: string;
  email: string;
  isComplete: boolean;
};

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFetchUserData = async () => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const missingAttributes: string[] = [];

      if (!attributes.email) missingAttributes.push("email");
      if (!attributes.given_name) missingAttributes.push("first name");
      if (!attributes.family_name) missingAttributes.push("last name");

      setUserData({
        email: attributes.email || currentUser.signInDetails?.loginId || "",
        givenName: attributes.given_name || currentUser.username || "",
        familyName: attributes.family_name || "",
        isComplete: missingAttributes.length === 0,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAuthAndLoadData = async () => {
    try {
      await getCurrentUser();
      await handleFetchUserData();
    } catch (error) {
      console.error("Authentication error:", error);
      router.push("/login");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    handleCheckAuthAndLoadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Loading your profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-white flex flex-col items-center py-8">
      <div className="max-w-4xl w-full px-4 space-y-6">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <button
              onClick={() => router.push("/profile/edit")}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
              aria-label="Edit Profile"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && router.push("/profile/edit")}
            >
              <span>Edit Profile</span>
            </button>
          </div>
          <div className="p-6 flex items-center space-x-4">
            <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {userData.givenName?.charAt(0)}
                {userData.familyName?.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {userData.givenName} {userData.familyName}
              </h2>
              <p className="text-gray-500">{userData.email}</p>
              {!userData.isComplete && (
                <p className="text-sm text-red-600 mt-2">
                  Profile incomplete. Please update your info.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Headline</label>
              <input
                type="text"
                placeholder="Add a professional headline"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Add your location"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              placeholder="Write a short bio"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">
              Share your professional background and interests.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSignOut}
            className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Sign out"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleSignOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
