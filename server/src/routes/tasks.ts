import { Router } from "express";
import { Task } from "../models/task";
import { auth } from "../middleware/auth";

const router = Router();

//Get all tasks for logged in user
router.get("/", auth, async (req: any, res) => {
    const tasks = await Task.find({ user: req.userId}).sort({ createdAt: -1});
    res.json(tasks);
});

//Create a task
router.post("/", auth, async (req: any, res) => {
    const { title, description } = req.body;
    const task = await Task.create( {title, description, user: req.userId});
    res.status(201).json(task);
});

//Update task
router.put("/:id", auth, async (req: any, res) => {
    const task = await Task.findOneAndUpdate(
        {_id: req.params.id, user: req.userId},
        req.body,
        {new: true}
    );
    res.json(task);
});

//Delete task
router.delete("/:id", auth, async (req: any, res) => {
    await Task.findOneAndDelete({_id: req.params.id, user: req.userId});
    res.json({ message: "Task deleted" });
});

export default router;