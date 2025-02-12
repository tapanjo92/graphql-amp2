import { defineData } from '@aws-amplify/backend';
import { type ClientSchema, a } from '@aws-amplify/data-schema';

const schema = a.schema({
  Question: a
    .model({
      id: a.id(),
      questionText: a.string().required(),
      category: a.string().required(),
      difficulty: a.string().required(),
      options: a.array(a.string()),
      correctAnswer: a.string().required(),
      explanation: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.public()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
  },
});
