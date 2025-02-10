import { Schema } from '@aws-amplify/backend';

// Define the Reading Question schema
export const readingQuestionSchema = {
  Question: {
    model: {
      primaryKey: {
        partitionKey: 'id',
      },
      attributes: {
        id: {
          type: 'string',
          required: true,
        },
        title: {
          type: 'string',
          required: true,
        },
        passage: {
          type: 'string',
          required: true,
        },
        options: {
          type: ['string'],
          required: true,
        },
        correctAnswer: {
          type: 'string',
          required: true,
        },
        explanation: {
          type: 'string',
          required: true,
        },
        difficulty: {
          type: 'string',
          required: true,
          validators: [
            {
              type: 'enumeration',
              values: ['EASY', 'MEDIUM', 'HARD'],
            },
          ],
        },
        createdAt: {
          type: 'datetime',
          isCreatedAt: true,
        },
        updatedAt: {
          type: 'datetime',
          isUpdatedAt: true,
        },
      },
    },
    mutations: {
      create: true,
      update: true,
      delete: true,
    },
    queries: {
      list: true,
      get: true,
    },
  },
} as const;

// Export the schema configuration
export const schema = {
  version: 1,
  models: readingQuestionSchema,
} satisfies Schema;
