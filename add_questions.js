// add_questions.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

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

async function addQuestions() {
  // Initialize DynamoDB client
  const client = DynamoDBDocument.from(new DynamoDBClient({
    region: process.env.AWS_REGION
  }));

  // Get table name from environment variable
  const tableName = process.env.AMPLIFY_DYNAMODB_TABLE;
  
  if (!tableName) {
    throw new Error('AMPLIFY_DYNAMODB_TABLE environment variable is not set');
  }

  console.log(`Using table: ${tableName}`);

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

      await client.put(params);
      console.log(`Successfully added question: ${item.id}`);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }
}

// Only run if this is being executed directly
if (require.main === module) {
  addQuestions()
    .then(() => {
      console.log("All questions have been processed");
      process.exit(0);
    })
    .catch(err => {
      console.error("Fatal error:", err);
      process.exit(1);
    });
}

