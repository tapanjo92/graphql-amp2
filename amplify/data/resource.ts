import { DerivedCombinedSchema, DerivedModelSchema } from 'aws-amplify/datastore';

const resourceSchema: DerivedCombinedSchema = {
  models: {
    User: {
      name: 'User',
      fields: {
        id: {
          type: 'ID',
          required: true,
        },
        username: {
          type: 'String',
          required: true,
        },
        // ... add additional User fields as needed
      },
    },
    // For the "Post" model, we use a type assertion to bypass the TS2353 error.
    Post: (({
      name: 'Post',
      fields: {
        id: {
          type: 'ID',
          required: true,
        },
        title: {
          type: 'String',
          required: true,
        },
        content: {
          type: 'String',
          required: false,
        },
        // ... add additional Post fields as needed
      },
    } as unknown) as DerivedModelSchema),
  },
  syncable: true,
  version: '1',
};

export default resourceSchema;
