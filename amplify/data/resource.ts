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

// Define the function *before* using it, with the correct structure
const getQuestionsResolver = defineFunction({
  name: 'getQuestionsResolver',
  runtime: a.runtime.NODEJS_20_X, // Specify the runtime
  entry: './functions/getQuestionsResolver.ts', // Path to the resolver file
});

// Attach the resolver to the listPTEQuestions *field*
schema.PTEQuestion.fields.list.resolve(getQuestionsResolver.name)

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
    functions: [getQuestionsResolver] //Add function in to function array.
});
