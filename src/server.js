import express from "express";
import mysql from "mysql";
import cors from "cors";
import { z } from "zod";

import EstudianteSchema from "@/schemas/estudiantes.js";

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "colegio",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
  }),
);

// Simple route to test server
app.get("/", (req, res) => {
  res.send("Hello World! ");
});

// api endpoint to fetch data (GET)
app.get("/api/data/estudiantes", (req, res) => {

  const query = "SELECT * FROM estudiantes";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }

    res.json(results);
  });
});

app.get("/api/data/profesores", (req, res) => {
  const query = "SELECT * FROM profesores";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// api endpoint to add data (POST)

// POST Estudiantes
app.post("/api/data/estudiantes", (req, res) => {
  try {
    const validateData = EstudianteSchema.parse(req.body);
    const { cedula, nombre } = validateData;

    const query = "INSERT INTO estudiantes (cedula, nombre) VALUES (?, ?)";

    connection.query(query, [cedula, nombre], (err, results) => {

      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(400).send("Cédula ya existe");
          return;
        }
        
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }

      res.status(201).send("Data inserted successfully");
    });
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(400).json({ errors: err.errors });

    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// POST Profesores
app.post("/api/data/profesores", (req, res) => {
  const { cedula, nombre } = req.body;

  const query = "INSERT INTO profesores (cedula, nombre) VALUES (?, ?)";

  connection.query(query, [cedula, nombre], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
      return;
    }
    res.status(201).send("Data inserted successfully");
  });
});

// api endpoint to delete data (DELETE)

// DELETE Estudiantes
app.delete("/api/data/estudiantes/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM estudiantes WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
      return;
    }
    res.send("Data deleted successfully");
  });
});

// DELETE Profesores
app.delete("/api/data/profesores/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM profesores WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
      return;
    }
    res.send("Data deleted successfully");
  });
});

// api endpoint to update data (PUT)
app.put("/api/data/estudiantes/:id", (req, res) => {
  const { id } = req.params;
  const { cedula, nombre } = req.body;
  const query = "UPDATE estudiantes SET cedula = ?, nombre = ? WHERE id = ?";
  connection.query(query, [cedula, nombre, id], (err, results) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Error updating data");
      return;
    }
    res.send("Data updated successfully");
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
