import { useState } from "react";

type AnswerOption = {
  answerText: string;
  isCorrect: boolean;
};

type Question = {
  questionText: string;
  answerOptions: AnswerOption[];
};

const questions: Question[] = [
  {
    questionText: "What is the capital of India?",
    answerOptions: [
      { answerText: "New Delhi", isCorrect: true },
      { answerText: "Mumbai", isCorrect: false },
      { answerText: "Chennai", isCorrect: false },
      { answerText: "Kolkata", isCorrect: false },
    ],
  },
  {
    questionText: "Who is the CEO of Tesla?",
    answerOptions: [
      { answerText: "Jeff Bezos", isCorrect: false },
      { answerText: "Elon Musk", isCorrect: true },
      { answerText: "Bill Gates", isCorrect: false },
      { answerText: "Tony Stark", isCorrect: false },
    ],
  },
  {
    questionText: "The iPhone was created by which company?",
    answerOptions: [
      { answerText: "Apple", isCorrect: true },
      { answerText: "Intel", isCorrect: false },
      { answerText: "Amazon", isCorrect: false },
      { answerText: "Microsoft", isCorrect: false },
    ],
  },
  {
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "4", isCorrect: false },
      { answerText: "6", isCorrect: false },
      { answerText: "7", isCorrect: true },
      { answerText: "8", isCorrect: false },
    ],
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // handle answer click
  const handleAnswer = (isCorrect: boolean, index: number) => {
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  //  next button
  const next = () => {
    if (currentQuestion + 1 === questions.length) {
      setShowResult(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  //  restart button
  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  //  progress percentage
  const progress = ((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 min-h-[90vh] flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-96 min-h-96 max-w-md w-full">
        <p className="font-black text-2xl">Quiz-App</p>
        <hr className="text-black mt-2" />

        {/* ✅ Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
            <span>
              Question {currentQuestion + 1} / {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-violet-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {!showResult ? (
          <>
            {/* Question */}
            <div className="question mt-4">
              <p className="text-black font-semibold">
                Q{currentQuestion + 1}.{" "}
                {questions[currentQuestion].questionText}
              </p>
            </div>

            {/* Options */}
            <div className="btns">
              {questions[currentQuestion].answerOptions.map(
                (option, index) => {
                  let btnClass =
                    "text-start mt-4 w-full border p-2 rounded-lg m-2 transition duration-300 ease-in-out ";
                  if (selectedAnswer !== null) {
                    if (index === selectedAnswer) {
                      btnClass += option.isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white";
                    } else if (option.isCorrect) {
                      btnClass += "bg-green-500 text-white";
                    } else {
                      btnClass += "bg-gray-200";
                    }
                  } else {
                    btnClass +=
                      "hover:bg-black hover:text-white cursor-pointer";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.isCorrect, index)}
                      disabled={selectedAnswer !== null}
                      className={btnClass}
                    >
                      {option.answerText}
                    </button>
                  );
                }
              )}
            </div>

            {/* Next button */}
            <div className="flex justify-center items-center">
              <button
                className="mt-4 p-2 w-50 rounded-lg m-2 border bg-white text-black hover:bg-violet-600 hover:text-white transition duration-300 ease-in-out"
                onClick={next}
                disabled={selectedAnswer === null}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div>
            <div className="text-center mt-6">
              <h2 className="text-xl font-bold text-black">Quiz Finished!</h2>
              <p className="text-black">
                Your Score: {score}/{questions.length}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="mt-4 p-2 w-50 rounded-lg m-2 border-2 bg-white text-black hover:bg-violet-600 hover:text-white transition duration-300 ease-in-out"
                onClick={restart}
              >
                Restart Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
