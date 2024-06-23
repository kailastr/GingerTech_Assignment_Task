import React from 'react';

import { Outlet } from 'react-router-dom';

//icons
import { IoArrowBackSharp } from "react-icons/io5";

const AuthenticationLayout = () => {
    return (
        <>
            <nav className='w-full fixed top-0 left-0 flex items-center justify-center'>
                <div className='flex items-center justify-center'>
                    <button className='bg-white hover:bg-cyan-100 transition duration-200 ease-in-out border-2 border-cyan-600 text-cyan-600 rounded-md px-2 py-1 flex justify-center items-center gap-1 mt-5'>
                        <IoArrowBackSharp />
                        Home
                    </button>
                </div>
            </nav>
            <Outlet />
        </>

    )
}

export default AuthenticationLayout