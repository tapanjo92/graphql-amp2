import { a, defineData, defineFunction, type ClientSchema } from '@aws-amplify/backend';

// Define the function first before using it in the schema
const getQuestionsResolver = defineFunction({
  name: 'getQuestionsResolver',
  runtime: a.FunctionRuntime.NODE_20, // Correct runtime syntax
  handler: 'index.handler',
  entry: './functions/getQuestionsResolver.ts'
});

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
  ]),
});

// Add the query separately using the correct Gen 2 syntax
schema.query('listPTEQuestions', (q) => 
  q.resolver(getQuestionsResolver)
   .returns(a.array(a.ref('PTEQuestion')))
);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
  functions: {
    getQuestionsResolver
  }
});

