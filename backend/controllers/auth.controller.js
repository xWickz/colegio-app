import connection from "../db/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = (req, res) => {
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
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token });
  });
};
