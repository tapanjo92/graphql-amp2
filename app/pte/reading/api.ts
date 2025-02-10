import { generateClient } from '@aws-amplify/api';
import { Schema } from '../../../amplify/data/resource';
import { type ClientSchema } from '@aws-amplify/api/build/types';

const client = generateClient<ClientSchema<Schema>>();

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
    const result = await client.create({
      type: 'Question',
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
    const result = await client.query('Question');
    return result.data;
  } catch (error) {
    console.error('Error listing reading questions:', error);
    throw error;
  }
}

export async function getReadingQuestion(id: string) {
  try {
    const result = await client.get({
      type: 'Question',
      id
    });
    return result;
  } catch (error) {
    console.error('Error getting reading question:', error);
    throw error;
  }
}

export async function updateReadingQuestion(id: string, question: Partial<Omit<ReadingQuestion, 'id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const result = await client.update({
      type: 'Question',
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
    await client.delete({
      type: 'Question',
      id
    });
  } catch (error) {
    console.error('Error deleting reading question:', error);
    throw error;
  }
}
