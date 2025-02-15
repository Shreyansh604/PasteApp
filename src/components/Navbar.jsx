import React from 'react'
import { NavLink, useLocation } from 'react-router'

const Navbar = () => {

  const location = useLocation();

  return (
    <div className='flex flex-row gap-5 justify-center bg-sky-950 h-11 mx-auto items-center text-lg font-semibold text-white'>
      <NavLink
      // className='items-center hover:text-blue-600'
      className={`px-4 py-2 rounded-md ${
        location.pathname === "/" ? "text-blue-600" : "text-gray-600 hover:bg-gray-200"
      }`}
      to="/"
      >
        Home
      </NavLink>

      <NavLink
      className={`px-4 py-2 rounded-md ${
        location.pathname === "/pastes" ? "text-blue-600" : "text-gray-600 hover:bg-gray-200"}`}
      to="/pastes"
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
