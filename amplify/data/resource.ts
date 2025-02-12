import { defineData } from '@aws-amplify/backend';
import { type Schema } from '@aws-amplify/data-schema';

const schema = {
  models: {
    Note: {
      primaryKey: {
        fieldName: 'id',
        type: 'ID',
      },
      fields: {
        id: { type: 'ID', required: true },
        content: { type: 'String', required: true },
        createdAt: { type: 'AWSDateTime', required: true },
        updatedAt: { type: 'AWSDateTime', required: true }
      }
    }
  }
} satisfies Schema;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});
