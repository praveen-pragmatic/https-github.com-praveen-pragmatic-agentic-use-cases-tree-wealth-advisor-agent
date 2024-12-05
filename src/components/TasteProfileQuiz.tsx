import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { TasteProfile } from '../types';
import { cocktails } from '../data/cocktails';

const quizQuestions = [
  {
    id: 1,
    question: "What's your preferred level of sweetness?",
    options: [
      {
        text: "Very sweet 🍯",
        value: { sweet: 5, sour: 1 }
      },
      {
        text: "Moderately sweet 🍬",
        value: { sweet: 3, sour: 2 }
      },
      {
        text: "Barely sweet 🍋",
        value: { sweet: 1, sour: 3 }
      },
      {
        text: "Not sweet at all ❌",
        value: { sweet: 0, sour: 4 }
      }
    ]
  },
  {
    id: 2,
    question: "How do you feel about strong drinks?",
    options: [
      {
        text: "The stronger the better 💪",
        value: { strong: 5, bitter: 3 }
      },
      {
        text: "Moderately strong 🥃",
        value: { strong: 3, bitter: 2 }
      },
      {
        text: "Mild strength 🍸",
        value: { strong: 2, bitter: 1 }
      },
      {
        text: "Light and refreshing 🌿",
        value: { strong: 1, sweet: 2 }
      }
    ]
  },
  {
    id: 3,
    question: "Do you enjoy bitter flavors?",
    options: [
      {
        text: "Love bitter tastes ☕",
        value: { bitter: 5, sweet: 1 }
      },
      {
        text: "Some bitterness is nice 🍫",
        value: { bitter: 3, sweet: 2 }
      },
      {
        text: "Very little bitterness 🍊",
        value: { bitter: 1, sweet: 3 }
      },
      {
        text: "No bitterness please 🚫",
        value: { bitter: 0, sweet: 4 }
      }
    ]
  },
  {
    id: 4,
    question: "How about sour or citrusy flavors?",
    options: [
      {
        text: "Love sour and citrusy 🍋",
        value: { sour: 5, sweet: 1 }
      },
      {
        text: "Moderately sour 🍊",
        value: { sour: 3, sweet: 2 }
      },
      {
        text: "Slightly sour 🍐",
        value: { sour: 2, sweet: 3 }
      },
      {
        text: "No sour please 🚫",
        value: { sour: 0, sweet: 4 }
      }
    ]
  }
];

export function TasteProfileQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>({
    sweet: 0,
    sour: 0,
    bitter: 0,
    strong: 0,
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

  const handleAnswer = (values: Partial<TasteProfile>) => {
    const updatedProfile = { ...tasteProfile };
    Object.entries(values).forEach(([key, value]) => {
      updatedProfile[key as keyof TasteProfile] += value;
    });
    setTasteProfile(updatedProfile);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Normalize values to be between 0 and 5
      const maxValue = Math.max(...Object.values(updatedProfile));
      const normalizedProfile = Object.entries(updatedProfile).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: Math.round((value / maxValue) * 5),
        }),
        {} as TasteProfile
      );

      // Update user preferences
      if (user) {
        setUser({
          ...user,
          preferences: {
            ...user.preferences,
            tasteProfile: normalizedProfile,
          },
        });
      }
      
      setTasteProfile(normalizedProfile);
      setShowRecommendations(true);
    }
  };

  const getRecommendations = () => {
    return cocktails
      .map(cocktail => {
        const matchScore = Object.entries(tasteProfile).reduce((score, [key, value]) => {
          const cocktailValue = cocktail.tasteProfile[key as keyof TasteProfile];
          const diff = Math.abs(value - cocktailValue);
          return score - diff;
        }, 20); // Start with max score and subtract differences

        return {
          ...cocktail,
          matchScore
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3); // Get top 3 recommendations
  };

  if (showRecommendations) {
    const recommendations = getRecommendations();
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Your Perfect Matches!
          </h3>
          <p className="text-gray-600 mb-8">
            Based on your taste profile, here are your top cocktail recommendations:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((cocktail, index) => (
            <motion.div
              key={cocktail.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={cocktail.imageUrl}
                alt={cocktail.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">{cocktail.name}</h4>
              <p className="text-gray-600 mb-4">{cocktail.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-medium">
                  {Math.round((cocktail.matchScore / 20) * 100)}% Match
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/menu')}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
          >
            View Full Menu
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-full mx-1 rounded-full ${
                index <= currentQuestion
                  ? 'bg-purple-600'
                  : 'bg-purple-100'
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left bg-white rounded-lg shadow-sm border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}