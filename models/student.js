import { model, Schema } from "mongoose";

const studentObservationSchema = new Schema({
    observationId: {
        type: Schema.Types.ObjectId,  
        ref: 'observation',                   
        required: true,
    },
    content: {
        type: String,
        default: "N/A",
    }
})
const studentClassSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'class',
        required: true,
    },
    classGrade: {
        type: Number,
        default: 0,
    },
    observations: [studentObservationSchema],
})
const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gradeLevel: {
        type: Number,
        required: true,
    },
    classes: {
        type: [studentClassSchema],
        default: []
    }
}, { versionKey: false, timestamps: true })

export const Student = model("students", studentSchema);