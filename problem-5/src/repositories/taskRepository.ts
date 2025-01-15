import { Task } from "../models/task";

type TaskParams = { name: string; status: string };

export default class TaskRepository {
  createTask(params: TaskParams) {
    return Task.create(params);
  }

  getTask(id: string) {
    return Task.findById(id).exec();
  }

  getTasks() {
    return Task.find().exec();
  }

  updateTask(id: string, params: TaskParams) {
    return Task.findByIdAndUpdate(id, params).exec();
  }

  deleteTask(id: string) {
    return Task.findByIdAndDelete(id);
  }
}
