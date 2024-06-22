import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    client: {
        type: String,
        required: true,
    },
    team: {
        type: [String],
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;