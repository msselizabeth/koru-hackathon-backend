import express from "express";
import { getTeachers } from "../../controllers/teachers/getTeachers.js";

export const router = express.Router();

router.get("/", getTeachers)
// router.post("/", );
