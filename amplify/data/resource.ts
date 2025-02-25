// amplify/data/resource.ts
// Make sure your schema includes the listPTEQuestions mutation:

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

// Define a custom type that wraps a list of PTEQuestion as a JSON string.
const PTEQuestionsResponse = a.customType({
  items: a.string(),   // Contains JSON.stringify(listOfQuestions)
  nextToken: a.string() // Pagination token (if any)
});

// Define your data model.
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
    allow.publicApiKey()
  ]),

  // Define a custom mutation that returns our custom type.
  listPTEQuestions: a.mutation()
    .arguments({
      limit: a.string(),
      nextToken: a.string(),
      questionType: a.string(),
      difficulty: a.enum(['Easy', 'Medium', 'Hard']),
      sortBy: a.string(),
      sortOrder: a.string(),
    })
    .returns(PTEQuestionsResponse)
    .authorization(allow => [
      allow.publicApiKey()
    ])
    .handler(a.handler.function(getQuestionsResolver))
});

// Export the client schema type and backend configuration.
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
