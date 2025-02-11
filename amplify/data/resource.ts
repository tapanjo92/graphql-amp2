import { defineData, Schema } from '@aws-amplify/backend';

const schema = {
  models: {
    Todo: {
      fields: {
        id: {
          type: 'ID',
          isRequired: true,
        },
        name: {
          type: 'String',
          isRequired: true,
        },
        description: {
          type: 'String',
        },
        completed: {
          type: 'Boolean',
          isRequired: true,
        },
      },
    },
  },
} as Schema;

export default defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
