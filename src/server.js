import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { DEFAULTS } from "./config.js";
import EstudianteSchema from "./schemas/estudiantes.js";
import materiaSchema from "./schemas/materias.js";

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

// Middleware to verify JWT authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
  }),
);

// Require authentication for all /api/data routes
//app.use("/api/data", authenticateToken);

// Simple route to test server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// api endpoint to fetch data (GET)
// GET Estudiantes
app.get("/api/data/estudiantes", (req, res) => {

  const limit = Number(req.query.limit) || DEFAULTS.DEFAULT_LIMIT;
  const offset = Number(req.query.offset) || 0;
  const search = req.query.search || "";

  let query = "SELECT * FROM estudiantes";
  let params = [];

  if (search) {
    query += " WHERE nombre LIKE ? OR cedula LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ` LIMIT ${limit} OFFSET ${offset}`;

  connection.query(query, params,(err, results) => {
    if (err) {
      res.status(500).send("Error fetching data");
      return;
    }

    res.json(results);

  });
});

// GET Profesores
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

// GET Estudiantes Length
app.get("/api/data/estudiantes/length", async (req, res) => {
  const query = "SELECT COUNT(*) AS length FROM estudiantes";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data length:", err);
      res.status(500).send("Error fetching data length");
      return;
    }
    res.json(results[0]);
  });
});

// GET Materias Length
app.get("/api/data/materias/length", async (req, res) => {
  const query = "SELECT COUNT(*) AS length FROM materias";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data length:", err);
      res.status(500).send("Error fetching data length");
      return;
    }
    res.json(results[0]);
  });
});

// GET Profesores Length
app.get("/api/data/profesores/length", async (req, res) => {
  const query = "SELECT COUNT(*) AS length FROM profesores";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data length:", err);
      res.status(500).send("Error fetching data length");
      return;
    }
    res.json(results[0]);
  });
});

// GET Materias Estudiante
app.get("/api/data/estudiantes/:cedula/materias", (req, res) => {
  const { cedula } = req.params;
  const query = "SELECT m.id, m.materia_nombre FROM materias_asignadas ma JOIN materias m ON ma.id_materia = m.id WHERE ma.cedula_estudiante = ?";
  connection.query(query, [cedula], (err, results) => {
    if (err) {
      console.error("Error fetching materias for estudiante:", err);
      res.status(500).send("Error fetching materias for estudiante");
      return;
    }
    res.json(results);
  });
});

// GET Materias
app.get("/api/data/materias", (req, res) => {
  const limit = Number(req.query.limit) || DEFAULTS.DEFAULT_LIMIT;
  const offset = Number(req.query.offset) || 0;
  const search = req.query.search || "";
  
  let query = `
    SELECT m.id, m.materia_nombre, m.profesor_asignado, p.nombre AS nombre_profesor
    FROM materias m
    LEFT JOIN profesores p ON m.profesor_asignado = p.cedula`;
  let params = [];

  if (search) {
    query += " WHERE materia_nombre LIKE ?";
    params.push(`%${search}%`);
  }

  query += ` LIMIT ${limit} OFFSET ${offset}`;

  connection.query(query, params, (err, results) => {
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
        if (err.code === "ER_DUP_ENTRY") {
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

// POST Materia
app.post("/api/data/materias", (req, res) => {
  try {
    const validateData = materiaSchema.parse(req.body);
    const { nombre } = validateData;

    const query = "INSERT INTO materias (materia_nombre) VALUES (?)";

    connection.query(query, [nombre], (err, results) => {
      if (err) {
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

// POST Login
app.post("/api/login", (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).send("Usuario and password are required");
  }

  const query = "SELECT * FROM usuarios WHERE usuario = ?";
  connection.query(query, [usuario], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).send("Error fetching user");
    }

    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // JWT
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      "secret_key", { expiresIn: "1h" }
    );

    res.json({ token });
  });
});

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
