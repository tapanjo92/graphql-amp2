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

// Define the function - Correct runtime specification
const getQuestionsResolver = defineFunction({
  name: 'getQuestionsResolver',
  runtime: a.runtime.NODEJS_20_X, // Correct at last!
  entry: './functions/getQuestionsResolver.ts',
});

// Attach the resolver - Correct method and arguments
schema.PTEQuestion.override('list', { resolver: getQuestionsResolver });

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
  functions: {
    getQuestionsResolver: getQuestionsResolver, // Correct function registration
  }
});
