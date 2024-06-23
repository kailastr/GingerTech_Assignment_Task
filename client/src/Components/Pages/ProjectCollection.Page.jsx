import React from 'react';

//datatable
import ProjectDatatable from '../DataTable/Project.Datatable';

const ProjectCollection = () => {
    return (
        <div className=' w-full h-screen bg-gradient-to-b from-cyan-950 to-cyan-700 flex justify-center items-center'>
            <section className='w-11/12 border-2 rounded-md bg-white'>
                <h1 className=' text-2xl text-cyan-800 font-semibold px-4 pt-2'>Project Collection</h1>
                <p className='text-cyan-800 px-4 pb-5'>View collection of your Projects here </p>
                <ProjectDatatable />
            </section>
        </div>
    )
}

export default ProjectCollection