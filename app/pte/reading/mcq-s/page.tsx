"use client";

import React, { useState, useEffect } from "react";
// Import API and graphqlOperation from the modular API package
import { API, graphqlOperation } from "@aws-amplify/api";
import { Card, Heading, Text, Flex } from "@aws-amplify/ui-react";

// A simple custom Spinner component using TailwindCSS
const Spinner: React.FC = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

// Define a type for PTEQuestion (as per our GraphQL schema)
type PTEQuestion = {
  id: string;
  questionType: string;
  questionText: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  audioUrl?: string;
  imageUrl?: string;
  passageText?: string;
};

// Define a type for the GraphQL response
type ListPTEQuestionsResponse = {
  listPTEQuestions: {
    items: any; // items may be an array or a JSON string
    nextToken: string | null;
  };
};

// GraphQL mutation for fetching questions
const listPTEQuestionsMutation = /* GraphQL */ `
  mutation ListPTEQuestions(
    $limit: String
    $nextToken: String
    $questionType: String
    $difficulty: String
    $sortBy: String
    $sortOrder: String
  ) {
    listPTEQuestions(
      limit: $limit
      nextToken: $nextToken
      questionType: $questionType
      difficulty: $difficulty
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      items
      nextToken
    }
  }
`;

const MCQSPage: React.FC = () => {
  const [questions, setQuestions] = useState<PTEQuestion[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch questions using the GraphQL API
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const variables = {
        limit: "5", // Default limit as string per backend schema
        nextToken: nextToken,
        // Additional filtering/sorting variables can be added here
      };

      const response = (await API.graphql(
        graphqlOperation(listPTEQuestionsMutation, variables)
      )) as { data: ListPTEQuestionsResponse };

      let items = response.data.listPTEQuestions.items;
      // If items are returned as a JSON string, parse them
      if (typeof items === "string") {
        items = JSON.parse(items);
      }

      // Append new items if already loaded
      setQuestions((prev) => [...prev, ...items]);
      setNextToken(response.data.listPTEQuestions.nextToken);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && questions.length === 0) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" className="min-h-screen">
        <Text color="red">{error}</Text>
      </Flex>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Heading level={2} className="mb-4">
        Multiple Choice Questions
      </Heading>
      <Flex direction="column" gap="medium">
        {questions.map((q) => (
          <Card key={q.id} padding="medium" className="mb-4">
            <Heading level={4}>{q.questionText}</Heading>
            <Text className="text-gray-700">Type: {q.questionType}</Text>
            <Text className="text-gray-600">Difficulty: {q.difficulty}</Text>
            {q.options && q.options.length > 0 && (
              <ul className="list-disc pl-5">
                {q.options.map((option, idx) => (
                  <li key={idx}>
                    <Text>{option}</Text>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </Flex>
      {nextToken && (
        <Flex justifyContent="center" className="mt-8">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={fetchQuestions}
          >
            Load More
          </button>
        </Flex>
      )}
    </div>
  );
};

export default MCQSPage;

