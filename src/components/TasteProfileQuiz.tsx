import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quizQuestions';
import type { TasteProfile } from '../types';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export function TasteProfileQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>({
    sweet: 0,
    sour: 0,
    bitter: 0,
    strong: 0,
  });
  
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
      
      navigate('/menu');
    }
  };

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