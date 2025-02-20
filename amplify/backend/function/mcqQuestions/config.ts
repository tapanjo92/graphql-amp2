import { defineFunction } from '@aws-amplify/backend';
import { Permissions } from '@aws-amplify/backend-permissions';

export const mcqQuestions = defineFunction({
  name: 'mcqQuestions',
  handler: 'src/index.handler',
  runtime: 'nodejs18.x',
  memory: 1024,
  timeout: 10,
  permissions: [
    // Grant permissions to access DynamoDB
    Permissions.invoke('DataApi')
  ]
});
