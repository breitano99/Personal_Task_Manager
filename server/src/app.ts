import express from "express";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks"

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)

export default app;
