import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Result() {
  const location = useLocation();
  const {
    score,
    quizStartTime,
    endTime,
    timeTaken,
    questionCount,
    correctAnswers,
    wrongAnswers,
    questions,         // 👈 make sure you pass from navigate
    selectedOptions,   // 👈 make sure you pass from navigate
  } = location.state || {};

  const formattedStartTime = quizStartTime
    ? new Date(quizStartTime).toLocaleTimeString()
    : "N/A";

  const formattedEndTime = endTime
    ? new Date(endTime).toLocaleTimeString()
    : "N/A";

  const formattedTimeTaken = timeTaken
    ? `${Math.floor(timeTaken / 60)} min ${Math.round(timeTaken % 60)} sec`
    : "N/A";

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="w-full max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-indigo-600">
            Quiz Result
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Here is a summary of your performance
          </p>

          {/* Score Summary */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-indigo-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">Score</h2>
              <p className="text-3xl font-bold text-indigo-600 mt-1">
                {score}
              </p>
            </div>

            <div className="p-5 bg-green-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">Correct Answers</h2>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {correctAnswers} / {questionCount}
              </p>
            </div>

            <div className="p-5 bg-yellow-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">Start Time</h2>
              <p className="text-xl font-medium text-yellow-600 mt-1">
                {formattedStartTime}
              </p>
            </div>

            <div className="p-5 bg-red-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">End Time</h2>
              <p className="text-xl font-medium text-red-600 mt-1">
                {formattedEndTime}
              </p>
            </div>

            <div className="p-5 bg-blue-50 rounded-xl shadow-sm sm:col-span-2">
              <h2 className="text-lg font-semibold text-gray-700">Time Taken</h2>
              <p className="text-xl font-medium text-blue-600 mt-1">
                {formattedTimeTaken}
              </p>
            </div>
          </div>

          {/* ------------------------
                 DETAILED REVIEW 
             ------------------------ */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">
            Detailed Answer Review
          </h2>

          <div className="space-y-6">

            {questions?.map((q, index) => {
              const userAnswer = selectedOptions[index];
              const correctAnswer = q.answer;
              const isCorrect = userAnswer === correctAnswer;

              return (
                <div key={index} className="p-5 bg-gray-50 rounded-xl shadow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {index + 1}. {q.question}
                  </h3>

                  {/* User Answer */}
                  <p className="mt-2 text-md">
                    <span className="font-semibold">Your Answer: </span>
                    <span className={isCorrect ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                      {userAnswer || "Not answered"}
                    </span>
                  </p>

                  {/* Correct Answer */}
                  {!isCorrect && (
                    <p className="mt-1 text-md">
                      <span className="font-semibold">Correct Answer: </span>
                      <span className="text-green-600 font-bold">{correctAnswer}</span>
                    </p>
                  )}
                </div>
              );
            })}

          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md text-lg font-semibold"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
