import { useState } from 'react';
import { HelpCircle, Check, X, RotateCcw, Award } from 'lucide-react';
import { triviaQuestions } from '../data';

export const InteractiveTrivia = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = triviaQuestions[currentStep];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
    setIsAnswerSubmitted(true);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < triviaQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="trivia" className="py-20 border-t border-stone-200 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#831859]" />
            <span>Interactive Mini-Quiz</span>
          </div>
          <h2
            id="trivia-section-heading"
            className="text-3xl font-serif font-bold text-stone-900 tracking-tight mb-2"
          >
            How Well Do You Know Yahaira?
          </h2>
          <p className="text-stone-600 text-sm">
            Test your knowledge of Yahaira's creative projects, themes, and web experiences.
          </p>
        </div>

        {/* Trivia Container */}
        <div
          id="interactive-trivia-box"
          className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-[#f7a6df]/40 shadow-sm"
        >
          {!isCompleted ? (
            <div>
              {/* Progress indicator */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-4">
                <span>
                  Question {currentStep + 1} of {triviaQuestions.length}
                </span>
                <span>Current Score: {score}</span>
              </div>

              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-[#f7a6df] h-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + (isAnswerSubmitted ? 1 : 0)) / triviaQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Question */}
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-6">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optionStyle =
                    'bg-white border-stone-200 text-stone-800 hover:border-[#f7a6df] hover:bg-[#ffdef5]/40';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isChosen && !isCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                    } else {
                      optionStyle = 'bg-white border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`trivia-option-${currentStep}-${idx}`}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerSubmitted && (
                        <span>
                          {isCorrect && (
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          )}
                          {isChosen && !isCorrect && (
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-[#ffdef5]/70 border border-[#f7a6df]/70 mb-6 animate-in fade-in">
                  <p className="text-xs text-[#831859] leading-relaxed font-medium">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                {isAnswerSubmitted && (
                  <button
                    id="trivia-next-question-btn"
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#f7a6df] hover:bg-[#f28ecc] border border-[#f7a6df] text-stone-900 text-xs font-semibold transition-colors shadow-2xs"
                  >
                    {currentStep < triviaQuestions.length - 1 ? 'Next Question' : 'View Results'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#ffdef5] border-2 border-[#f7a6df] text-[#831859] flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1">
                  Quiz Completed!
                </h3>
                <p className="text-stone-600 text-sm">
                  You scored <span className="font-bold text-stone-900">{score}</span> out of{' '}
                  <span className="font-bold text-stone-900">{triviaQuestions.length}</span>!
                </p>
              </div>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                {score === triviaQuestions.length
                  ? "Perfect score! You're an expert on Yahaira's creative journey and projects!"
                  : "Great job! Yahaira loves creating interactive web projects, training Jiu Jitsu, and designing crochet plushies."}
              </p>

              <div className="pt-3">
                <button
                  id="trivia-restart-quiz-btn"
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-[#f7a6df] hover:bg-[#f28ecc] border border-[#f7a6df] text-stone-900 text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
