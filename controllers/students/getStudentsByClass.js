
import { Student } from "../../models/student.js";


export const getStudentsByClassId = async (req, res, next) => {
  try {
    const { classId } = req.params;


    const students = await Student.find({
      "classes.classId": classId

    }).lean();

    const modifiedStudents = students.map(student => ({
      ...student,
      classes: student.classes.filter(cls => cls.classId.toString() === classId),

    }));

    const result = modifiedStudents.map(s => ({
      _id: s._id,
      firstName: s.firstName,
      lastName: s.lastName,
      gradeLevel: s.gradeLevel,
      classGrade: s.classes[0].classGrade,
      learningSkills: s.classes[0].observations,
    }))

 
    res.json(result);
  } catch (error) {
    next(error);
  }
};
