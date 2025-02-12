// amplify/data/resource.ts
import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  PTEQuestion: a.model({
    questionType: a.string().required(), // Made required
    questionText: a.string().required(), // Made required
    options: a.string().array(),
    correctAnswer: a.string(), //  Consider making this an array if multiple answers are possible
    explanation: a.string(),
    difficulty: a.enum(['Easy', 'Medium', 'Hard']),
    audioUrl: a.string(), // Added for listening questions (optional)
    imageUrl: a.string(),  // Added for image-based questions (optional)
    passageText: a.string(), // Added for reading comprehension (optional)
  })
  .authorization(allow => [
    allow.publicApiKey(), // For initial testing ONLY.  REMOVE FOR PRODUCTION!
    // More secure options (choose one or more, and configure Cognito):
    // allow.private().to(['read']), // Authenticated users can read all
    // allow.owner(),             // Users can manage their own questions
  ]),

  // You could add other models here (e.g., UserProfile, TestResult)
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',  // For use with publicApiKey
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});
