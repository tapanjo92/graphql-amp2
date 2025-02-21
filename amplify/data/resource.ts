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

// Define the function - Correct runtime
const getQuestionsResolver = defineFunction({
  name: 'getQuestionsResolver',
  runtime: 'nodejs20.x',
  handler: 'index.handler',
  entry: './functions/getQuestionsResolver.ts'
});

// Attach the resolver - *Correctly* this time!
schema.query('listPTEQuestions', {
  handler: getQuestionsResolver,
  returns: schema.PTEQuestion.list()
});

export type Schema = ClientSchema<typeof schema>;

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
