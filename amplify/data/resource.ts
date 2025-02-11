import { defineData, type ClientSchema } from "@aws-amplify/backend";

export const data = defineData({
  schema: {
    Todo: {
      primaryIndex: { partitionKey: 'id' },
      attributes: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        priority: {
          type: 'string',
        },
      },
    },
  },
});
