import type { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "It's been a long day at work. What's your go-to snack?",
    options: [
      {
        text: "A bar of dark chocolate 🍫",
        value: { bitter: 2, sweet: 1 }
      },
      {
        text: "Sour candy 🍬",
        value: { sour: 2, sweet: 1 }
      },
      {
        text: "Something sweet and creamy 🍦",
        value: { sweet: 2 }
      },
      {
        text: "Black coffee ☕",
        value: { bitter: 2, strong: 1 }
      }
    ]
  },
  {
    id: 2,
    question: "You're a superhero! What's your superpower?",
    options: [
      {
        text: "Super strength 💪",
        value: { strong: 2 }
      },
      {
        text: "Sweet talking charm ✨",
        value: { sweet: 2 }
      },
      {
        text: "Acid breath 🔥",
        value: { sour: 2, bitter: 1 }
      },
      {
        text: "Bitter revenge served cold ❄️",
        value: { bitter: 2, strong: 1 }
      }
    ]
  },
  {
    id: 3,
    question: "What's your ideal vacation?",
    options: [
      {
        text: "Mountain climbing expedition 🏔️",
        value: { strong: 2, bitter: 1 }
      },
      {
        text: "Relaxing on a tropical beach 🏖️",
        value: { sweet: 2, sour: 1 }
      },
      {
        text: "Adventure sports 🏄‍♂️",
        value: { strong: 2, sour: 1 }
      },
      {
        text: "Luxury spa retreat 🧖‍♀️",
        value: { sweet: 2 }
      }
    ]
  },
  {
    id: 4,
    question: "Pick your spirit animal:",
    options: [
      {
        text: "Lion 🦁",
        value: { strong: 2, bitter: 1 }
      },
      {
        text: "Hummingbird 🐦",
        value: { sweet: 2 }
      },
      {
        text: "Snake 🐍",
        value: { sour: 2, bitter: 1 }
      },
      {
        text: "Bear 🐻",
        value: { strong: 2, sweet: 1 }
      }
    ]
  },
  {
    id: 5,
    question: "What's your favorite season?",
    options: [
      {
        text: "Summer - bring on the heat! ☀️",
        value: { strong: 2, sour: 1 }
      },
      {
        text: "Spring - sweet and fresh 🌸",
        value: { sweet: 2, sour: 1 }
      },
      {
        text: "Autumn - crisp and bold 🍂",
        value: { bitter: 2 }
      },
      {
        text: "Winter - intense and cool ❄️",
        value: { strong: 2, bitter: 1 }
      }
    ]
  }
];