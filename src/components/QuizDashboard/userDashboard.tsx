import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IconUserCircle } from "@tabler/icons-react";

const data = [
  { day: "Mon", quizzes: 2 },
  { day: "Tue", quizzes: 3 },
  { day: "Wed", quizzes: 1 },
  { day: "Thu", quizzes: 4 },
  { day: "Fri", quizzes: 2 },
  { day: "Sat", quizzes: 5 },
  { day: "Sun", quizzes: 3 },
];

export default function ModernUserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 p-4 bg-white shadow rounded-xl">
        <h1 className="text-2xl font-bold">📊 Quiz Dashboard</h1>
        <div className="flex items-center gap-4">
          <IconUserCircle size={40} className="text-gray-700" />

          <button className="bg-pink-500 text-white px-4 py-1 rounded-lg text-sm">
            Logout
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <span className="font-semibold">Select Range:</span>
        <div className="flex gap-3 flex-wrap">
          {["1 Day", "1 Week", "1 Month", "3 Months", "6 Months"].map(
            (range) => (
              <button
                key={range}
                className="px-4 py-1 rounded-full border hover:bg-gray-100">
                {range}
              </button>
            )
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card */}
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Total Quiz Attempted</p>
          <h2 className="text-3xl font-bold">42</h2>
        </div>

        <div className="p-6 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Correct Answers</p>
          <h2 className="text-3xl font-bold">320</h2>
        </div>

        <div className="p-6 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Wrong Answers</p>
          <h2 className="text-3xl font-bold">80</h2>
        </div>

        <div className="p-6 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Accuracy</p>
          <h2 className="text-3xl font-bold">80%</h2>
        </div>

        <div className="p-6 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Highest Score</p>
          <h2 className="text-3xl font-bold">98%</h2>
        </div>

        <div className="p-6 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Total Time Spent</p>
          <h2 className="text-3xl font-bold">2h 14m</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Day Wise Quiz Attempts</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="quizzes"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
