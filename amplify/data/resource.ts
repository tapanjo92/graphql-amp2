import { defineData, Schema } from '@aws-amplify/backend';

const schema = {
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
} as const;

export type Schema = Schema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
