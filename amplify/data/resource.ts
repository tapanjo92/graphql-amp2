import { defineData } from '@aws-amplify/backend';

export const data = defineData({
  schema: {
    Post: {
      primaryIndex: { partitionKey: 'id' },
      attributes: {
        id: {
          type: 'string',
          required: true
        },
        title: {
          type: 'string',
          required: true
        },
        content: {
          type: 'string',
          required: true
        },
        createdAt: {
          type: 'datetime'
        },
        updatedAt: {
          type: 'datetime'
        }
      }
    },
    Comment: {
      primaryIndex: { partitionKey: 'id' },
      attributes: {
        id: {
          type: 'string',
          required: true
        },
        post: {
          type: 'string',
          required: true
        },
        author: {
          type: 'string',
          required: true
        },
        content: {
          type: 'string',
          required: true
        },
        createdAt: {
          type: 'datetime'
        },
        updatedAt: {
          type: 'datetime'
        }
      }
    },
    Question: {
      primaryIndex: { partitionKey: 'id' },
      attributes: {
        id: {
          type: 'string',
          required: true
        },
        title: {
          type: 'string',
          required: true
        },
        passage: {
          type: 'string',
          required: true
        },
        options: {
          type: 'array',
          items: {
            type: 'string'
          },
          required: true
        },
        correctAnswer: {
          type: 'string',
          required: true
        },
        explanation: {
          type: 'string',
          required: true
        },
        difficulty: {
          type: 'string',
          required: true,
          validators: [
            {
              type: 'oneOf',
              values: ['EASY', 'MEDIUM', 'HARD']
            }
          ]
        },
        createdAt: {
          type: 'datetime'
        },
        updatedAt: {
          type: 'datetime'
        }
      }
    }
  }
});
