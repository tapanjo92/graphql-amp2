import { defineData } from '@aws-amplify/backend';

export const data = defineData({
  schema: ({ id, string }) => ({
    // Example model definition
    Todo: {
      primaryIndex: { partitionKey: id('id') },
      fields: {
        id: id(),
        name: string(),
      }
    }
  })
});
