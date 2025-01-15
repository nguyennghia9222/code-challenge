import { Task } from "../models/task";

type TaskParams = { name: string; status: string };

export default class TaskRepository {
  createTask(params: TaskParams) {
    return Task.create(params);
  }

  getTask(id: string) {
    return Task.findById(id).exec();
  }

  getTasks(filter: { status: string }) {
    if (filter && filter.status) return Task.find(filter).exec();
    return Task.find().exec();
  }

  updateTask(id: string, params: TaskParams) {
    return Task.findByIdAndUpdate(id, params, { new: true }).exec();
  }

  deleteTask(id: string) {
    return Task.findByIdAndDelete(id, { new: true });
  }
}
