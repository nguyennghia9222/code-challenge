import http from "http";
import app from "./app";
import * as db from "./db";

const port = process.env.PORT || 3000;

app.set("port", port);

const server = http.createServer(app);

const main = async () => {
  console.log("[database]: Connecting database");
  await db.connect();
  console.log("[database]: Database connected");

  console.log("[server]: Start server");
  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

process.on("SIGTERM", async () => {
  console.log("[server]: SIGTERM signal received.");
  console.log("[database]: Disconnecting database");
  await db.disconnect();
  console.log("[database]: Database disconnected");
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("[server]: SIGINT signal received.");
  console.log("[database]: Disconnecting database");
  await db.disconnect();
  console.log("[database]: Database disconnected");
  process.exit(0);
});

main().catch(console.error);
