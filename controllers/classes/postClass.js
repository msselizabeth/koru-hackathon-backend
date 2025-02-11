import { Class } from "../../models/class.js";


export const postClass =  async (req, res, next) => {
  try {
    const { teacher, classCode, name, gradeLevel, learningSkills, completion } = req.body;


    const newClass = await Class.create({
      teacher,
      classCode,
      name,
      gradeLevel,
      learningSkills,
      completion,
    });

    res.status(201).json(newClass);
  } catch (error) {
      console.error("Error while creating a class:", error);
      next(error);
  }
};


