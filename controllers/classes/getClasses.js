import { Class } from "../../models/class.js";

export const getClasses = async (req, res, next) => {
  try {
    const classes = await Class.aggregate([
      {
        $lookup: {
          from: "students",             // название коллекции студентов
          localField: "_id",            // поле в коллекции классов
          foreignField: "classes.classId", // поле в коллекции студентов, где хранятся ссылки на классы
          as: "studentsInClass"         // имя нового поля для полученных студентов
        }
      },
      {
        $addFields: {
          studentCount: { $size: "$studentsInClass" } // добавляем поле с количеством студентов
        }
      },
      {
        $project: { studentsInClass: 0 } // исключаем временное поле из итогового ответа
      }
    ]);

    res.json(classes);
  } catch (e) {
    next(e);
  }
};
