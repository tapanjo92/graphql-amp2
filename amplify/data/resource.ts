import { defineData } from '@aws-amplify/backend';
import { a } from '@aws-amplify/data-schema';

export const data = defineData({
  schema: a.schema({
    Question: a.model({
      id: a.id(),
      questionText: a.string().required(),
      category: a.string().required(),
      difficulty: a.string().required(),
      options: a.list(a.string()),
      correctAnswer: a.string().required(),
      explanation: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    }).authorization([
      a.allow.public().to(['read']),
      a.allow.owner().to(['create', 'update', 'delete', 'read'])
    ])
  }),
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey'
  }
});
