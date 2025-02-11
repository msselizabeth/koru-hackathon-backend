import express from "express";
import { getClasses } from "../../controllers/classes/getClasses.js";
import { getClassById } from "../../controllers/classes/getOneClass.js";
import { postClass } from "../../controllers/classes/postClass.js";

export const router = express.Router();

router.get("/", getClasses)
router.get("/:id", getClassById)
router.post("/", postClass);
