import { type ClientSchema, defineData, Schema } from '@aws-amplify/backend';

const schema = {
  Question: {
    primaryIndex: { partitionKey: 'id' },
    attributes: {
      id: {
        type: 'string',
      },
      questionText: {
        type: 'string',
        required: true,
      },
      category: {
        type: 'string',
        required: true,
      },
      difficulty: {
        type: 'string',
        required: true,
      },
      options: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      correctAnswer: {
        type: 'string',
        required: true,
      },
      explanation: {
        type: 'string',
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
} satisfies Schema;

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  timestamps: true,
});
