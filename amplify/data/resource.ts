import { defineData, type DataSchemaInput } from '@aws-amplify/backend';

const schema: DataSchemaInput = {
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
        },
        createdAt: {
          type: 'string',
          required: true,
        },
        updatedAt: {
          type: 'string',
          required: true,
        },
      },
    },
  },
};

export type Schema = typeof schema;
export const data = defineData(schema);
