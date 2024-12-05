import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Your existing Todo model
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Fixed ReadingPte model
  ReadingPte: a
    .model({
      title: a.string(),
      passage: a.string(),
      question: a.string(),
      correctAnswer: a.string(),
      options: a.string().array(),  // Changed to use string().array()
      difficulty: a.enum(['EASY', 'MEDIUM', 'HARD']),
      type: a.string(),
      timeLimit: a.integer(),
      score: a.integer(),
      explanation: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

