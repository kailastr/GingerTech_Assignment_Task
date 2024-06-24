import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const loginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/user/signin', {
                userName,
                password,
            });
            
            localStorage.setItem("pic", response.data.profilePic);

            console.log('Login successful!', response.data);
            navigate('/project/all');

        } catch (error) {
            if (error.response) {
                // Backend-related error (4XX or 5XX status code)
                setErrorMessage(error.response.data.error);
                alert(errorMessage);
            } else {
                // Network error or other unknown error
                setErrorMessage('An error occurred. Please try again later.');
                alert(errorMessage);
            }
        }
    }

    return (
        <>
            <div className='h-screen w-full bg-cyan-50 flex justify-center items-center'>
                <div className=' border rounded-md border-cyan-600 w-10/12 sm:w-10/12 md:w-8/12 lg:w-4/12 p-2 flex justify-center flex-col items-center bg-cyan-100'>
                    <h1 className=' text-2xl underline decoration-cyan-600 py-2'>Login</h1>
                    <form
                        className='w-full my-5 px-3 flex flex-col gap-4'
                        onSubmit={loginSubmit}
                    >
                        <div className='w-full flex flex-col justify-start'>
                            <label htmlFor="userName" className=' text-cyan-700'>User Name</label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder='Enter your User Name'
                                onChange={e => { setUserName(e.target.value) }}
                                required
                            />
                        </div>
                        <div className='w-full flex flex-col justify-start'>
                            <label htmlFor="password" className=' text-cyan-700'>Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder='Enter your Password'
                                onChange={e => { setPassword(e.target.value) }}
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-cyan-700 text-white text-lg py-2 rounded-md font-semibold hover:bg-cyan-600 hover:shadow-lg transition duration-200 ease-in-out'
                        >
                            Submit
                        </button>
                        <p className=' text-center'>
                            don't have an account ? <Link to='/project/signup'><span className='text-blue-700'>Register</span></Link>
                        </p>
                    </form>

                </div>
            </div>
        </>
    )
}

export default LoginPage