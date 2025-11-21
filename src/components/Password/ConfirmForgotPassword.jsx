import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function ConfirmForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await axios.post("http://localhost:5000/api/auth/confirm-forgot-password", {
      username: data.username,
      confirmation_code: data.code,
      new_password: data.password
    })
      .then(() => toast.success("Password reset successfully"))
      .catch(() => toast.error("Password reset failed"));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 border rounded-lg shadow-md w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter username"
          />

          <label className="mt-3 block">OTP Code</label>
          <input
            type="text"
            {...register("code", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter OTP"
          />

          <label className="mt-3 block">New Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter new password"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 w-full"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmForgotPassword;
