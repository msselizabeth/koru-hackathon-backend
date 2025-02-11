import { model, Schema } from "mongoose";

const observationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    }, { versionKey: false, timestamps: true }
)

export const Observation = model("observation", observationSchema);