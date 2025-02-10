import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

export interface ReadingQuestion {
  id: string;
  title: string;
  passage: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  createdAt: string;
  updatedAt: string;
}

export async function createReadingQuestion(question: Omit<ReadingQuestion, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const result = await client.models.Question.create({
      ...question,
    });
    return result;
  } catch (error) {
    console.error('Error creating reading question:', error);
    throw error;
  }
}

export async function listReadingQuestions() {
  try {
    const questions = await client.models.Question.list();
    return questions;
  } catch (error) {
    console.error('Error listing reading questions:', error);
    throw error;
  }
}

export async function getReadingQuestion(id: string) {
  try {
    const question = await client.models.Question.get({ id });
    return question;
  } catch (error) {
    console.error('Error getting reading question:', error);
    throw error;
  }
}

export async function updateReadingQuestion(id: string, question: Partial<Omit<ReadingQuestion, 'id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const result = await client.models.Question.update({
      id,
      ...question,
    });
    return result;
  } catch (error) {
    console.error('Error updating reading question:', error);
    throw error;
  }
}

export async function deleteReadingQuestion(id: string) {
  try {
    await client.models.Question.delete({ id });
  } catch (error) {
    console.error('Error deleting reading question:', error);
    throw error;
  }
}
