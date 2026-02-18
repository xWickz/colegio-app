import express from "express";
import {
  getMaterias,
  getMateriasLength,
} from "../controllers/materias.controller.js";

const router = express.Router();

router.get("/", getMaterias);
router.get("/length", getMateriasLength);

export default router;
