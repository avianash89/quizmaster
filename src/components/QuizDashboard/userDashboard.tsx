import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ModernUserDashboard() {
  const [dashboardData, setDashboardData] = useState<any>({
    totalQuiz: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    accuracy: 0,
    passedQuiz: 0,
    failedQuiz: 0,
    timeSpend: 0,
    dayWiseAttempts: [],
  });

  const [selectedRange, setSelectedRange] = useState("1day");
  const [isLoading, setIsLoading] = useState(false);

  const rangeToDays: any = {
    "1day": 1,
    "1week": 7,
    "1month": 30,
    "3month": 90,
    "6month": 180,
  };

  const rangeOptions = [
    { ui: "1 Day", value: "1day" },
    { ui: "1 Week", value: "1week" },
    { ui: "1 Month", value: "1month" },
    { ui: "3 Months", value: "3month" },
    { ui: "6 Months", value: "6month" },
  ];

  // Fetch Dashboard Handler
  const fetchDashboard = async () => {
    try {
      setIsLoading(true);

      const daysRange = rangeToDays[selectedRange];

      const response = await fetch("http://54.82.74.201:8000/get_user_dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "FrontendTestUser",
          dashboardPeriod: daysRange,
        }),
      });

      const data = await response.json();

      if (data) setDashboardData(data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data whenever range changes
  useEffect(() => {
    fetchDashboard();
  }, [selectedRange]);

  return (
    <div className="min-h-screen mt-3 px-7 py-10 text-white bg-[#0F172A]">
      {/* Range Filter */}
      <div className="flex gap-3 mt-6">
        {rangeOptions.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelectedRange(item.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all 
              ${
                selectedRange === item.value
                  ? "bg-blue-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            {item.ui}
          </button>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-10 text-center text-lg font-semibold animate-pulse text-blue-400">
          Fetching updated dashboard data...
        </div>
      )}

      {/* Dashboard Content */}
      {!isLoading && dashboardData && (
        <>
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <Card title="Total Quiz Attempted" value={dashboardData.totalQuiz} />
            <Card title="Correct Answers" value={dashboardData.correctAnswers} />
            <Card title="Wrong Answers" value={dashboardData.wrongAnswers} />
            <Card title="Accuracy" value={`${dashboardData.accuracy}%`} />
            <Card title="Passed Quiz" value={dashboardData.passedQuiz} />
            <Card title="Failed Quiz" value={dashboardData.failedQuiz} />
            <Card
              title="Total Time Spent"
              value={`${Math.floor(dashboardData.timeSpend / 3600)}h ${Math.floor(
                (dashboardData.timeSpend % 3600) / 60
              )}m`}
            />
          </div>

          {/* Graph */}
          <div className="mt-12 p-6 bg-gray-800 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Day-wise Quiz Attempted
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.dayWiseAttempts || []}>
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="quizzes"
                  stroke="#60A5FA"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

// Card Component
function Card({ title, value }: any) {
  return (
    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg">
      <h3 className="text-md text-gray-300">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function ModernUserDashboard() {
//   const [dashboardData, setDashboardData] = useState<any>({
//     totalQuiz: 0,
//     correctAnswers: 0,
//     wrongAnswers: 0,
//     accuracy: 0,
//     passedQuiz: 0,
//     failedQuiz: 0,
//     timeSpend: 0,
//     dayWiseAttempts: [],
//   });

//   const [selectedRange, setSelectedRange] = useState("1day");

//   const rangeToDays: any = {
//     "1day": 1,
//     "1week": 7,
//     "1month": 30,
//     "3month": 90,
//     "6month": 180,
//   };

//   const rangeOptions = [
//     { ui: "1 Day", value: "1day" },
//     { ui: "1 Week", value: "1week" },
//     { ui: "1 Month", value: "1month" },
//     { ui: "3 Months", value: "3month" },
//     { ui: "6 Months", value: "6month" },
//   ];

//   const fetchDashboard = async () => {
//     try {
//       const daysRange = rangeToDays[selectedRange];

//       const response = await fetch(
//         "http://54.226.6.151:8000/get_user_dashboard",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: "FrontendTestUser",
//             dashboardPeriod: daysRange,
//           }),
//         }
//       );

//       const data = await response.json();

//       // Update state only if valid response
//       if (data) setDashboardData(data);
//     } catch (err) {
//       console.error("Error fetching dashboard:", err);
//       // Do not hide UI, fallback values already set
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, [selectedRange]);

//   return (
//     <div className="min-h-screen mt-10 bg-gray-50 p-6 text-gray-900">
//       {/* Filters */}
//       <div className="bg-white shadow rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
//         <span className="font-semibold">Select Range:</span>

//         <div className="flex gap-3 flex-wrap">
//           {rangeOptions.map((range) => (
//             <button
//               key={range.value}
//               onClick={() => setSelectedRange(range.value)}
//               className={`px-4 py-1 rounded-full border ${
//                 selectedRange === range.value
//                   ? "bg-black text-white"
//                   : "hover:bg-gray-100"
//               }`}>
//               {range.ui}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <StatCard title="Total Quiz Attempted" value={dashboardData.totalQuiz} />
//         <StatCard title="Correct Answers" value={dashboardData.correctAnswers} />
//         <StatCard title="Wrong Answers" value={dashboardData.wrongAnswers} />
//         <StatCard title="Accuracy" value={`${dashboardData.accuracy}%`} />
//         <StatCard title="Passed Quiz" value={dashboardData.passedQuiz} />
//         <StatCard title="Failed Quiz" value={dashboardData.failedQuiz} />
//         <StatCard
//           title="Total Time Spent"
//           value={`${Math.floor(dashboardData.timeSpend / 3600)}h ${Math.floor(
//             (dashboardData.timeSpend % 3600) / 60
//           )}m`}
//         />
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <h3 className="text-xl font-semibold mb-4">Day Wise Quiz Attempts</h3>

//         <div className="h-72">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={dashboardData.dayWiseAttempts || []}>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="quizzes" stroke="#ef4444" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Card Component
// function StatCard({ title, value }: { title: string; value: any }) {
//   return (
//     <div className="p-6 bg-white rounded-xl shadow text-center">
//       <p className="text-gray-500">{title}</p>
//       <h2 className="text-3xl font-bold">{value}</h2>
//     </div>
//   );
// }

