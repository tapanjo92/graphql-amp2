import { defineData } from '@aws-amplify/backend';
import { type ClientSchema } from '@aws-amplify/client-data';
import { a } from '@aws-amplify/data-schema';

export const data = defineData({
  schema: a.schema({
    Question: a.model({
      id: a.id(),
      questionText: a.string().required(),
      category: a.string().required(),
      difficulty: a.string().required(),
      options: a.list(a.string()),  // Changed from array to list
      correctAnswer: a.string().required(),
      explanation: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    }).authorization([
      // Fixed authorization syntax
      a.allow.public('read'),
      a.allow.owner(['create', 'update', 'delete', 'read'])
    ])
  }),
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey'
  }
});
