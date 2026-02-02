import { Document } from "mongoose";


// ------- Device INTERFACE ------------
export interface IDevice {
    id: number;
    status: string;
    control: string;
}


// ------- USER INTERFACE --------------
export interface IKit extends Document {
    id: string;
    devices: IDevice[];
    created_at: Date;
    updated_at: Date;
}