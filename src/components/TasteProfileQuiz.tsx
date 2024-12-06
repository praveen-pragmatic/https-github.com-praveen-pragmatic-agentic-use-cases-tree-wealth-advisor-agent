import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { TasteProfile, Cocktail } from '../types';
import { cocktails } from '../data/cocktails';

interface TasteProfileQuizProps {
  onComplete?: () => void;
}

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
    question: "How do you feel about sour flavors?",
    options: [
      {
        text: "Love sour! 🍋",
        value: { sour: 5, sweet: 1 }
      },
      {
        text: "Moderately sour 🌶️",
        value: { sour: 3, sweet: 2 }
      },
      {
        text: "Slightly sour 🍊",
        value: { sour: 2, sweet: 3 }
      },
      {
        text: "No sour please 🚫",
        value: { sour: 0, sweet: 4 }
      }
    ]
  },
  {
    id: 3,
    question: "How about bitter tastes?",
    options: [
      {
        text: "Love bitter flavors! ☕",
        value: { bitter: 5, strong: 3 }
      },
      {
        text: "Some bitterness is nice 🍫",
        value: { bitter: 3, strong: 2 }
      },
      {
        text: "Very little bitterness 🍯",
        value: { bitter: 1, sweet: 3 }
      },
      {
        text: "No bitter at all 🚫",
        value: { bitter: 0, sweet: 4 }
      }
    ]
  },
  {
    id: 4,
    question: "How strong do you like your drinks?",
    options: [
      {
        text: "Extra strong! 💪",
        value: { strong: 5, bitter: 2 }
      },
      {
        text: "Moderately strong 🥃",
        value: { strong: 3, bitter: 1 }
      },
      {
        text: "Light and easy 🍷",
        value: { strong: 2, sweet: 2 }
      },
      {
        text: "Very mild 🌱",
        value: { strong: 1, sweet: 3 }
      }
    ]
  },
  {
    id: 5,
    question: "What's your ideal drink style?",
    options: [
      {
        text: "Complex and bold 🌟",
        value: { strong: 4, bitter: 3 }
      },
      {
        text: "Balanced and smooth 🎭",
        value: { sweet: 3, sour: 3 }
      },
      {
        text: "Light and refreshing 🌊",
        value: { sweet: 2, sour: 2 }
      },
      {
        text: "Sweet and fruity 🍓",
        value: { sweet: 4, sour: 2 }
      }
    ]
  }
];

export function TasteProfileQuiz({ onComplete }: TasteProfileQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>({
    sweet: 0,
    sour: 0,
    bitter: 0,
    strong: 0,
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const navigate = useNavigate();
  const [user, setUser, addOrder] = useStore((state) => [
    state.user,
    state.setUser,
    state.addOrder
  ]);

  const handleOrder = (cocktail: Cocktail) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      userName: user.name,
      cocktailId: cocktail.id,
      cocktailName: cocktail.name,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    
    addOrder(order);
    navigate('/orders');
  };

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

      // Update user preferences if logged in
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
      .filter(cocktail => cocktail.available)
      .map(cocktail => {
        const matchScore = Object.entries(tasteProfile).reduce((score, [key, value]) => {
          const cocktailValue = cocktail.tasteProfile[key as keyof TasteProfile];
          const diff = Math.abs(value - cocktailValue);
          return score - diff;
        }, 20);

        return {
          ...cocktail,
          matchScore
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  if (showRecommendations) {
    const recommendations = getRecommendations();
    const hasActiveOrder = useStore((state) => 
      user ? state.hasActiveOrder(user.id) : false
    );
    
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
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-medium">
                    {Math.round((cocktail.matchScore / 20) * 100)}% Match
                  </span>
                </div>
                <button
                  onClick={() => handleOrder(cocktail)}
                  disabled={!user || hasActiveOrder}
                  className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !user || hasActiveOrder
                      ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {!user 
                    ? 'Login to Order' 
                    : hasActiveOrder 
                    ? 'Complete Current Order First'
                    : 'Order Now'}
                </button>
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