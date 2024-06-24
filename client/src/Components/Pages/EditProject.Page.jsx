import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProjectPage = () => {
    const location = useLocation();
    const { project } = location.state;

    var { id } = useParams();
    const [projectName, setProjectName] = useState(project.projectName);
    const [projectDescription, setProjectDescription] = useState(project.projectDescription);
    const [startDate, setStartDate] = useState(project.startDate);
    const [deadline, setDeadline] = useState(project.deadline);
    const [client, setClient] = useState(project.client);
    const [budget, setBudget] = useState(project.budget);
    const [team, setTeam] = useState(project.team);
    const [teamMember, setTeamMember] = useState(project);

    const submitProject = async (e) => {
        e.preventDefault();
        // console.log(`Project Name: ${projectName}, Description: ${projectDescription}, StartDate: ${startDate}, Deadline: ${deadline}, Client: ${client}, Budget: ${budget}, Team: ${team}`);
        e.preventDefault();

        try {
            const updatedProject = {
                projectName,
                projectDescription,
                startDate,
                deadline,
                client,
                budget,
                team,
            };

            const response = await axios.put(`http://localhost:4000/project/update/${id}`, updatedProject);
            console.log("Project Update Response:", response.data);
            alert("Successfully Updated");

            // Handle successful update (e.g., redirect to project view page)
        } catch (error) {
            console.error("Project Update Error:", error.message);
            // Handle errors appropriately (e.g., display error message)
        }
    };

    const addTeamMember = (e) => {
        e.preventDefault();
        if (teamMember.trim() !== "") {
            setTeam([...team, teamMember.trim()]);
            setTeamMember("");
        }
    };

    return (
        <div className='w-full bg-gradient-to-b from-cyan-950 to-cyan-700 flex justify-center'>
            <section className='w-11/12 border-2 rounded-md bg-white my-10'>
                <h1 className='text-2xl text-cyan-800 font-semibold px-4 pt-2'>Edit Project</h1>
                <p className='text-cyan-800 px-4 pb-5'>Update your project details</p>
                <form onSubmit={submitProject}>
                    <div className='w-full flex flex-col px-4 my-3 gap-5'>
                        <div className='w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="projectName" className='text-cyan-700'>Project Title</label>
                            <input
                                type="text"
                                name="projectName"
                                id="projectName"
                                onChange={e => setProjectName(e.target.value)}
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder={projectName}
                            />
                        </div>
                        <div className='w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="projectDescription" className='text-cyan-700'>Project Description</label>
                            <textarea
                                rows="3"
                                name="projectDescription"
                                id="projectDescription"
                                onChange={e => setProjectDescription(e.target.value)}
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder={projectDescription}
                            ></textarea>
                        </div>
                        <div className='w-full flex flex-col sm:flex-col md:flex-row'>
                            <div className='w-full lg:w-1/2 flex flex-col gap-1'>
                                <label htmlFor="startDate" className='text-cyan-700'>Project Starting Date</label>
                                <p className=' text-sm text-gray-500'>{new Date(startDate).toLocaleDateString()}</p>
                                <div>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                        onChange={e => setStartDate(e.target.value)}
                                        placeholder={startDate}
                                    />
                                </div>
                            </div>
                            <div className='w-full lg:w-1/2 flex flex-col gap-1'>
                                <label htmlFor="deadline" className='text-cyan-700'>Project Deadline</label>
                                <p className=' text-sm text-gray-500'>{new Date(deadline).toLocaleDateString()}</p>
                                <div>
                                    <input
                                        type="date"
                                        name="deadline"
                                        id="deadline"
                                        className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                        onChange={e => setDeadline(e.target.value)}
                                        placeholder={deadline}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="client" className='text-cyan-700'>Client / Company Name</label>
                            <input
                                type="text"
                                name="client"
                                id="client"
                                onChange={e => setClient(e.target.value)}
                                className='border-2 border-cyan-600 rounded-md p-1 focus:outline-cyan-400 px-2'
                                placeholder={client}
                            />
                        </div>
                        <div className='w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="budget" className='text-cyan-700'>Project Budget</label>
                            <div className='w-full flex justify-start bg-white border-2 border-cyan-600 rounded-md overflow-hidden'>
                                <div className='w-1/12 flex justify-center bg-cyan-100 items-center border border-r-cyan-600'>
                                    <p className='text-lg text-center'>₹</p>
                                </div>
                                <input
                                    type="number"
                                    name="budget"
                                    id="budget"
                                    onChange={e => setBudget(e.target.value)}
                                    className='w-11/12 border-none focus:outline-cyan-400 px-2'
                                    placeholder={budget}
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-start gap-1'>
                            <label htmlFor="team" className='text-cyan-700'>Project Team</label>
                            <div className='w-full flex justify-start bg-white border-2 border-cyan-600 rounded-md overflow-hidden'>
                                <button
                                    onClick={addTeamMember}
                                    className='w-1/12 flex justify-center items-center bg-cyan-100 border border-r-cyan-600 text-lg'
                                >
                                    Add
                                </button>
                                <input
                                    type="text"
                                    name="team"
                                    id="team"
                                    value={project.teamMember}
                                    onChange={e => setTeamMember(e.target.value)}
                                    className='w-11/12 border-none focus:outline-cyan-400 px-2'
                                    placeholder='Enter the project team member like: Alex, John, Peter...'
                                />
                            </div>
                            <p className='text-gray-600'>
                                Project team members: {team.map((member, index) => <span key={index}>{member}{index < project.team.length - 1 ? ', ' : ''}</span>)}
                            </p>
                        </div>

                        {/* button section */}
                        <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
                            <button type='submit' className='px-10 py-1 border-2 border-blue-600 rounded-md font-semibold bg-blue-200 hover:bg-blue-300 hover:shadow-lg transition duration-200 ease-in-out'>Update</button>
                            <button type='reset' className='px-10 py-1 border-2 border-red-600 rounded-md font-semibold bg-red-200 hover:bg-red-300 hover:shadow-lg transition duration-200 ease-in-out'>Cancel</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default EditProjectPage;
