"use client";
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

const PTEPage = () => {
  const router = useRouter();

  const handleReadingClick = () => {
    router.push('/pte/reading');
  };

  return (
    <Authenticator>
      {() => (
        <main className="max-w-5xl mx-auto p-6 bg-white">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">PTE Practice Tests</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="p-6 bg-gray-100 rounded-lg text-center shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Reading Section</h2>
              <p className="text-gray-600 mb-6">Practice your reading skills with our mock tests</p>
              <Button
                onClick={handleReadingClick}
                variation="primary"
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Start Reading Practice
              </Button>
            </div>
          </div>
        </main>
      )}
    </Authenticator>
  );
};

export default PTEPage;
