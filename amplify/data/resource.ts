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

// Define the function with the correct structure
const getQuestionsResolver = defineFunction({
    name: 'getQuestionsResolver',
    runtime: "nodejs20.x", // Specify the runtime correctly
    entry: './functions/getQuestionsResolver.ts', // Path to the resolver file
});

// Attach the resolver using override.
schema.resources.PTEQuestion.models.list.override(getQuestionsResolver);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 }
    },
    functions: {
        getQuestionsResolver: getQuestionsResolver // Use the function name as the key
    }
});
