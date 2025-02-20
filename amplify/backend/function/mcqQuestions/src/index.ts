import { type ClientSchema, generateClient } from '@aws-amplify/data';
import { type Handler } from 'aws-lambda';

// Generate the API client for our backend
const client = generateClient();

export const handler: Handler = async (event) => {
  try {
    // Get questions from DynamoDB using Amplify Gen2 Data client
    const response = await client.models.PTEQuestion.list();
    
    // Shuffle and get 5 random questions
    const shuffled = response.data.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 5);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(selectedQuestions)
    };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({ message: 'Error fetching questions' })
    };
  }
};
