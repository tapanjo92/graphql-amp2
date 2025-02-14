// add_questions.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

// Questions data
const questions = [
  {
    questionType: "Reading",
    questionText:
      "The process of photosynthesis occurs in which part of a plant cell?",
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
  const tableName = process.env.AMPLIFY_DYNAMODB_TABLE;
  const client = DynamoDBDocument.from(
    new DynamoDBClient({
      region: process.env.AWS_REGION,
    })
  );

  for (const question of questions) {
    const item = {
      __typename: "PTEQuestion",
      id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...question,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await client.put({
      TableName: tableName,
      Item: item,
    });
  }

  console.log("Successfully completed adding all questions");
}

// Execute if this file is run directly
if (require.main === module) {
  addQuestions()
    .then(() => {
      console.log("Script execution completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Script execution failed:", error); // Simplified error message
      process.exit(1);
    });
}

module.exports = { addQuestions };
