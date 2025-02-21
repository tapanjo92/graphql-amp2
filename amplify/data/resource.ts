import {
  type ClientSchema,
  a,
  defineData,
  defineFunction
} from '@aws-amplify/backend';

// Define the function using the correct property for the handler code.
// Use "entry" instead of "code". (Omit "runtime" if it causes type errors.)
const getQuestionsResolver = defineFunction({
  entry: './functions/getQuestionsResolver.ts'
});

// Define the data model schema.
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
  }).authorization(allow => [
    // For initial testing only; remove for production.
    allow.publicApiKey()
  ]),

  // Define a custom mutation named "listPTEQuestions".
  // (You could also use a.query() if it’s a read-only operation.)
  listPTEQuestions: a.mutation()
    // No arguments are needed here.
    .arguments({})
    // Use a.array() to specify an array return type.
    .returns(a.array(a.ref('PTEQuestion')))
    .authorization(allow => [
      allow.publicApiKey()
    ])
    .handler(a.handler.function(getQuestionsResolver))
});

// Export the client schema type and data configuration.
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

