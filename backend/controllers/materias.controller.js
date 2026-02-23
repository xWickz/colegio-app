import connection from "../db/connection.js";
import materiaSchema from "../schemas/materias.js";
import { z } from "zod";

export const getMaterias = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
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
};

export const postMateria = (req, res) => {
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
};

export const getMateriasLength = (req, res) => {
    const query = "SELECT COUNT(*) AS total FROM materias";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Error fetching data");
            return;
        }
        res.json(results[0]);
    });
}