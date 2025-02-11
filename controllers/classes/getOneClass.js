import { Class } from "../../models/class.js";
import { Student } from "../../models/student.js";

export const getClassById = async (req, res, next) => {
    try {
        const { id } = req.params;


        const classItem = await Class.findById(id).populate({
            path: 'learningSkills',
            select: 'name'
        });

        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }

        const students = await Student.find({
            "classes.classId": id
        });

        const studentCount = students.length;

        const result = {
            classItem,
            studentCount
        };

        res.json(result);


    } catch (error) {
        next(error);
    }
};
