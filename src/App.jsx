import React from "react";
import Home from "./home/Home_1";
import Contact from "./components/Contact";
import About from "./components/About";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quizly from "./upload/UploadQuiz.jsx";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Result from "./components/Result/Result";
import Question from "./components/QuestionDisplay/question";
import UserDashBoard from "./components/QuizDashboard/userDashboard.tsx";
import Navbar from "./components/Navbar.jsx";
import Forgot from "./components/Password/ForgotPassword.jsx";
import VerifyEmail from "./components/Password/VerifyEmail.jsx";


function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route
            path="/upload"
            element={authUser ? <Upload /> : <Navigate to="/signup" />}
          /> */}
          <Route path="/" element={<Quizly />} />
          <Route path="/dashboard" element={<UserDashBoard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/result" element={<Result />} />
          <Route path="/question" element={<Question />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
