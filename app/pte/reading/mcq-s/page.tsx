'use client';

import { useEffect, useState } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { Card, Flex, Heading, Text, View, Button, Loader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Define MCQ type
type MCQ = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

// Generate the Amplify Gen2 API client
const client = generateClient();

// GraphQL query for fetching MCQs
const listReadingMCQsQuery = `
  query ListReadingMCQs {
    listReadingMCQs {
      items {
        id
        question
        options
        correctAnswer
        explanation
      }
    }
  }
`;

export default function MCQPage() {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchMCQs() {
      try {
        // Ensure the user is authenticated
        const authSession = await fetchAuthSession();
        
        if (!authSession.tokens) {
          setError('Authentication required');
          setLoading(false);
          return;
        }
        
        // Fetch MCQs using the Amplify Gen2 client
        const response = await client.graphql({
          query: listReadingMCQsQuery,
          authMode: 'userPool'
        });
        
        if (response.data?.listReadingMCQs?.items) {
          setMcqs(response.data.listReadingMCQs.items);
        } else {
          console.log('No MCQs found or empty response:', response);
          // Empty array is valid, just might be no data yet
        }
      } catch (err: any) {
        console.error('Error fetching MCQs:', err);
        setError(err.message || 'Failed to load MCQs');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMCQs();
  }, []);
  
  // Handle loading state
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="50vh">
        <Loader size="large" variation="linear" />
      </Flex>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <View padding="medium">
        <Card variation="elevated">
          <Heading level={3} color="red">Error Loading MCQs</Heading>
          <Text>{error}</Text>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Retry
          </Button>
        </Card>
      </View>
    );
  }
  
  // Handle empty state
  if (mcqs.length === 0) {
    return (
      <View padding="medium">
        <Card>
          <Heading level={3}>No MCQs Available</Heading>
          <Text>There are currently no multiple choice questions available for this section.</Text>
        </Card>
      </View>
    );
  }
  
  // Render MCQs
  return (
    <View as="main" padding="medium">
      <Heading level={2} className="mb-6">Reading: Multiple Choice Questions</Heading>
      
      <Flex direction="column" gap="medium">
        {mcqs.map((mcq) => (
          <Card key={mcq.id} variation="elevated" className="p-4">
            <Heading level={5} className="mb-3">{mcq.question}</Heading>
            
            <Flex direction="column" gap="small">
              {mcq.options.map((option, index) => (
                <Button
                  key={index}
                  variation="outline"
                  className="text-left justify-start p-3 hover:bg-gray-50"
                  tabIndex={0}
                  aria-label={`Option ${index + 1}: ${option}`}
                >
                  <Text>{option}</Text>
                </Button>
              ))}
            </Flex>
          </Card>
        ))}
      </Flex>
    </View>
  );
}
