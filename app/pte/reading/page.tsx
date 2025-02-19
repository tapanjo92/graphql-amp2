import React from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

type ReadingSubsection = {
  title: string;
  description: string;
  path: string;
};

const readingSubsections: ReadingSubsection[] = [
  {
    title: "Multiple-choice: choose single answer",
    description: "Select one answer from the options.",
    path: "/pte/reading/single-choice",
  },
  {
    title: "Multiple-choice: choose multiple answers",
    description: "Select one or more answers from the options.",
    path: "/pte/reading/multiple-choice",
  },
  {
    title: "Re-order paragraphs:",
    description: "Arrange the paragraphs in the correct order.",
    path: "/pte/reading/reorder-paragraphs",
  },
  {
    title: "Fill in the blanks (drag and drop):",
    description: "Drag and drop to fill in the missing words.",
    path: "/pte/reading/fill-in-the-blanks",
  },
  {
    title: "Reading & Writing:",
    description: "Engage in both reading and writing exercises.",
    path: "/pte/reading/reading-and-writing",
  },
];

const ReadingPage: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (path: string): void => {
    if (!path) return;
    router.push(path);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Reading Options</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {readingSubsections.map((option, idx) => (
                <div
                  key={idx}
                  tabIndex={0}
                  aria-label={option.title}
                  className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleCardClick(option.path)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCardClick(option.path);
                    }
                  }}
                >
                  <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={signOut} aria-label="Sign Out" className="bg-red-500 hover:bg-red-600">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default ReadingPage;
