"use client";
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

const ReadingPage = () => {
  const router = useRouter();

  const readingSubsections = [
    {
      title: "Multiple-choice, Choose Single Answer",
      description: "Practice questions where you need to select one correct answer from multiple options",
      path: "/pte/reading/single-choice"
    },
    {
      title: "Multiple-choice, Choose Multiple Answers",
      description: "Practice questions where you need to select multiple correct answers",
      path: "/pte/reading/multiple-choice"
    },
    {
      title: "Reading & Fill in the Blanks",
      description: "Practice completing passages by filling in missing words",
      path: "/pte/reading/fill-blanks"
    }
  ];

  return (
    <Authenticator>
      {() => (
        <main className="max-w-5xl mx-auto p-6 bg-white">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">PTE Reading Practice</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {readingSubsections.map((section, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-100 rounded-lg text-center shadow hover:shadow-lg transition-shadow"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push(section.path);
                  }
                }}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{section.title}</h2>
                <p className="text-gray-600 mb-6">{section.description}</p>
                <Button
                  onClick={() => router.push(section.path)}
                  variation="primary"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
                  aria-label={`Start ${section.title} practice`}
                >
                  Start Practice
                </Button>
              </div>
            ))}
          </div>
        </main>
      )}
    </Authenticator>
  );
};

export default ReadingPage;

