import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:5000/api/auth/forgot-password", {
        username: data.username,
      })
      .then(() => toast.success("OTP sent to email"))
      .catch(() => toast.error("Failed to send OTP"));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 border rounded-lg shadow-md w-[400px] relative">

        {/* ❌ Visible X button inside the box */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl"
          onClick={() => {
            navigate("/"); // go back home
            setTimeout(() => {
              document.getElementById("my_modal_3").showModal(); // open login modal
            }, 100);
          }}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 mt-6">Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Enter username"
            className="w-full px-3 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 w-full"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
