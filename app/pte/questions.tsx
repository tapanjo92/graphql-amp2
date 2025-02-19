"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { View, Heading, Text, Loader } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

interface Question {
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
}

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await client.models.PTEQuestion.list();
        // Get only 5 random questions
        const shuffled = response.data.sort(() => 0.5 - Math.random());

        // Type cast each item to explicitly match the Question interface, handling nulls safely.
        const selectedQuestions = shuffled.slice(0, 5).map(item => ({
          id: item.id,
          questionType: item.questionType,
          questionText: item.questionText,
          options: item.options ? item.options.filter((option): option is string => option !== null) : null, // Filter out nulls and assert non-null
          correctAnswer: item.correctAnswer ?? null,
          explanation: item.explanation ?? null,
          difficulty: item.difficulty ?? null,
          audioUrl: item.audioUrl ?? null,
          imageUrl: item.imageUrl ?? null,
          passageText: item.passageText ?? null,
        })) as Question[];

        setQuestions(selectedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
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
    <View className="space-y-8">
      <Heading level={2} className="text-2xl font-bold mb-6">
        Practice Questions
      </Heading>

      <View className="space-y-6">
        {questions.map((question, index) => (
          <View
            key={question.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            role="article"
            aria-labelledby={`question-${question.id}-title`}
          >
            <Text
              className="font-semibold mb-2"
              id={`question-${question.id}-title`}
            >
              Question {index + 1}
            </Text>
            <Text className="text-gray-700 mb-4">
              {question.questionText}
            </Text>

            {question.audioUrl && (
              <audio
                controls
                className="w-full mb-4"
                src={question.audioUrl}
                aria-label={`Audio for question ${index + 1}`}
              >
                Your browser does not support the audio element.
              </audio>
            )}

            {question.imageUrl && (
              <img
                src={question.imageUrl}
                alt={`Visual aid for question ${index + 1}`}
                className="max-w-full h-auto rounded mb-4"
                loading="lazy"
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
