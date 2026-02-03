import { IDevice } from "../interface/kit.model.interface";
import { Kit } from "../models/kit.model";

const getStatus = async (name: string): Promise<{ statusCode: number, success: boolean, message: string, status?: string}> => {
    try {
        const deviceDoc = await Kit.findOne(
            { "devices.name": name },
            { devices: { $elemMatch: {name}}},
        );
        if (!deviceDoc || !deviceDoc.devices || deviceDoc.devices.length === 0) {
          return { statusCode: 404, success: false, message: "Device not found!" };
        }
        const device: IDevice = deviceDoc.devices[0] as IDevice;
        return { statusCode: 200, success: true, message: "Successfully send the status!", status: device.status };
    } catch (err: any) {
        console.error(`Got Error in the getStatus function, reason: ${err.message}`);
        return { statusCode: 500, success: false, message: "Internal Server Error!" };
    }
};


const updateStatus = async (details: { name: string, status: string }): Promise<{ statusCode: number, success: boolean, message: string }> => {
    try {
        const id: string = process.env.KIT_DB_ID as string;
        await Kit.findOneAndUpdate(
            { id: id, "devices.name": details.name },
            { $set: { "devices.$.status": details.status} },
            { new: true}
        );
        return { statusCode: 200, success: true, message: "Successfully udpated the status!" };
    } catch (err: any) {
        console.error(`Got Error in the updateStatus function, reason: ${err.message}`);
        return { statusCode: 500, success: false, message: "Internal Server Error!" };
    }
};


const createDevice = async (deviceName: string): Promise<{ statusCode: number, success: boolean, message: string }> => {
    try {
        const id: string = process.env.KIT_DB_ID as string;
        await Kit.findOneAndUpdate(
            { id: id },
            {
                $push: {
                    devices: {
                        name: deviceName,
                        status: "offline",
                        control: "stop"
                    }
                }
            },
            { new: true }
        );
        return { statusCode: 201, success: true, message: "Successfully created a new Device!" };
    } catch (err: any) {
        console.error(`Got Error in the createDevice function, reason: ${err.message}`);
        return { statusCode: 500, success: false, message: "Internal Server Error!" };
    }
};


const updateControl = async (details: { name: string, control: string }): Promise<{ statusCode: number, success: boolean, message: string }> => {
    try {
        const id: string = process.env.KIT_DB_ID as string;
        await Kit.findOneAndUpdate(
            { id: id, "devices.name": details.name },
            { 
                $set: {
                    "devices.$.control": details.control
                }
            },
            { new: true }
        );
        return { statusCode: 200, success: true, message: "Successfully updated the Control variable!" };
    } catch (err: any) {
        console.error(`Got Error in the updateControl function, reason: ${err.message}`);
        return { statusCode: 500, success: false, message: "Internal Server Error!" };
    }
};


const getControl = async (name: string): Promise<{ statusCode: number, success: boolean, message: string, control?: string }> => {
    try {
        const deviceDoc = await Kit.findOne(
            { "devices.name": name },
            { devices: { $elemMatch: {name}}},
        );
        if (!deviceDoc || !deviceDoc.devices || deviceDoc.devices.length === 0) {
          return { statusCode: 404, success: false, message: "Device not found!" };
        }
        const device: IDevice = deviceDoc.devices[0] as IDevice;
        return { statusCode: 200, success: true, message: "Successfully sent the control!", control: device.control };
    } catch (err: any) {
        console.error(`Got Error in the getControl function, reason: ${err.message}`);
        return { statusCode: 500, success: false, message: "Internal Server Error!" };
    }
};

export { getStatus, createDevice, updateControl, getControl, updateStatus };