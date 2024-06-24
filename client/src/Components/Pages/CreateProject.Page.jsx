import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const CreateProjectPage = () => {

    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [client, setClient] = useState("");
    const [budget, setBudget] = useState();
    const [team, setTeam] = useState([]);
    const [teamMember, setTeamMember] = useState("");

    const submitProject = async (e) => {
        e.preventDefault();
        // console.log(`Project Name : ${projectName}, Description : ${projectDescription}, StartDate: ${startDate}, deadline: ${deadline}, client: ${client}, Budget: ${budget}, Team: ${team}`);

        if (!localStorage.pic) {
            alert("Login to Add Projects");
            navigate('/project/login');
        } else {
            try {
                const response = await fetch('http://localhost:4000/project/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectName,
                        projectDescription,
                        startDate,
                        deadline,
                        client,
                        budget,
                        team,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error creating project: ${await response.text()}`);
                }

                const newProject = await response.json();
                alert('Project created successfully:', newProject);
                navigate('/project/all'); // Redirect to projects list or success page
            } catch (error) {
                console.error('Error creating project:', error.message);
                alert('An error occurred while creating the project. Please try again.');
            }
        }
    }

    const addTeamMember = (e) => {
        e.preventDefault();
        if (teamMember.trim() !== "") {
            setTeam([...team, teamMember.trim()]);
            setTeamMember("");
        }
    }

    return (
        <div className=' w-full bg-gradient-to-b from-cyan-950 to-cyan-700 flex justify-center'>
            <section className='w-11/12 border-2 rounded-md bg-white my-10'>
                <h1 className=' text-2xl text-cyan-800 font-semibold px-4 pt-2'>Add Project</h1>
                <p className='text-cyan-800 px-4 pb-5'>Fill up your new project details </p>
                <form onSubmit={submitProject}>
                    <div className='w-full flex flex-col px-4 my-3 gap-5'>
                        <div className=' w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="projectName" className=' text-cyan-700'>Project Title<span className='text-red-500 px-1'>*</span></label>
                            <input
                                type="text"
                                name="projectName"
                                id="projectName"
                                onChange={e => { setProjectName(e.target.value) }}
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder='Enter your Project Title here'
                                required
                            />
                        </div>
                        <div className=' w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="projectName" className=' text-cyan-700'>Project Title<span className='text-red-500 px-1'>*</span></label>
                            <textarea
                                rows="3"
                                name="projectName"
                                id="projectName"
                                onChange={e => { setProjectDescription(e.target.value) }}
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder='Enter your Project Title here'
                                required
                            ></textarea>
                        </div>
                        <div className='w-full flex flex-col sm:flex-col md:flex-row'>
                            <div className=' w-full lg:w-1/2 flex flex-col gap-1'>
                                <label htmlFor="startDate" className='text-cyan-700'>Project Starting Date<span className='text-red-500 px-1'>*</span></label>
                                <div>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                        onChange={e => { setStartDate(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className=' w-full lg:w-1/2 flex flex-col gap-1'>
                                <label htmlFor="deadline" className='text-cyan-700'>Project Deadline<span className='text-red-500 px-1'>*</span></label>
                                <div>
                                    <input
                                        type="date"
                                        name="deadline"
                                        id="deadline"
                                        className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                        onChange={e => { setDeadline(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=' w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="client" className=' text-cyan-700'>Client / Company Name<span className='text-red-500 px-1'>*</span></label>
                            <input
                                type="text"
                                name="client"
                                id="client"
                                onChange={e => { setClient(e.target.value) }}
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder='Enter Client / Company Name here'
                                required
                            />
                        </div>
                        <div className=' w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="budget" className='text-cyan-700'>Project Budget<span className='text-red-500 px-1'>*</span></label>
                            <div className='w-full flex justify-start bg-white border-2 border-cyan-600 rounded-md overflow-hidden'>
                                <div className=' w-1/12 flex justify-center bg-cyan-100 items-center border border-r-cyan-600'>
                                    <p className='text-lg text-center'>₹</p>
                                </div>
                                <input
                                    type="number"
                                    name="budget"
                                    id="budget"
                                    onChange={e => { setBudget(e.target.value) }}
                                    className=' w-11/12 border-none focus:outline-cyan-400 px-2'
                                    placeholder='Enter the project budget in INR'
                                    required
                                />
                            </div>
                        </div>
                        <div className=' w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="team" className='text-cyan-700'>Project Team<span className='text-red-500 px-1'>*</span></label>
                            <div className='w-full flex justify-start bg-white border-2 border-cyan-600 rounded-md overflow-hidden'>
                                <button
                                    onClick={addTeamMember}
                                    className=' w-1/12 flex justify-center items-center bg-cyan-100 border border-r-cyan-600 text-lg'
                                >
                                    Add
                                </button>
                                <input
                                    type="text"
                                    name="team"
                                    id="team"
                                    value={teamMember}
                                    onChange={e => { setTeamMember(e.target.value) }}
                                    className='w-11/12 border-none focus:outline-cyan-400 px-2'
                                    placeholder='Enter the project team member like: Alex, John, Peter...'
                                />

                            </div>
                            <p className='text-gray-600'>
                                Project team members: {team.map((member, index) => <span key={index}>{member}{index < team.length - 1 ? ', ' : ''}</span>)}
                            </p>
                        </div>

                        {/* button section */}
                        <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
                            <button type='submit' className='px-10 py-1 border-2 border-blue-600 rounded-md font-semibold bg-blue-200 hover:bg-blue-300 hover:shadow-lg transition duration-200 ease-in-out'>Submit</button>
                            <button type='reset' className='px-10 py-1 border-2 border-red-600 rounded-md font-semibold bg-red-200 hover:bg-red-300 hover:shadow-lg transition duration-200 ease-in-out'>Cancel</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default CreateProjectPage