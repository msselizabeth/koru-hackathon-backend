import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: String
    }
)

export const User = model("users", userSchema);