import { Request, Response, NextFunction } from "express";
import { TaskStatus } from "../constants/taskConstant";
import { HttpError } from "../constants/errorConstant";
import TaskRepository from "../repositories/taskRepository";
import Joi from "joi";

const createTaskSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid(...Object.values(TaskStatus)),
});

const updateTaskSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid(...Object.values(TaskStatus)),
});

export default class TaskHandler {
  taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  getTask = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const task = await this.taskRepository.getTask(id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskRepository.getTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { name, status } = req.body;
    const { error: validationError } = createTaskSchema.validate({ name, status });

    if (validationError) {
      res.status(422).json({ error: HttpError.ValidationError, detail: validationError });
      return;
    }

    try {
      const createdTask = await this.taskRepository.createTask({ name, status });
      res.status(201).json(createdTask);
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { name, status } = req.body;
    const { error: validationError } = updateTaskSchema.validate({ name, status });

    if (validationError) {
      res.status(422).json({ error: HttpError.ValidationError, detail: validationError });
      return;
    }

    try {
      const updatedTask = await this.taskRepository.updateTask(id, { name, status });
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const result = await this.taskRepository.deleteTask(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
