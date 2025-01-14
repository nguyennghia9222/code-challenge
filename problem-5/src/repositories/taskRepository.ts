import { Task } from "../models/task";

type TaskParams = { name: string; status: string };

class TaskRepository {
  createTask(params: TaskParams) {
    return Task.create(params);
  }

  getTask(_id: string) {
    return Task.findById(_id).exec();
  }

  getTasks() {
    return Task.find().exec();
  }

  updateTask(_id: string, params: TaskParams) {
    return Task.findByIdAndUpdate(_id, params).exec();
  }

  deleteTask(_id: string) {
    return Task.findByIdAndDelete(_id);
  }
}

export { TaskParams, TaskRepository };
