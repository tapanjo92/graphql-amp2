export const schema = {
  version: 1,
  models: {
    Comment: {
      model: {
        primaryKey: {
          partitionKey: 'id',
        },
      },
      fields: {
        id: {
          type: 'string',
        },
        post: {
          type: 'string',
          isRequired: true,
        },
        author: {
          type: 'string',
          isRequired: true,
        },
        content: {
          type: 'string',
          isRequired: true,
        },
        createdAt: {
          type: 'datetime',
          isCreatedAt: true,
        },
        updatedAt: {
          type: 'datetime',
          isUpdatedAt: true,
        },
      },
    },
    Post: {
      model: {
        primaryKey: {
          partitionKey: 'id',
        },
      },
      fields: {
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
          isRequired: true,
        },
        content: {
          type: 'string',
          isRequired: true,
        },
        createdAt: {
          type: 'datetime',
          isCreatedAt: true,
        },
        updatedAt: {
          type: 'datetime',
          isUpdatedAt: true,
        },
      },
    },
    Question: {
      model: {
        primaryKey: {
          partitionKey: 'id',
        },
      },
      fields: {
        id: {
          type: 'string',
          required: true,
        },
        title: {
          type: 'string',
          required: true,
        },
        passage: {
          type: 'string',
          required: true,
        },
        options: {
          type: ['string'],
          required: true,
        },
        correctAnswer: {
          type: 'string',
          required: true,
        },
        explanation: {
          type: 'string',
          required: true,
        },
        difficulty: {
          type: 'string',
          required: true,
          validators: [
            {
              type: 'enumeration',
              values: ['EASY', 'MEDIUM', 'HARD'],
            },
          ],
        },
        createdAt: {
          type: 'datetime',
          isCreatedAt: true,
        },
        updatedAt: {
          type: 'datetime',
          isUpdatedAt: true,
        },
      },
    },
  },
} as const;
