import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';

const DefaultLayout = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.includes(path);
    };

    const [loggedIn, setLoggedIn] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const toggleDrop = () => {
        setDropDown(!dropDown);
    }

    const logout = async () => {
        // setDropDown(false);
        // localStorage.clear();
        // navigate('project/login');
        try {
            const response = await axios.post('http://localhost:4000/user/logout');
            console.log('Logout response:', response.data);
            localStorage.clear();
            alert("Successfully logged out");
            setLoggedIn(false);
            navigate('/project/login');
        } catch (error) {
            console.error('Logout error:', error.message);
            alert('An error occurred while logging out. Please try again.'); // Inform user about error
        }
    }

    const isAuthActive = () => {
        return location.pathname.includes("login") || location.pathname.includes("signup");
    };

    useEffect(() => {
        localStorage.getItem("pic") ? setLoggedIn(true) : setLoggedIn(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setDropDown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                {/* <Link to='login'>
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
                </Link> */}
                <div className='relative dropdown-container'>
                    <img
                        src={loggedIn ? localStorage.getItem("pic") : "https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png"}
                        alt="User Avatar"
                        className='h-10 w-10 border-2 border-cyan-300 rounded-full cursor-pointer'
                        onClick={toggleDrop}
                    />
                    {dropDown && (
                        <div className="bg-white justify-center items-center gap-2 flex-col border-2 border-cyan-700 rounded-md absolute top-16 -left-28 sm:-left-28 md:-left-16 w-40 px-3 py-1">
                            {loggedIn ? (
                                <>
                                    <div>
                                        <p
                                            className='font-semibold text-cyan-800 hover:text-cyan-600 cursor-pointer'
                                            onClick={logout}
                                        >
                                            Log Out
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to='login'>
                                        <p
                                            className='font-semibold text-cyan-800 hover:text-cyan-600 cursor-pointer'
                                            onClick={() => setDropDown(false)}
                                        >
                                            Log In
                                        </p>
                                    </Link>
                                    <Link to='signup'>
                                        <p
                                            className='font-semibold text-cyan-800 hover:text-cyan-600 cursor-pointer'
                                            onClick={() => setDropDown(false)}
                                        >
                                            Sign Up
                                        </p>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default DefaultLayout;