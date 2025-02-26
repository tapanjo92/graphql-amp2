"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { 
  View, 
  Heading, 
  Text, 
  Loader, 
  RadioGroupField, 
  Radio, 
  Button,
  Alert
} from "@aws-amplify/ui-react";

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

export default function MCQSingleAnswerPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await client.mutations.listPTEQuestions({
          limit: "5",
          questionType: "MCQ-S"  // Specifying the question type for MCQ Single answer
        });

        if (!response.data?.items) {
          throw new Error("No questions data received from Lambda");
        }

        // Parse the JSON string containing the questions
        const parsedItems = JSON.parse(response.data.items) as Question[];
        
        // Filter for MCQ-S type questions if the Lambda didn't already filter them
        const mcqsQuestions = parsedItems.filter(q => q.questionType === "MCQ-S");
        
        if (mcqsQuestions.length === 0) {
          throw new Error("No MCQ-S questions available");
        }
        
        setQuestions(mcqsQuestions);
      } catch (err) {
        console.error("Error fetching MCQ-S questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQ = questions[currentQuestion];
    const isAnswerCorrect = selectedAnswer === currentQ.correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowResult(false);
    }
  };

  if (loading) {
    return (
      <View className="flex justify-center items-center min-h-[300px]">
        <Loader size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-6 max-w-4xl mx-auto">
        <Alert variation="error" heading="Error">
          {error}
        </Alert>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View className="p-6 max-w-4xl mx-auto">
        <Alert variation="warning" heading="No Questions Available">
          There are currently no MCQ-S questions available. Please try again later.
        </Alert>
      </View>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <View className="p-6 max-w-4xl mx-auto">
      <Heading level={2} className="text-2xl font-bold mb-6">
        Multiple Choice: Choose Single Answer
      </Heading>

      <View className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Progress indicator */}
        <Text className="text-gray-600 mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </Text>

        {/* Question text */}
        <View className="mb-8">
          {currentQ.passageText && (
            <View className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
              <Text className="text-gray-800">{currentQ.passageText}</Text>
            </View>
          )}
          
          <Text className="text-lg font-medium mb-2">
            {currentQ.questionText}
          </Text>

          {currentQ.imageUrl && (
            <img
              src={currentQ.imageUrl}
              alt="Question image"
              className="max-w-full h-auto rounded my-4"
              loading="lazy"
            />
          )}
        </View>

        {/* Answer options */}
        <RadioGroupField
          label="Select the correct answer:"
          name="answer"
          value={selectedAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="mb-6"
        >
          {currentQ.options?.map((option, idx) => (
            <Radio
              key={idx}
              value={option}
              className={`p-3 border rounded-md mb-2 block ${
                showResult && option === currentQ.correctAnswer 
                  ? "border-green-500 bg-green-50" 
                  : showResult && option === selectedAnswer && option !== currentQ.correctAnswer 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300"
              }`}
              disabled={showResult}
            >
              {option}
            </Radio>
          ))}
        </RadioGroupField>

        {/* Results */}
        {showResult && (
          <View className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <Heading level={5} className={`text-lg font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {isCorrect ? "Correct!" : "Incorrect"}
            </Heading>
            
            {!isCorrect && (
              <Text className="mt-2 text-gray-700">
                The correct answer is: <span className="font-medium">{currentQ.correctAnswer}</span>
              </Text>
            )}
            
            {currentQ.explanation && (
              <Text className="mt-2 text-gray-700">
                <span className="font-medium">Explanation:</span> {currentQ.explanation}
              </Text>
            )}
          </View>
        )}

        {/* Action buttons */}
        <View className="flex justify-between">
          {!showResult ? (
            <Button
              variation="primary"
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              variation="primary"
              onClick={handleNextQuestion}
              disabled={currentQuestion >= questions.length - 1}
            >
              Next Question
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}
