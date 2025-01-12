import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";

const app: Express = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Server Error!");
});

app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Code Challenge API!");
});

export default app;
