import { defineData, type Schema } from '@aws-amplify/backend';

export const schema = {
  Comment: {
    model: {
      primaryKey: {
        id: 'id',
      },
    },
    fields: {
      id: {
        type: 'ID',
      },
      post: {
        type: 'ID',
        isRequired: true,
      },
      author: {
        type: 'ID',
        isRequired: true,
      },
      content: {
        type: 'String',
        isRequired: true,
      },
      createdAt: {
        type: 'AWSDateTime',
        isRequired: true,
      },
      updatedAt: {
        type: 'AWSDateTime',
        isRequired: true,
      },
    },
  },
  Post: {
    model: {
      primaryKey: {
        id: 'id',
      },
    },
    fields: {
      id: {
        type: 'ID',
      },
      author: {
        type: 'ID',
        isRequired: true,
      },
      title: {
        type: 'String',
        isRequired: true,
      },
      content: {
        type: 'String',
        isRequired: true,
      },
      createdAt: {
        type: 'AWSDateTime',
        isRequired: true,
      },
      updatedAt: {
        type: 'AWSDateTime',
        isRequired: true,
      },
    },
  },
} as const;

export type Schema = typeof schema;
export const data = defineData(schema);
