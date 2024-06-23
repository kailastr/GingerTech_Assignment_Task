import React, { useState } from 'react'

import { Link } from 'react-router-dom';

const SignUpPage = () => {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");

    const signUpSubmit = (e) => {
        e.preventDefault();
        console.log(`fullName: ${fullName}, username: ${userName}, password ${password}, confirmPassword: ${confirmPassword}, gender: ${gender}`);
    }
    return (
        <>
            <div className='h-screen w-full bg-cyan-50 flex justify-center items-center'>
                <div className=' border rounded-md border-cyan-600 w-10/12 sm:w-10/12 md:w-8/12 lg:w-4/12 p-2 flex justify-center flex-col items-center bg-cyan-100'>
                    <h1 className=' text-2xl underline decoration-cyan-600 py-2'>Register</h1>
                    <form
                        className='w-full my-5 px-3 flex flex-col gap-4'
                        onSubmit={signUpSubmit}
                    >
                        <div className='w-full flex flex-col justify-start'>
                            <label htmlFor="fullName" className=' text-cyan-700'>Full Name<span className=' text-red-600 px-1'>*</span></label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder='Enter your Full Name'
                                onChange={e => { setFullName(e.target.value) }}
                                required
                            />
                        </div>
                        <div className='w-full flex flex-col justify-start'>
                            <label htmlFor="userName" className=' text-cyan-700'>User Name<span className=' text-red-600 px-1'>*</span></label>
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
                            <label htmlFor="password" className=' text-cyan-700'>Password<span className=' text-red-600 px-1'>*</span></label>
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
                        <div className='w-full flex flex-col justify-start'>
                            <label htmlFor="confirmPassword" className=' text-cyan-700'>Confirm Password<span className=' text-red-600 px-1'>*</span></label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder='Re-enter your Password'
                                onChange={e => { setConfirmPassword(e.target.value) }}
                                required
                            />
                        </div>
                        <div className='w-full flex flex-col'>
                            <p className=' text-cyan-700'>Select your gender<span className=' text-red-600 px-1'>*</span></p>
                            <div className='w-full flex flex-row justify-start gap-5'>
                                <div className='flex flex-row gap-2'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="male"
                                        onChange={e => { setGender(e.target.value) }}
                                        required
                                    />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="female"
                                        onChange={e => { setGender(e.target.value) }}
                                        required />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-cyan-700 text-white text-lg py-2 rounded-md font-semibold hover:bg-cyan-600 hover:shadow-lg transition duration-200 ease-in-out'
                        >
                            Submit
                        </button>
                        <p className=' text-center'>
                            Already have an accoutn ? <Link to='/project/login'><span className='text-blue-700'>Login</span></Link>
                        </p>
                    </form>

                </div>
            </div>
        </>
    )
}

export default SignUpPage