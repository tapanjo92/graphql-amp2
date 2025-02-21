import { a, defineData, defineFunction, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  PTEQuestion: a.model({
    questionType: a.string().required(),
    questionText: a.string().required(),
    options: a.string().array(),
    correctAnswer: a.string(),
    explanation: a.string(),
    difficulty: a.enum(['Easy', 'Medium', 'Hard']),
    audioUrl: a.string(),
    imageUrl: a.string(),
    passageText: a.string(),
  })
  .authorization(allow => [
    allow.publicApiKey(), // For initial testing ONLY. REMOVE FOR PRODUCTION!
  ])
});

// Update the getQuestionsResolver by setting a runtime string directly.
const getQuestionsResolver = defineFunction({
  name: 'getQuestionsResolver',
  runtime: 'nodejs20.x',
  entry: './functions/getQuestionsResolver.ts',
});

// Use the new override syntax via the models property.
schema.models.PTEQuestion.override({
  list: { resolver: getQuestionsResolver }
});

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
  functions: {
    getQuestionsResolver // Correct function registration
  }
});
