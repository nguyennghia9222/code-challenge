import http from "http";
import app from "./app";
import * as db from "./db";

const port = process.env.PORT || 3000;

app.set("port", port);

const server = http.createServer(app);

const main = async () => {
  await db.connect();
  console.log("[database]: Database connected");

  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

process.on("unhandledRejection", async (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.error(err);

  await db.disconnect();
  console.log("[database]: Database disconnected");

  server.close(() => {
    console.log("[server]: Server disconnected");
    process.exit(1);
  });
});

process.on("SIGTERM", async () => {
  console.log("[server]: SIGTERM signal received.");

  await db.disconnect();
  console.log("[database]: Database disconnected");

  server.close(() => {
    console.log("[server]: Server disconnected");
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("[server]: SIGINT signal received.");

  await db.disconnect();
  console.log("[database]: Database disconnected");

  server.close(() => {
    console.log("[server]: Server disconnected");
    process.exit(0);
  });
});

main().catch(console.error);
