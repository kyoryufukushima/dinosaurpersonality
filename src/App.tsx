import { useState } from "react";
import { DinoBackground } from "./components/DinoBackground";
import { Landing } from "./components/Landing";
import { Quiz } from "./components/Quiz";
import { Result } from "./components/Result";
import { QUESTIONS, DINOSAUR_PROFILES } from "./constants";
import { DinosaurType, DinosaurProfile } from "./types";
import { AnimatePresence, motion } from "motion/react";

type AppState = "landing" | "quiz" | "result";

export default function App() {
  const [state, setState] = useState<AppState>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Partial<Record<DinosaurType, number>>>({});
  const [resultProfile, setResultProfile] = useState<DinosaurProfile | null>(null);

  const handleStart = () => {
    setState("quiz");
    setCurrentQuestionIndex(0);
    setScores({});
  };

  const handleAnswer = (answerScores: Partial<Record<DinosaurType, number>>) => {
    const newScores = { ...scores };
    Object.entries(answerScores).forEach(([type, score]) => {
      const dinoType = type as DinosaurType;
      newScores[dinoType] = (newScores[dinoType] || 0) + (score || 0);
    });
    setScores(newScores);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Partial<Record<DinosaurType, number>>) => {
    let maxScore = -1;
    let winningType: DinosaurType = "T-Rex";

    Object.entries(finalScores).forEach(([type, score]) => {
      if ((score || 0) > maxScore) {
        maxScore = score || 0;
        winningType = type as DinosaurType;
      }
    });

    const profile = DINOSAUR_PROFILES.find(p => p.type === winningType) || DINOSAUR_PROFILES[0];
    setResultProfile(profile);
    setState("result");
  };

  const handleReset = () => {
    setState("landing");
    setCurrentQuestionIndex(0);
    setScores({});
    setResultProfile(null);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-blue-100">
      <DinoBackground />
      
      <main className="relative z-10 min-h-screen flex items-center justify-center py-12">
        <AnimatePresence mode="wait">
          {state === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Landing onStart={handleStart} />
            </motion.div>
          )}

          {state === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Quiz 
                currentStep={currentQuestionIndex} 
                onAnswer={handleAnswer} 
              />
            </motion.div>
          )}

          {state === "result" && resultProfile && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Result profile={resultProfile} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
