import { model, Schema } from "mongoose";


const classSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,  
        ref: 'teacher',                   
        required: true,
    },
    classCode: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gradeLevel: {
        type: Number,
        required: true,
    },
    learningSkills: {
        type: [Schema.Types.ObjectId],
        ref: 'observation',
        required: true,
    },
    completion: {
        type: Number,
        required: true,
    }
}, { versionKey: false, timestamps: true })
    
export const Class = model("classes", classSchema) 