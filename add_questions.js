// add_questions.js
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { checkAwsSetup } = require('./check_dynamodb_access');

// Questions data
const questions = [
  {
    questionType: "Reading",
    questionText: "The process of photosynthesis occurs in which part of a plant cell?",
    options: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
    correctAnswer: "Chloroplast",
    difficulty: "Medium",
  },
  {
    questionType: "Reading",
    questionText: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
    difficulty: "Easy",
  },
  {
    questionType: "Reading",
    questionText: "Which of the following is NOT a primary color?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: "Green",
    difficulty: "Easy",
  },
  {
    questionType: "Reading",
    questionText: "A group of wolves is called a:",
    options: ["Herd", "Flock", "Pack", "School"],
    correctAnswer: "Pack",
    difficulty: "Medium",
  },
  {
    questionType: "Reading",
    questionText: "Which gas is most abundant in Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Nitrogen",
    difficulty: "Easy",
  },
];

// Validate AWS configuration
async function validateAwsConfig(client) {
  console.log('Validating AWS configuration...');
  try {
    await client.send(new ListTablesCommand({}));
    console.log('Successfully connected to DynamoDB');
  } catch (error) {
    console.error('Failed to connect to DynamoDB:', error.message);
    throw new Error('AWS configuration validation failed - check your credentials and permissions');
  }
}

async function addQuestions() {
  console.log('Starting to add questions to DynamoDB...');

  // Validate environment variables
  if (!process.env.AWS_REGION) {
    throw new Error('AWS_REGION environment variable is not set');
  }
  console.log(`Using AWS Region: ${process.env.AWS_REGION}`);

  const tableName = process.env.AMPLIFY_DYNAMODB_TABLE;
  if (!tableName) {
    throw new Error('AMPLIFY_DYNAMODB_TABLE environment variable is not set');
  }
  console.log(`Using DynamoDB table: ${tableName}`);

  // Initialize DynamoDB client
  console.log('Initializing DynamoDB client...');
  const client = DynamoDBDocument.from(new DynamoDBClient({
    region: process.env.AWS_REGION
  }));

  // Validate AWS configuration
  await validateAwsConfig(client);

  // Add each question
  console.log(`Adding ${questions.length} questions to DynamoDB...`);
  for (const question of questions) {
    try {
      const item = {
        __typename: "PTEQuestion",
        id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...question,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const params = {
        TableName: tableName,
        Item: item
      };

      console.log(`Adding question: "${question.questionText.substring(0, 30)}..."`);
      await client.put(params);
      console.log(`Successfully added question: ${item.id}`);
    } catch (error) {
      console.error("\n❌ Error adding question:", error.message);
      console.error("Question details:", JSON.stringify(question, null, 2));
      console.error("\nDiagnostic information:");
      console.error("- Table:", tableName);
      console.error("- Region:", process.env.AWS_REGION);
      console.error("- Error type:", error.name);
      throw error; // Stop execution on first error
    }
  }

  console.log('Successfully completed adding all questions');
}

// Execute if this file is run directly
if (require.main === module) {
  // First run diagnostics
  checkAwsSetup()
    .then(success => {
      if (!success) {
        console.error('AWS setup validation failed. Please run ./diagnose.sh for more details');
        process.exit(1);
      }
      console.log('\nAWS configuration validated successfully, proceeding to add questions...\n');
      return addQuestions();
    })
    .then(() => {
      console.log('Script execution completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Script execution failed:', error.message);
      console.error('\nFor detailed diagnostics, run: ./diagnose.sh');
      process.exit(1);
    });
}

module.exports = { addQuestions };
