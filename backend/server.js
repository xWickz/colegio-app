import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import estudiantesRoutes from "./routes/estudiantes.routes.js";
import profesoresRoutes from "./routes/profesores.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import authRoutes from "./routes/auth.routes.js";
import "./db/connection.js";

const app = express();

dotenv.config();

// Enable CORS for all routes
const allowedOrigins = new Set(["http://localhost:5173"]);
if (process.env.FRONTEND_URL) {
  allowedOrigins.add(process.env.FRONTEND_URL);
}
if (process.env.CLIENT_ORIGIN) {
  allowedOrigins.add(process.env.CLIENT_ORIGIN);
}
if (process.env.VITE_API_BASE_URL) {
  allowedOrigins.add(process.env.VITE_API_BASE_URL);
}
const allowedHosts = new Set([
  "localhost",
  "127.0.0.1",
  process.env.SHARED_HOST?.replace(/^https?:\/\//, ""),
].filter(Boolean));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      try {
        const { protocol, hostname } = new URL(origin);
        if (protocol === "http:" && allowedHosts.has(hostname)) {
          return callback(null, true);
        }
      } catch (_) {
        // ignore invalid origins
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/data/estudiantes", estudiantesRoutes);
app.use("/api/data/profesores", profesoresRoutes);
app.use("/api/data/materias", materiasRoutes);
app.use("/api/login", authRoutes);

// Simple route to test server
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Start the server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
