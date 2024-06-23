import React from 'react';
import { useParams } from 'react-router-dom';

const ViewProjectPage = () => {

    const { id } = useParams();

    const projectDetails = {
        "_id": "66771ce9d59c83d110603e81",
        "projectName": "Project Management",
        "projectDescription": "A web application using MERN stack to manage different project",
        "startDate": "2024-06-23T00:00:00.000Z",
        "deadline": "2024-08-30T00:00:00.000Z",
        "client": "Josh",
        "team": [
            "Alex",
            "James"
        ],
        "budget": 23000,
        "createdAt": "2024-06-22T18:50:17.652Z",
        "updatedAt": "2024-06-22T18:50:17.652Z",
        "__v": 0
    }

    return (
        <>
            <div className='w-full h-screen bg-gradient-to-b from-cyan-950 to-cyan-700 flex justify-center'>
                <section className='w-11/12 border-2 rounded-md bg-white p-4 my-10'>
                    <div className='flex flex-col justify-between items-center'>
                        <div>
                            <h1 className='text-2xl text-cyan-800 font-semibold'>{projectDetails.projectName}</h1>
                            <p className='text-cyan-800 pb-5'>Here are the details of the project</p>
                        </div>
                        <div className=' text-sm flex gap-10'>
                            <div className='mb-4'>
                                <h2 className='text-cyan-700 font-semibold'>Created At</h2>
                                <p className='text-gray-700'>{new Date(projectDetails.createdAt).toLocaleString()}</p>
                            </div>

                            <div className='mb-4'>
                                <h2 className='text-cyan-700 font-semibold'>Updated At</h2>
                                <p className='text-gray-700'>{new Date(projectDetails.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div >

                    <hr />

                    <div className='my-4'>
                        <h2 className='text-xl text-cyan-700 font-semibold'>Project Description</h2>
                        <p className='text-gray-700'>{projectDetails.projectDescription}</p>
                    </div>

                    <div className='flex justify-start items-center gap-16'>
                        <div className='mb-4'>
                            <h2 className='text-xl text-cyan-700 font-semibold'>Start Date</h2>
                            <p className='text-gray-700'>{new Date(projectDetails.startDate).toLocaleDateString()}</p>
                        </div>

                        <div className='mb-4'>
                            <h2 className='text-xl text-cyan-700 font-semibold'>Deadline</h2>
                            <p className='text-gray-700'>{new Date(projectDetails.deadline).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <h2 className='text-xl text-cyan-700 font-semibold'>Client</h2>
                        <p className='text-gray-700'>{projectDetails.client}</p>
                    </div>

                    <div className='mb-4'>
                        <h2 className='text-xl text-cyan-700 font-semibold'>Team Members</h2>
                        <ol className=' list-decimal list-inside text-gray-700'>
                            {projectDetails.team.map((member, index) => (
                                <li key={index}>{member}</li>
                            ))}
                        </ol>
                    </div>

                    <div>
                        <h2 className='text-xl text-cyan-700 font-semibold'>Budget</h2>
                        <p className='text-gray-700'>₹{projectDetails.budget.toLocaleString()}</p>
                    </div>
                </section >
            </div >
        </>
    )
}

export default ViewProjectPage