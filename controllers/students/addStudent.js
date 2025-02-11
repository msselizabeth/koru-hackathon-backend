import { Student } from "../../models/student.js";

export const addStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, gradeLevel, classes } = req.body;

    const newStudent = await Student.create({
      firstName,
      lastName,
      gradeLevel,
      classes: classes || []
    });

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};
