import { defineData, Schema } from '@aws-amplify/backend';

export const data = defineData({
  schema: {
    Comment: Schema.model({
      primaryIndex: Schema.primaryIndex('id'),
      attributes: {
        id: Schema.id(),
        post: Schema.string({ required: true }),
        author: Schema.string({ required: true }),
        content: Schema.string({ required: true }),
        createdAt: Schema.isoDateTime(),
        updatedAt: Schema.isoDateTime()
      }
    }),
    Post: Schema.model({
      primaryIndex: Schema.primaryIndex('id'),
      attributes: {
        id: Schema.id(),
        title: Schema.string({ required: true }),
        content: Schema.string({ required: true }),
        createdAt: Schema.isoDateTime(),
        updatedAt: Schema.isoDateTime()
      }
    }),
    Question: Schema.model({
      primaryIndex: Schema.primaryIndex('id'),
      attributes: {
        id: Schema.id(),
        title: Schema.string({ required: true }),
        passage: Schema.string({ required: true }),
        options: Schema.array(Schema.string(), { required: true }),
        correctAnswer: Schema.string({ required: true }),
        explanation: Schema.string({ required: true }),
        difficulty: Schema.string({ 
          required: true,
          validator: Schema.validateString().oneOf(['EASY', 'MEDIUM', 'HARD'])
        }),
        createdAt: Schema.isoDateTime(),
        updatedAt: Schema.isoDateTime()
      }
    })
  }
});
