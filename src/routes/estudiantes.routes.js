import express from "express";
import {
  getEstudiantes,
  postEstudiante,
  deleteEstudiante,
  updateEstudiante,
  getEstudiantesLength,
  getMateriabyEstudiante,
} from "../controllers/estudiantes.controller.js";

const router = express.Router();

router.get("/", getEstudiantes);
router.get("/length", getEstudiantesLength);
router.get("/:cedula/materias", getMateriabyEstudiante);
router.post("/", postEstudiante);
router.delete("/:id", deleteEstudiante);
router.put("/:id", updateEstudiante);

export default router;
