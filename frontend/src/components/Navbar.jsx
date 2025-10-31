import React from 'react'

function Navbar() {
  return (
    <>
      <nav className="bg-gray-500 h-[50px] w-full flex items-center justify-between px-6 text-white fixed top-0 left-0 shadow-none border-none">
        <h1 className="text-lg font-semibold m-0 p-0">Student Management</h1>
        <ul className='flex gap-10 text-xl justify-between items-center'>
          <li>Home</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
