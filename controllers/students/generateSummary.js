import OpenAI from "openai";
import mongoose from "mongoose";
import { Student } from "../../models/student.js";
import dotenv from "dotenv";
import HttpError from "../../utils/HttpError.js";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary = async (req, res, next) => {
    try {
        const { studentId, classId, regenerate } = req.body;

        // find student by Id
        const student = await Student.findById(studentId);
        if (!student) {
            throw HttpError(404, 'Student not found.')
        }

        // find necessary class in a classes array of the student
        const classEntry = student.classes.find(
            cls => cls.classId.toString() === classId.toString()
        );
        if (!classEntry) {
            throw HttpError(404, 'Class not found for this student.')
        }


        const name = `${student.firstName} ${student.lastName}`;
        const subject = classEntry.subject || "Unknown Subject";
        const observations = classEntry.observations;
        
        if (classEntry.generatedSummary && !regenerate) {
            return res.json({
                summary: classEntry.generatedSummary,
                info: 'Using created summary.'
            });
        }

        // Prompt
        let prompt = `Compiling a final report on observations of student ${name} in the subject "${subject}". Use the following data:\n\n`;
        observations.forEach((obs, index) => {
            const description = obs.content || "";
            prompt += `${index + 1}  - ${description}\n`;
        });
        prompt += `\nPlease formulate your report into a coherent paragraph describing the student's strengths.`;

        // Call AI
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        //AI response
        const summary = completion.choices[0].message.content;

        // Saving the summary in student object
        await Student.findOneAndUpdate(
            { _id: studentId, "classes.classId": classId },
            { $set: { "classes.$.generatedSummary": summary } }
        );

        res.json({ summary });

    } catch (error) {
        console.error("Error summary:", error);
        next(error);
    }
};
