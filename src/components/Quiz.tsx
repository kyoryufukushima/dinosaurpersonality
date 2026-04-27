import { motion, AnimatePresence } from "motion/react";
import { QUESTIONS } from "../constants";
import { DinosaurType } from "../types";
import { ChevronRight } from "lucide-react";

interface QuizProps {
  currentStep: number;
  onAnswer: (scores: Partial<Record<DinosaurType, number>>) => void;
}

export function Quiz({ currentStep, onAnswer }: QuizProps) {
  const question = QUESTIONS[currentStep];
  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-12">
      <div className="mb-8 flex justify-center">
        <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
          Q. {currentStep + 1} / {QUESTIONS.length}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 bg-white/95 backdrop-blur-xl p-10 rounded-[2.5rem] border border-blue-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]"
        >
          <div className="space-y-4">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              {question.text}
            </h2>
          </div>

          <div className="grid gap-4">
            {question.answers.map((answer, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onAnswer(answer.scores)}
                className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all group shadow-sm"
              >
                <span className="text-lg font-medium text-slate-600 group-hover:text-blue-700">
                  {answer.text}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
