import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoute";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Code Challenge API!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send("Server Error!");
});

export default app;
