import { a, defineData, defineFunction, type ClientSchema } from '@aws-amplify/backend';
import { type AppSyncResolverHandler } from 'aws-lambda'; // Import for type safety

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

// Define the function *before* using it
const getQuestionsResolver = defineFunction({
    name: 'getQuestionsResolver', // Give the *function* a name
    handler: 'getQuestionsResolver.handler', // Correct handler path
});
//Define a resolver and attach it to the listPTEQuestions field.
a.resolver(schema.PTEQuestion.list, getQuestionsResolver);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 }
    },
    functions: {
        getQuestionsResolver // Register the function with defineData
    }
});
