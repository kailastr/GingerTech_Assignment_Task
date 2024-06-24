import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jwt from 'jsonwebtoken';

//icons
import { LiaEyeSolid } from "react-icons/lia";

//material ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import TablePagination from '@mui/material/TablePagination';


const ProjectDatatable = () => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const viewProject = (event) => {
        // alert(event._id);
        navigate(`/project/view/${event._id}`);
    };

    const editProject = (project) => {

        if (!localStorage.pic) {
            alert("Login to Edit Project Details");
            navigate('/project/login');
        }
        else {
            navigate(`/project/edit/${project._id}`, { state: { project } });
        }
    }

    const deleteProject = async (event) => {
        console.log(event);
        if (!localStorage.pic) {
            alert("Login to Delete Project");
            navigate('/project/login');
            return;
        } else {
            try {
                const { data } = await axios.delete(`http://localhost:4000/project/delete/${event._id}`);

                console.log('Project deleted successfully:', data);
                alert('Project deleted successfully!');

                fetchProjects();

            } catch (error) {
                console.error('Error deleting project:', error.message);
                alert('An error occurred while deleting the project. Please try again.');
            }
        }
    }

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:4000/project/all');
            setProjects(response.data.projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            alert({ "error": error.message });
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table aria-label="Project Table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Action</TableCell>
                            <TableCell align='left'>Project Name</TableCell>
                            <TableCell align='left' style={{ minWidth: 300 }} >Description</TableCell>
                            <TableCell align="right">Deadline</TableCell>
                            <TableCell align="right">Client</TableCell>
                            <TableCell align="right">Budget</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects ? (
                            projects.length > 0 ? (
                                projects
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow

                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" className=' flex gap-1'>
                                                <div className='flex justify-start items-center gap-1 -z-10'>
                                                    <Fab size='small' color='primary' aria-label="view" title='View Project Details' onClick={() => viewProject(row)}>
                                                        <LiaEyeSolid />
                                                    </Fab>
                                                    <Fab size='small' color="secondary" aria-label="edit" title='Edit Project Details' onClick={() => editProject(row)}>
                                                        <EditIcon />
                                                    </Fab>
                                                    <Fab size='small' color="error" aria-label="delete" title='Delete Project' onClick={() => deleteProject(row)}>
                                                        <DeleteIcon />
                                                    </Fab>
                                                </div>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.projectName}
                                            </TableCell>
                                            <TableCell>{row.projectDescription}</TableCell>
                                            <TableCell align="right">{row.deadline}</TableCell>
                                            <TableCell align="right">{row.client}</TableCell>
                                            <TableCell align="right">{row.budget}</TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow >
                                    <TableCell colSpan={6} align='center'>
                                        No Projects Found !!
                                    </TableCell>
                                </TableRow>
                            )
                        ) : (
                            <TableRow >
                                <TableCell colSpan={6} align='center'>
                                    Projects Loading..
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={projects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default ProjectDatatable