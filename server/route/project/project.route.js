import express from 'express';

//model
import Project from '../../model/project.model.js';

const router = express.Router();

/*
Route : /project/create
Method : POST
Description : Create new Project
Access : Public
Parameter : none
*/
router.post('/create', async (req, res) => {
    try {
        const projectDetails = req.body;
        const newProject = await Project.create(projectDetails);

        return res.status(201).json({ newProject });

    } catch (error) {
        console.log("project create route error : ", error.message);
        return res.status(400).json({ error: error.message });
    }
});

/*
Route : /project/all
Method : GET
Description : Get all project details
Access : Public
Parameter : none
*/
router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json({ projects });

    } catch (error) {
        console.log("Project get-all error : ", error.message);
        return res.status(400).json({ error: error.message });
    }
});

/*
Route : /project/get/:id
Method : GET
Description : Get a project details based on its id
Access : Public
Parameter : :id
*/
router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            res.status(400).json({ error: "project not found with this id" });
        }

        return res.status(200).json({ project });
    } catch (error) {
        console.log("get project based on id error : ", error.message);
        return res.status(400).json({ error: error.message });
    }
});

/*
Route : /project/update/:id
Method : PUT
Description : Update a project details
Access : Public
Parameter : :id
*/
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // const validId = await Project.findById(id);
        // if (!validId) {
        //     return res.status(400).json({ message: "project id doesn't match" });
        // }

        const udpatedDetails = await Project.findOneAndUpdate(
            { _id: id },
            { $set: { ...data } },
            { new: true }
        );

        return res.status(200).json({ "Updated Details": udpatedDetails });
    } catch (error) {
        console.log("Project Update error : ", error.message);
        return res.status(400).json({ error: error.message });
    }
});

/*
Route : /project/delete/:id
Method : DELETE
Description : Delete a project
Access : Public
Parameter : :id
*/
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await Project.deleteOne({ _id: id });

        return res.status(203).json({ "message": "item successfully deleted" });
    } catch (error) {
        console.log("Project delete error: ", error.message);
        return res.status(400).json({ error: error.message });
    }
})

export default router;