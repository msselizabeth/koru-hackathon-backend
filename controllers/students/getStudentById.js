import { Student } from "../../models/student.js";
import { Observation } from "../../models/observation.js"; // убедитесь, что модель Observation импортируется
import HttpError from "../../utils/HttpError.js";

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let student = await Student.findById(id).lean();
    if (!student) {
      throw HttpError(404, "Student not found");
    }

   
    res.json(student);
  } catch (error) {
    next(error);
  }
};
