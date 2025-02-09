import { Student } from "../../models/student.js";
import HttpError from "../../utils/HttpError.js";

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
          throw HttpError(404, "Student not found");
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};
