
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

    res.json(modifiedStudents);
  } catch (error) {
    next(error);
  }
};
