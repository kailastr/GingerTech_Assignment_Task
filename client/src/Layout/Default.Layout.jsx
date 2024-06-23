import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import classnames from 'classnames';

const DefaultLayout = () => {

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.includes(path);
    };

    const isAuthActive = () => {
        return location.pathname.includes("login") || location.pathname.includes("signup");
    };

    return (
        <>
            <nav className='w-full h-16 bg-cyan-950 border-b-2 border-cyan-400 text-lg flex justify-center items-center gap-5'>
                <Link to='all'>
                    <p
                        // className=' hover:text-cyan-100 transition duration-200 ease-in-out border-b-2 border-cyan-950'
                        className={classnames(
                            'hover:text-cyan-100 text-cyan-400 transition duration-200 ease-in-out border-b-2',
                            {
                                "border-cyan-300": isActive("/all"),
                                "border-cyan-950": !isActive("/all")
                            }
                        )}
                    >
                        View Projects
                    </p>
                </Link>
                <Link to='create'>
                    <p
                        className={classnames(
                            'hover:text-cyan-100 text-cyan-400 transition duration-200 ease-in-out border-b-2',
                            {
                                "border-cyan-300": isActive("/create"),
                                "border-cyan-950": !isActive("/create")
                            }
                        )}
                    >
                        Add Project
                    </p>
                </Link>
                <Link to='login'>
                    <p
                        className={classnames(
                            'hover:text-cyan-100 text-cyan-400 transition duration-200 ease-in-out border-b-2',
                            {
                                "border-cyan-300": isAuthActive(),
                                "border-cyan-950": !isAuthActive()
                            }
                        )}
                    >
                        Register
                    </p>
                </Link>
            </nav>
            <Outlet />
        </>
    )
}

export default DefaultLayout;