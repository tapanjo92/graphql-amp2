// add_questions.js
const { generateClient } = require("aws-amplify/data");
// Change this line:
const { Schema } = require("./amplify/build/models");// Path to your resource.ts

const client = generateClient({
    authMode: "apiKey"
});

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
      const { data, errors } = await client.models.PTEQuestion.create(question);

      if (errors) {
        console.error("Error creating question:", errors);
      } else {
        console.log("Question created successfully:", data);
      }
    } catch (error) {
      console.error("Caught error:", error);
    }
  }
}

addQuestions();
