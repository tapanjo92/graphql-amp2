"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { View, Heading, Text, Loader } from "@aws-amplify/ui-react";

// Optional: Define the Question type if needed (ensure this matches your DynamoDB schema)
interface Question {
  id: string;
  question: string;
  audio_url?: string;
  image_url?: string;
  correct_answer: string;
  category: string;
  question_type: string;
}

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const client = generateClient<Schema>();

  useEffect(() => {
    const fetchQuestions = async (): Promise<void> => {
      try {
        const response = await client.models.PTEQuestion.list();
        // Shuffle and select only 5 random questions
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, 5);
        setQuestions(selectedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [client]);

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
            <Text className="font-semibold mb-2" id={`question-${question.id}-title`}>
              Question {index + 1}
            </Text>
            <Text className="text-gray-700 mb-4">{question.question}</Text>
            {question.audio_url && (
              <audio
                controls
                className="w-full mb-4"
                src={question.audio_url}
                aria-label={`Audio for question ${index + 1}`}
              >
                Your browser does not support the audio element.
              </audio>
            )}
            {question.image_url && (
              <img
                src={question.image_url}
                alt={`Visual aid for question ${index + 1}`}
                className="max-w-full h-auto rounded mb-4"
                loading="lazy"
              />
            )}
            {/* Additional details such as options or explanation can be added here */}
          </View>
        ))}
      </View>
    </View>
  );
}
