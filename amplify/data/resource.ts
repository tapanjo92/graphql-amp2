import {
  type ClientSchema,
  a,
  defineData,
  defineFunction
} from '@aws-amplify/backend';

// Define a Lambda function using defineFunction without passing an extraneous "name" property.
// Use the numeric Node.js version (e.g. 20 for Node 20) as per Amplify Gen2 docs.
const getQuestionsResolver = defineFunction({
  // Specify the runtime as a number (e.g. 20 for Node 20)
  runtime: 20,
  // Use code.path (not entry) to point to the function code
  code: {
    path: './functions/getQuestionsResolver.ts'
  }
});

// Define your data model schema for the "PTEQuestion" model.
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
    // Note: Use publicApiKey for testing ONLY. Remove in production!
    allow.publicApiKey(),
  ]),
});

// Instead of using a non-existent "mutation" method on schema, define the custom mutation via operations.
// The custom mutation "listPTEQuestions" uses our previously defined function.
schema.operation('listPTEQuestions', operation =>
  operation
    .custom()
    .function(getQuestionsResolver)
    .returns(a.list(a.ref('PTEQuestion')))
);

// Export the client schema type and data definition.
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
  functions: {
    getQuestionsResolver,
  },
});

