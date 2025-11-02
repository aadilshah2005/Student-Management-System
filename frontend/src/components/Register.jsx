import React from 'react'
import api from '../api/axios'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Register() {
    const [user, setUser] = useState({username: "", email: "", password: "", role: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault(); // form ko reload hone se rokta hai
    try {
        const res = await api.post("/auth/register", user);
        toast.success(res.data.message);
        console.log(res.data);
        navigate("/login");
    } catch (err) {
        console.error(err.response?.data);
        alert(err.response?.data?.message || "Registration failed");
    }
    };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-[500px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signup</h2>

    <form className="space-y-4 " onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter your name..."
          className="w-full border-b-2 border-gray-300 focus:border-purple-600 outline-none py-2"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>

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
      <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              className="w-full border-b-2 border-gray-300 focus:border-purple-600 outline-none py-2"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="" disabled>Select role...</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

      <button
        type="submit"
        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
      >
        Signup
      </button>
    </form>

    <p className="text-center text-sm text-gray-600 mt-4">
      Already have an account?
      <Link to="/login" className="text-purple-700 font-semibold hover:underline">Login</Link>
    </p>
  </div>
</div>

  )
}

export default Register