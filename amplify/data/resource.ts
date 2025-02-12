import { defineData } from "@aws-amplify/backend";
import { type Schema } from '@aws-amplify/data-construct';
import { a } from "@aws-amplify/data-schema";

export const data = defineData({
  schema: a.schema({
    Question: a.model({
      id: a.id(),
      questionText: a.string().required(),
      category: a.string().required(),
      difficulty: a.string().required(),
      options: a.array(a.string()),
      correctAnswer: a.string().required(),
      explanation: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    }).authorization([
      a.allow.public().to(['read']),
      a.allow.owner().to(['create', 'update', 'delete', 'read']),
    ]),
  }),
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});
