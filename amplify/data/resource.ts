import {
  type ClientSchema,
  a,
  defineData,
  defineFunction
} from '@aws-amplify/backend';

// Define the resolver function using the "entry" property.
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
    // For testing purposes only; remove before production.
    allow.publicApiKey()
  ]),

  // Define a custom mutation "listPTEQuestions" that returns an array of PTEQuestion.
  listPTEQuestions: a.mutation()
    .arguments({})
    // Use a.array() to return an array type.
    .returns(a.array(a.ref('PTEQuestion')))
    .authorization(allow => [
      allow.publicApiKey()
    ])
    .handler(a.handler.function(getQuestionsResolver))
});

// Export the client schema type and backend definition.
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

