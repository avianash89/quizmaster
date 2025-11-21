import React from "react";
import { useAuth } from "../context/AuthProvider";

export default function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    setAuthUser(null);  // clears from state & localStorage
  };

  return (
    <button
      className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
