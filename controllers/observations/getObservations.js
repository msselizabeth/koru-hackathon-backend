import { Observation } from "../../models/observation.js";


export const getObservations = async (req,res,next) => {
    try {
        const observs = await Observation.find({});
        res.json(observs);
    } catch (e) {
        next(e)
    }
}
