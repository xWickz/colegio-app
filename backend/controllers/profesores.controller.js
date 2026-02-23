import connection from "../db/connection.js";

export const getProfesores = (req, res) => {
  const query = "SELECT * FROM profesores";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
};

export const postProfesor = (req, res) => {
  const { cedula, nombre, materia_asignada } = req.body;
  const query =
    "INSERT INTO profesores (cedula, nombre, materia_asignada) VALUES (?, ?, ?)";

  connection.query(
    query,
    [cedula, nombre, materia_asignada],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      res.status(201).send("Data inserted successfully");
    },
  );
};

export const deleteProfesor = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM profesores WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send("Profesor not found");
      return;
    }
    res.send("Data deleted successfully");
  });
};

export const getProfesoresLength = (req, res) => {
    const query = "SELECT COUNT(*) AS total FROM profesores";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Error fetching data");
            return;
        }
        res.json(results[0]);
    });
}

