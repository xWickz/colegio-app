import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

import estudiantesRoutes from "./routes/estudiantes.routes.js";
import profesoresRoutes from "./routes/profesores.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "colegio",
});

dotenv.config();

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
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
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
