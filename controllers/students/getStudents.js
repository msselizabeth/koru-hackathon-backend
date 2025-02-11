import { Student } from "../../models/student.js";


export const getStudents = async (req, res, next) => {
    try {
        const { search = "" } = req.query;
        const searchRegex = new RegExp(search.replace(/\s+/g, ''), 'i');
        const searchCriteria = {
            $or: [
                { firstName: searchRegex },
                { lastName: searchRegex },
                {
                    $expr: {
                        $regexMatch: {
                            input: {
                                $replaceAll: {
                                    input: { $concat: ['$firstName', '$lastName'] },
                                    find: ' ',
                                    replacement: ''
                                }
                            },
                            regex: searchRegex
                        }
                    }
                }
            ]
        };
        const students = await Student.find(searchCriteria);
        res.json(students);
    } catch (e) {
        next(e)
    }
}
