import { defineData, Schema } from "@aws-amplify/backend";

export const data = defineData({
  models: {
    Todo: {
      fields: {
        id: { type: Schema.ID, isRequired: true },
        name: { type: Schema.String, isRequired: true },
        description: { type: Schema.String },
        completed: { type: Schema.Boolean, isRequired: true }
      }
    }
  }
});
