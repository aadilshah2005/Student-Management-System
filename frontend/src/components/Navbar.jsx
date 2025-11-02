import React, { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-500 h-[50px] w-full flex items-center justify-between px-6 text-white fixed top-0 left-0 shadow-none border-none z-50">
        <h1 className="text-lg font-semibold m-0 p-0">
          Student Management
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg justify-between items-center">
          <li className="cursor-pointer hover:text-gray-200">Home</li>
          <li className="cursor-pointer hover:text-gray-200">About</li>
          <li className="cursor-pointer hover:text-gray-200">Contact Us</li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none text-2xl"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="bg-gray-600 md:hidden mt-[50px] flex flex-col items-center gap-4 py-4 text-white text-lg">
          <li className="cursor-pointer hover:text-gray-300 list-none">Home</li>
          <li className="cursor-pointer hover:text-gray-300 list-none">About</li>
          <li className="cursor-pointer hover:text-gray-300 list-none">Contact Us</li>
        </div>
      )}
    </>
  );
}

export default Navbar;
