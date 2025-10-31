import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentDashbord from "./Dashbord/StudentDashbord";
import AdminDashbord from './Dashbord/AdminDashbord'
import TeacherDashboard from "./Dashbord/TeacherDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",               
    element: <div>
        <Navbar />
        <Register />
        <Footer />
    </div>
    
  },
  {
    path: "/login",          
    element: <div>
        <Navbar />
        <Login />
        <Footer />
    </div>
  },
  {
    path: "/student/dashboard",          
    element: <div>
        <Navbar />
        <StudentDashbord />,
        <Footer />
    </div>
  },
  {
    path: "/admin/dashboard",          
    element: <div>
        <Navbar />
        <AdminDashbord/>
        <Footer />
    </div>

  },
  {
    path: "/teacher/dashboard",          
    element: <div>
        <Navbar />
        <TeacherDashboard/>
        <Footer />
    </div>
  },
]);

function App() {
  return (
    <>
    
    <RouterProvider router={router} />
    </>
  );
}

export default App;
