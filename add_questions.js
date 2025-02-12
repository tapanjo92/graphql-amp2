// add_questions.js
const { generateClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { Schema } = require("./amplify/data/resource");

// Get environment variables that Amplify automatically sets during build
const { AWS_REGION, AMPLIFY_TABLE_NAME } = process.env;

// Create DynamoDB client
const client = new DynamoDBDocument(new generateClient({ region: AWS_REGION }));

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
  for (const question of questions) {
    try {
      const params = {
        TableName: AMPLIFY_TABLE_NAME,
        Item: {
          __typename: "PTEQuestion",
          id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
          ...question,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };

      await client.put(params);
      console.log("Question added successfully:", params.Item);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }
}

// Only run if this is being executed directly
if (require.main === module) {
  addQuestions()
    .then(() => console.log("All questions processing complete"))
    .catch(err => console.error("Fatal error:", err));
}

