import { defineData } from '@aws-amplify/backend';

const models = {
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
};

const schema = {
  version: 1,
  models,
};

export const data = defineData(schema);
