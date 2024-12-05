"use client";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

// Gen2 client generation
const client = generateClient<Schema>();

// Example component using the data
export default function ReadingQuestions() {
  async function addQuestion() {
    try {
      const newQuestion = await client.models.ReadingPte.create({
        title: "Reading Test 1",
        passage: "Sample passage content...",
        question: "What is the main idea?",
        correctAnswer: "The correct answer",
        options: ["Option A", "Option B", "Option C", "Option D"],
        difficulty: "MEDIUM",
        type: "multiple-choice",
        timeLimit: 20,
        score: 5,
        explanation: "Explanation for the answer..."
      });
      console.log('Created:', newQuestion);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function listQuestions() {
    try {
      const { data: questions } = await client.models.ReadingPte.list();
      console.log('Questions:', questions);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={listQuestions}>List Questions</button>
    </div>
  );
}