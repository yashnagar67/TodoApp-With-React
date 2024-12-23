import React from 'react'

const Navbar = () => {
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-10 bg-transparent text-emerald-200  shadow-md p-4" >
        <div className="max-w-7xl mx-auto flex justify-between ">
          <div className="text-2xl font-bold">
          <div className="flex   ">
      <div className="text-2xl font-extrabold uppercase text-teal-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] tracking-widest text-center gradient-text flex float-left ">
        <h1>P</h1>
        <h1>E</h1>
        <h1>K</h1>
        <h1>O</h1>
        <h1 className='text-[10px] mt-[5px]'>Tm</h1>
      </div>
    </div>
          </div>
          <ul className="flex space-x-6  h-[20px]   text-gray-300 drop-shadow-lg">
            <li className="hover:text-sky-400">Home</li>
            <li className="hover:text-sky-400">About</li>
            <li className="hover:text-sky-400">Services</li>
            <li className="hover:text-sky-400">Contact</li>
          </ul>
        </div>
      </nav>

      {/* Background Image */}
     
    </div>
  )
}

export default Navbar
