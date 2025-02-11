import { model, Schema } from "mongoose";

const teacherSchema = new Schema(
    {
        firstName: String
    }, { versionKey: false, timestamps: true }
)

export const Teacher = model("teachers", teacherSchema);