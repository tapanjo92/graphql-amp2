import {
  type ClientSchema,
  a,
  defineData,
  defineFunction
} from '@aws-amplify/backend';

// Define the function using "entry" to point to the handler file.
const getQuestionsResolver = defineFunction({
  entry: './functions/getQuestionsResolver.ts'
});

// Define the data model schema.
const schema = a.schema({
  PTEQuestion: a.model({
    questionType: a.string().required(),
    questionText: a.string().required(),
    // Field definition: a.string().array() is valid on model fields.
    options: a.string().array(),
    correctAnswer: a.string(),
    explanation: a.string(),
    difficulty: a.enum(['Easy', 'Medium', 'Hard']),
    audioUrl: a.string(),
    imageUrl: a.string(),
    passageText: a.string(),
  }).authorization(allow => [
    // For initial testing only. Remove in production.
    allow.publicApiKey()
  ]),

  // Define a custom mutation "listPTEQuestions" that returns an array of PTEQuestion.
  listPTEQuestions: a.mutation()
    .arguments({})
    .returns(a.list(a.ref('PTEQuestion')))
    .authorization(allow => [
      allow.publicApiKey()
    ])
    .handler(a.handler.function(getQuestionsResolver))
});

// Export the client schema type and backend data configuration.
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
  functions: {
    getQuestionsResolver,
  },
});

