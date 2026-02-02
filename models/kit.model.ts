import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IKit } from "../interface/kit.model.interface";

// --------- USER SCHEMA -------------
const KitSchema = new Schema<IKit>({
    id: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },
    devices: [{
        id: { type: Number, required: true },
        status: { type: String },
        control: { type: String }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now } 
});

export const Kit = model<IKit>("Kit", KitSchema);