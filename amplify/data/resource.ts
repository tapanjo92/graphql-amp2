import { defineData } from "@aws-amplify/backend";

export const data = defineData({
  schema: {
    Note: {
      primaryIndex: { partitionKey: 'id' },
      fields: {
        id: 'string',
        title: 'string',
        content: 'string',
        owner: 'string'
      }
    }
  }
});
