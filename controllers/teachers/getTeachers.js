import { Teacher } from "../../models/teacher.js";



export const getTeachers = async (req,res,next) => {
    try {
        const observs = await Teacher.find({});
        res.json(observs);
    } catch (e) {
        next(e)
    }
}
