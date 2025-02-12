import { defineData, Schema } from "@aws-amplify/backend";
import { a } from "@aws-amplify/data-schema";

export const data = defineData({
  schema: a.schema({
    Question: a.model({
      id: a.id(),
      questionText: a.string().required(),
      category: a.string().required(),
      difficulty: a.string().required(),
      options: a.list(a.string()),
      correctAnswer: a.string().required(),
      explanation: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    }).authorization([
      a.public().authorize([a.read]),
      a.owner().authorize([a.create, a.update, a.delete, a.read])
    ])
  })
});
