"use client";

import React from 'react';
import { Authenticator, Button, View, Heading, Text, Flex } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { client } from '../providers';

/**
 * Option interface for PTE practice test categories
 */
interface Option {
  title: string;
  description?: string;
  path: string;
  colorTheme?: string;
}

/**
 * Available practice test options with paths
 */
const options: Option[] = [
  { 
    title: 'Reading', 
    description: 'Practice your reading skills with comprehension exercises.', 
    path: '/pte/reading',
    colorTheme: 'info' 
  },
  { 
    title: 'Listening', 
    description: 'Practice your listening skills with audio comprehension tests.', 
    path: '/pte/listening',
    colorTheme: 'brand' 
  },
  { 
    title: 'Writing', 
    description: 'Practice your writing skills with essay and summary exercises.', 
    path: '/pte/writing',
    colorTheme: 'success' 
  },
  { 
    title: 'Speaking', 
    description: 'Practice your speaking skills with pronunciation and fluency tests.', 
    path: '/pte/speaking',
    colorTheme: 'warning' 
  },
];

/**
 * PTE Practice Test selection page
 * Displays available test categories using Amplify UI components
 * @returns React component with practice test options
 */
const PtePage: React.FC = (): JSX.Element => {
  const router = useRouter();

  const handleNavigation = (path: string): void => {
    if (!path) return;
    router.push(path);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent, path: string): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleNavigation(path);
    }
  };

  return (
    <Authenticator>
      {() => (
        <View as="main" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <Heading 
            level={1} 
            className="mb-8 text-3xl font-bold text-center"
          >
            PTE Practice Tests
          </Heading>
          
          <Text className="text-center mb-8 max-w-xl">
            Select a skill area below to begin practicing for your PTE exam. 
            Each section contains specialized exercises to help improve your performance.
          </Text>
          
          <Flex 
            direction="column" 
            alignItems="center" 
            className="w-full max-w-4xl"
          >
            <View className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {options.map((option) => (
                <Button
                  key={option.title}
                  onClick={() => handleNavigation(option.path)}
                  variation="primary"
                  colorTheme={option.colorTheme as any || "neutral"}
                  className="p-6 h-auto shadow-sm hover:shadow-md transition-shadow"
                  aria-label={`Start ${option.title} practice tests`}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, option.path)}
                >
                  <Flex direction="column" alignItems="center" gap="small">
                    <Heading level={3} className="text-xl font-semibold">{option.title}</Heading>
                    {option.description && (
                      <Text className="text-sm mt-2 text-center">{option.description}</Text>
                    )}
                  </Flex>
                </Button>
              ))}
            </View>
            
            <Button
              onClick={() => handleNavigation('/')}
              variation="link"
              className="mt-8"
              aria-label="Return to home page"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, '/')}
            >
              Return to Home
            </Button>
          </Flex>
        </View>
      )}
    </Authenticator>
  );
};

export default PtePage;
