"use client";

import { useState, useEffect } from "react";
import { View, Heading, Text, Loader, Button, Radio, RadioGroupField } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";

interface MCQQuestion {
  id: string;
  questionText: string;
  passageText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function MCQSinglePage() {
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // Get the current auth session to include in API call
      const { tokens } = await fetchAuthSession();
      const idToken = tokens.idToken?.toString();

      // Call the Lambda function through API Gateway
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mcq-questions`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setShowResults(false);
    fetchQuestions();
  };

  if (loading) {
    return (
      <View className="flex justify-center items-center min-h-screen">
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
    <View className="max-w-4xl mx-auto p-6">
      <Heading level={1} className="text-2xl font-bold mb-6">
        Multiple Choice Questions - Single Answer
      </Heading>

      {questions.map((question, index) => (
        <View
          key={question.id}
          className="mb-8 p-6 bg-white rounded-lg shadow"
        >
          <Text className="font-semibold mb-4">Question {index + 1}</Text>
          
          {/* Passage Text */}
          <View className="mb-4 p-4 bg-gray-50 rounded">
            <Text className="text-gray-700">{question.passageText}</Text>
          </View>

          {/* Question Text */}
          <Text className="mb-4">{question.questionText}</Text>

          {/* Radio Group for Options */}
          <RadioGroupField
            label="Select your answer"
            name={`question-${question.id}`}
            value={selectedAnswers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          >
            {question.options.map((option, optIndex) => (
              <Radio
                key={optIndex}
                value={option}
                disabled={showResults}
                className="mb-2"
              >
                {option}
              </Radio>
            ))}
          </RadioGroupField>

          {/* Show Results */}
          {showResults && (
            <View className="mt-4 p-4 rounded">
              <Text className={selectedAnswers[question.id] === question.correctAnswer 
                ? "text-green-600" 
                : "text-red-600"
              }>
                {selectedAnswers[question.id] === question.correctAnswer 
                  ? "✓ Correct!" 
                  : `✗ Incorrect. The correct answer is: ${question.correctAnswer}`
                }
              </Text>
              <Text className="mt-2 text-gray-600">{question.explanation}</Text>
            </View>
          )}
        </View>
      ))}

      <View className="flex justify-center gap-4 mt-8">
        {!showResults ? (
          <Button
            variation="primary"
            onClick={handleSubmit}
            isDisabled={Object.keys(selectedAnswers).length !== questions.length}
            className="px-6 py-2"
          >
            Submit Answers
          </Button>
        ) : (
          <Button
            variation="primary"
            onClick={handleTryAgain}
            className="px-6 py-2"
          >
            Try New Questions
          </Button>
        )}
      </View>
    </View>
  );
}
