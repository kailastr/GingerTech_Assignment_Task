import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewProjectPage = () => {

    var { id } = useParams();

    const [projectData, setProjectData] = useState(null);

    // const projectData = {
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/project/get/${id}`);
                setProjectData(response.data.project);
            } catch (error) {
                console.error("Error fetching project details:", error);
                alert("error: ", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {projectData ? (
                <div className='w-full h-screen bg-gradient-to-b from-cyan-950 to-cyan-700 flex justify-center'>
                    <section className='w-11/12 border-2 rounded-md bg-white p-4 my-10'>
                        <div className='flex flex-col justify-between items-center'>
                            <div>
                                <h1 className='text-2xl text-cyan-800 font-semibold'>{projectData.projectName}</h1>
                                <p className='text-cyan-800 pb-5'>Here are the details of the project</p>
                            </div>
                            <div className=' text-sm flex gap-10'>
                                <div className='mb-4'>
                                    <h2 className='text-cyan-700 font-semibold'>Created At</h2>
                                    <p className='text-gray-700'>{new Date(projectData.createdAt).toLocaleString()}</p>
                                </div>

                                <div className='mb-4'>
                                    <h2 className='text-cyan-700 font-semibold'>Updated At</h2>
                                    <p className='text-gray-700'>{new Date(projectData.updatedAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </div >

                        <hr />

                        <div className='my-4'>
                            <h2 className='text-xl text-cyan-700 font-semibold'>Project Description</h2>
                            <p className='text-gray-700'>{projectData.projectDescription}</p>
                        </div>

                        <div className='flex justify-start items-center gap-16'>
                            <div className='mb-4'>
                                <h2 className='text-xl text-cyan-700 font-semibold'>Start Date</h2>
                                <p className='text-gray-700'>{new Date(projectData.startDate).toLocaleDateString()}</p>
                            </div>

                            <div className='mb-4'>
                                <h2 className='text-xl text-cyan-700 font-semibold'>Deadline</h2>
                                <p className='text-gray-700'>{new Date(projectData.deadline).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <h2 className='text-xl text-cyan-700 font-semibold'>Client</h2>
                            <p className='text-gray-700'>{projectData.client}</p>
                        </div>

                        <div className='mb-4'>
                            <h2 className='text-xl text-cyan-700 font-semibold'>Team Members</h2>
                            <ol className=' list-decimal list-inside text-gray-700'>
                                {projectData.team.map((member, index) => (
                                    <li key={index}>{member}</li>
                                ))}
                            </ol>
                        </div>

                        <div>
                            <h2 className='text-xl text-cyan-700 font-semibold'>Budget</h2>
                            <p className='text-gray-700'>₹{projectData.budget.toLocaleString()}</p>
                        </div>
                    </section >
                </div >
            ) : (
                <div>Loading project details...</div>
            )}
        </>
    )
}

export default ViewProjectPage