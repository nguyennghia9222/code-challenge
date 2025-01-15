import express from "express";
import TaskHandler from "../handlers/taskHandler";

const router = express.Router();
const handler = new TaskHandler();

router.put("/:id", handler.updateTask);
router.delete("/:id", handler.deleteTask);
router.get("/:id", handler.getTask);

router.post("/", handler.createTask);

router.get("/", handler.getTasks);

export default router;
