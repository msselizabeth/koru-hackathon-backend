import { User } from "../models/user.js"

export const getUsers = async (req,res,next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (e) {
        next(e)
    }
}
