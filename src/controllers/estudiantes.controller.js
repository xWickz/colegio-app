import EstudianteSchema from "../schemas/estudiantes.js";
import connection from "../db/connection.js";

export const getEstudiantes = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || '';

    let query = "SELECT * FROM estudiantes";
    const params = [];

    if (search) {
        query += " WHERE nombre LIKE ? OR cedula LIKE ?";
        params.push(`%${search}%`, `%${search}%`);
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;

    connection.query(query, params, (err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
            return;
        }

        res.json(results);
    });
}

export const postEstudiante = (req, res) => {
    try {
        const validateData = EstudianteSchema.parse(req.body);
        const { cedula, nombre } = validateData; 

        const query = "INSERT INTO estudiantes (cedula, nombre) VALUES (?, ?)";

        connection.query(query, [cedula, nombre], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).send("Estudiante with this cedula already exists");
                    return; 
                }
                
                console.error("Error inserting data:", err);
                res.status(500).send("Error inserting data");
                return;
            }

            res.status(201).send("Data inserted successfully");
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err.errors });
        }

        console.error(err);
        res.status(500).send("Internal server error");
    }
}

export const deleteEstudiante = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM estudiantes WHERE id = ?";

    connection.query(query, [id], (err, results) => {

        if (err) {
            console.error("Error deleting data:", err);
            res.status(500).send("Error deleting data");
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send("Estudiante not found");
            return;
        }

        res.send("Data deleted successfully");
    });
}

export const updateEstudiante = (req, res) => {
    const { id } = req.params;
    const { cedula, nombre, grado, fecha_nacimiento } = req.body; 

    const query = "UPDATE estudiantes SET cedula = ?, nombre = ?, grado = ?, fecha_nacimiento = ? WHERE id = ?";

    connection.query(query, [cedula, nombre, grado, fecha_nacimiento, id], (err, results) => {
        if (err) {
            console.error("Error updating data:", err);
            res.status(500).send("Error updating data");
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send("Estudiante not found");
            return;
        }

        res.send("Data updated successfully");

    });
}

export const getEstudiantesLength = (req, res) => {
    const query = "SELECT COUNT(*) AS total FROM estudiantes";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Error fetching data");
            return;
        }
        res.json(results[0]);
    });
}

export const getMateriabyEstudiante = (req, res) => {
    const { cedula } = req.params;
    const query = "SELECT m.id, m.materia_nombre FROM materias_asignadas ma JOIN materias m ON ma.id_materia = m.id WHERE ma.cedula_estudiante = ?";

    connection.query(query, [cedula], (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Error fetching data");
            return;
        }

        res.json(results);
    });
}