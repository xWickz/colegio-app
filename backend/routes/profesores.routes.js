import express from "express";
import {
  getProfesores,
  postProfesor,
  deleteProfesor,
  getProfesoresLength,
} from "../controllers/profesores.controller.js";

const router = express.Router();

router.get("/", getProfesores);
router.get("/length", getProfesoresLength);
router.post("/", postProfesor);
router.delete("/:id", deleteProfesor);

export default router;
