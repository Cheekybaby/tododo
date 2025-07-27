import Task from "../models/task.model.js";


export const getTasks = async (req, res) =>{
    try {
        const tasks = await Task.find({userId: req.user._id}).sort("-createdAt");
        res.status(200).json(tasks);
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

export const createTask = async (req, res) =>{
    try {
        const task = await Task.create({...req.body, userId: req.user._id});
        res.status(201).json(task);
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task){
            return res.status(404).json({
                message: "Task not found",
            });
        }
        if ((task.userId.toString() !== req.user._id.toString())){
            return res.status(403).json({
                message: "Unauthorized access",
            })
        }
        task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json(task);
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task){
            return res.status(404).json({
                message: "Task not found",
            });
        }
        if ((task.userId.toString() !== req.user._id.toString())){
            return res.status(403).json({
                message: "Unauthorized access",
            })
        }
        task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(task);
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}