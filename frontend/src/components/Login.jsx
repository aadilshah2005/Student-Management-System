import React from 'react'
import api from "../api/axios";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function Login() {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", user, { withCredentials: true });
      toast.success(res.data.message);
      console.log("Login Response:", res.data);

      const role = res.data.user.role; // ensure backend se role aa raha ho
      if (role === "student") {
        navigate("/student/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/"); 
      }
      
    } catch (err) {
      console.error(err.response?.data);
      navigate("/"); 
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-[500px] ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signin</h2>

        <form className="space-y-4"onSubmit={handleSubmit}>
        <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
            type="email"
            placeholder="Enter your email..."
            className="w-full border-b-2 border-gray-300 focus:border-purple-600 outline-none py-2"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
        </div>
        <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
            type="password"
            placeholder="Enter your password..."
            className="w-full border-b-2 border-gray-300 focus:border-purple-600 outline-none py-2"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
        </div>
      <button
        type="submit"
        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition"
      >
        Signin 
      </button>
    </form>
    <p className="text-center text-sm text-gray-600 mt-4">
      Already have an account?
      <Link to="/" className="text-purple-700 font-semibold hover:underline">Signup</Link>
    </p>
  </div>
</div>
   <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Login