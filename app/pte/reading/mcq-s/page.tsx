// app/pte/reading/mcq-s/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { Card, Heading, Text, Flex, Loader, View, Button, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
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

const MCQSingleAnswerPage: React.FC = () => {
  const [questions, setQuestions] = useState<PTEQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        // Using the Lambda function instead of direct model query
        const response = await client.mutations.listPTEQuestions({
          limit: "5",
          questionType: "Reading"
        });

        if (!response.data?.items) {
          throw new Error("No questions data received from Lambda");
        }

        // Parse the JSON string containing the questions
        const parsedItems = JSON.parse(response.data.items) as PTEQuestion[];

        setQuestions(parsedItems);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId: string, value: string): void => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleGoBack = (): void => {
    router.push('/pte/reading');
  };

  if (loading) {
    return (
      <View className="flex justify-center items-center min-h-[200px]">
        <Loader size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4 bg-red-50 border border-red-200 rounded">
        <Text className="text-red-600">{error}</Text>
        <Button
          onClick={handleGoBack}
          variation="primary"
          className="mt-4"
          aria-label="Return to reading page"
          tabIndex={0}
        >
          Return to Reading
        </Button>
      </View>
    );
  }

  return (
    <Authenticator>
      {() => (
        <div className="p-8 bg-gray-50 min-h-screen">
          <Heading level={2} className="mb-4">
            Multiple Choice Questions - Single Answer
          </Heading>

          <Flex direction="column" gap="medium">
            {questions.map((question, index) => (
              <Card key={question.id} variation="outlined" className="mb-4">
                <Heading level={4}>{question.questionText}</Heading>
                <Text className="text-gray-600 mt-2 mb-4">Difficulty: {question.difficulty}</Text>

                {question.options && question.options.length > 0 && (
                  <RadioGroupField
                    label="Select the correct answer"
                    name={`question-${question.id}`}
                    value={selectedAnswers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  >
                    {question.options.map((option, optionIdx) => (
                      <Radio key={optionIdx} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </RadioGroupField>
                )}
              </Card>
            ))}

            <Flex justifyContent="space-between" marginTop="large">
              <Button
                onClick={handleGoBack}
                variation="link"
                aria-label="Return to reading page"
                tabIndex={0}
              >
                Back to Reading
              </Button>

              <Button
                variation="primary"
                aria-label="Submit answers"
                tabIndex={0}
              >
                Submit Answers
              </Button>
            </Flex>
          </Flex>
        </div>
      )}
    </Authenticator>
  );
};

export default MCQSingleAnswerPage;
