// app/pte/reading/mcq-s/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { 
  Card, 
  Heading, 
  Text, 
  Flex, 
  Loader, 
  View, 
  Button, 
  Radio, 
  RadioGroupField,
  Authenticator 
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

const client = generateClient<Schema>();

type PTEQuestion = {
  id: string;
  questionType: string;
  questionText: string;
  options: string[] | null;
  correctAnswer: string | null;
  explanation: string | null;
  difficulty: 'Easy' | 'Medium' | 'Hard' | null;
  audioUrl: string | null;
  imageUrl: string | null;
  passageText: string | null;
};

export default function MCQSingleAnswerPage() {
  const [questions, setQuestions] = useState<PTEQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await client.models.PTEQuestion.list({
          filter: {
            questionType: { eq: "Reading" }
          },
          limit: 5
        });

        if (!response.data) {
          throw new Error("No questions data received");
        }

        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId: string, value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    // Implement your submit logic here
    console.log('Submitted answers:', selectedAnswers);
  };

  const handleGoBack = () => {
    router.push('/pte/reading');
  };

  if (loading) {
    return (
      <View padding="medium">
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Loader size="large" />
        </Flex>
      </View>
    );
  }

  if (error) {
    return (
      <View padding="medium">
        <Card variation="elevated">
          <Text variation="error">{error}</Text>
          <Button
            onClick={handleGoBack}
            variation="primary"
            marginTop="medium"
          >
            Return to Reading
          </Button>
        </Card>
      </View>
    );
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <View padding="medium" backgroundColor="background.secondary">
          <Card variation="elevated">
            <Heading level={2} marginBottom="medium">
              Multiple Choice Questions - Single Answer
            </Heading>

            <Flex direction="column" gap="medium">
              {questions.map((question) => (
                <Card 
                  key={question.id} 
                  variation="outlined"
                  padding="medium"
                >
                  <Heading level={4} marginBottom="small">
                    {question.questionText}
                  </Heading>
                  
                  <Text variation="secondary" marginBottom="medium">
                    Difficulty: {question.difficulty}
                  </Text>

                  {question.options && question.options.length > 0 && (
                    <RadioGroupField
                      name={`question-${question.id}`}
                      legend="Select the correct answer:"
                      value={selectedAnswers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    >
                      {question.options.map((option, index) => (
                        <Radio 
                          key={`${question.id}-option-${index}`}
                          value={option}
                        >
                          {option}
                        </Radio>
                      ))}
                    </RadioGroupField>
                  )}
                </Card>
              ))}

              <Flex 
                direction="row" 
                justifyContent="space-between"
                marginTop="large"
              >
                <Button
                  onClick={handleGoBack}
                  variation="link"
                >
                  Back to Reading
                </Button>

                <Button
                  onClick={handleSubmit}
                  variation="primary"
                  isDisabled={Object.keys(selectedAnswers).length !== questions.length}
                >
                  Submit Answers
                </Button>
              </Flex>
            </Flex>
          </Card>
        </View>
      )}
    </Authenticator>
  );
}

