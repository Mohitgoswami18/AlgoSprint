import { Schema, mongoose } from "mongoose";

const discussSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    message: {
        type: String,
        required: true,
    },
    reply: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }, 
            message: {
                type: String, 
                required: true,
            }
        }
    ]
},{timestamps: true})

export const Discuss = mongoose.model("Discuss", discussSchema);