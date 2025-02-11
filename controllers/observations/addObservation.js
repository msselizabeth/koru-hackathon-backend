import { Observation } from "../../models/observation.js";
import HttpError from "../../utils/HttpError.js";

export const addObservation = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name || !name.trim()) {
            throw HttpError(400, "Name is required");
        }
        const newObservation = await Observation.create({ name });
        res.status(201).json(newObservation);
    } catch (error) {
        next(error)
    }
}