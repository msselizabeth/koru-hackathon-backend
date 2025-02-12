import { Student } from "../../models/student.js";
import HttpError from "../../utils/HttpError.js";


export const updateStudent = async (req, res, next) => {
    try {
        const { id, classId } = req.params;
        const { observation, obsId } = req.body;

        if (!observation || !obsId) {
            throw HttpError(400, "Observation content and ID are required");
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: id, "classes.classId": classId },
            {
                $set: {
                  "classes.$[classElem].observations.$[obsElem].content": observation,
                },
              },
              {
                arrayFilters: [
                  { "classElem.classId": classId },
                  { "obsElem.observationId": obsId },
                ],
                new: true, 
              }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student or observation not found." });
          }
      
        res.json({ student: updatedStudent });
        
    } catch (error) {
        console.error(error);
        next(error);
    }

}