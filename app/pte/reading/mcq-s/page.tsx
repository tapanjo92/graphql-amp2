"use client";

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { Card, Heading, Text, Flex, Loader, View } from "@aws-amplify/ui-react";

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

const MCQSPage: React.FC = () => {
  const [questions, setQuestions] = useState<PTEQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await client.models.PTEQuestion.list({
          filter: {
            questionType: {
              eq: "MCQ-S"
            }
          },
          limit: 5
        });

        const typedQuestions = response.data.map(item => ({
          id: item.id,
          questionType: item.questionType,
          questionText: item.questionText,
          options: item.options ? item.options.filter((option): option is string => option !== null) : null,
          correctAnswer: item.correctAnswer ?? null,
          explanation: item.explanation ?? null,
          difficulty: item.difficulty ?? null,
          audioUrl: item.audioUrl ?? null,
          imageUrl: item.imageUrl ?? null,
          passageText: item.passageText ?? null,
        })) as PTEQuestion[];

        setQuestions(typedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

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
      </View>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Heading level={2} className="mb-4">
        Multiple Choice Questions - Single Answer
      </Heading>
      <Flex direction="column" gap="medium">
        {questions.map((q) => (
          <Card key={q.id} padding="medium" className="mb-4">
            <Heading level={4}>{q.questionText}</Heading>
            <Text className="text-gray-600">Difficulty: {q.difficulty}</Text>
            {q.options && q.options.length > 0 && (
              <ul className="list-disc pl-5 mt-4">
                {q.options.map((option, idx) => (
                  <li key={idx} className="mb-2">
                    <Text>{option}</Text>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default MCQSPage;
