import express from "express";
import { getObservations } from "../../controllers/observations/getObservations.js";
import { addObservation } from "../../controllers/observations/addObservation.js";

export const router = express.Router();

router.get("/", getObservations)
router.post("/", addObservation)
