import React from 'react'

const Navbar = () => {
    return (
        <nav className='logo bg-violet-700 flex justify-between text-center'>
            <div className="font-bold text-3xl px-1  text-white ">
                Todo
            </div>
            <ul className='flex gap-2 mx-8 text-xl  text-white'>
                <li className='mx-4  '>Home</li>
                <li>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
