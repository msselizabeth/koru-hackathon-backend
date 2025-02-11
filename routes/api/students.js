import express from "express";
import { getStudents } from "../../controllers/students/getStudents.js";
import { getStudentById } from "../../controllers/students/getStudentById.js";
import { addStudent } from "../../controllers/students/addStudent.js";
import { getStudentsByClassId } from "../../controllers/students/getStudentsByClass.js";
import { generateSummary } from "../../controllers/students/generateSummary.js";

export const router = express.Router();

router.get("/class/:classId", getStudentsByClassId);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);


// router.put("/:id");
// router.delete("/:id");
// router.delete("/:id/classes/:classId");

router.post('/generateSummary', generateSummary)