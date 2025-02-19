import React from 'react';
import { Authenticator, Button, View, Heading } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

interface Option {
  title: string;
  description?: string;
  path: string;
}

const options: Option[] = [
  { title: 'Reading', description: 'Practice your reading skills.', path: '/pte/reading' },
  { title: 'Listening', description: 'Practice your listening skills.', path: '/pte/listening' },
  { title: 'Writing', description: 'Practice your writing skills.', path: '/pte/writing' },
  { title: 'Speaking', description: 'Practice your speaking skills.', path: '/pte/speaking' },
];

const PtePage: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string): void => {
    if (!path) return;
    router.push(path);
  };

  return (
    <Authenticator>
      {() => (
        <View className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <Heading level={1} className="mb-8 text-3xl font-bold">
            PTE Practice
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {options.map((option) => (
              <Button
                key={option.title}
                onClick={() => handleNavigation(option.path)}
                className="p-6"
                aria-label={`Navigate to ${option.title}`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl font-semibold">{option.title}</span>
                  {option.description && (
                    <span className="text-sm text-gray-600 mt-2">{option.description}</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </View>
      )}
    </Authenticator>
  );
};

export default PtePage;
