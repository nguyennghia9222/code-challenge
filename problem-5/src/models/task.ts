import { Schema, model } from "mongoose";
import { TaskStatus } from "../constants/taskConstant";

type ITask = {
  _id: string;
  name: string;
  status: TaskStatus;
};

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  status: { type: String, enum: Object.values(TaskStatus), required: true },
});

const Task = model<ITask>("Task", taskSchema);

export { ITask, Task };
