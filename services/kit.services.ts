import { Kit } from "../models/kit.model";

const getStatus = async (name: string): Promise<{ statusCode: number, success: boolean, message: string, status?: string}> => {
    try {
        const deviceDoc = await Kit.findOne(
            { "devices.name": name },
            { devices: { $elemMatch: {name}}},
        );
        if (!deviceDoc || !deviceDoc.devices || deviceDoc.devices.length === 0) {
          return { statusCode: 404, success: false, message: "deviceDoc not found!" };
        }
        return { statusCode: 200, success: true, message: "Successfully send the status!", status:deviceDoc.devices[0].status};
    } catch (err: any) {
        console.error(`Got Error in the getStatus function, reason: ${err.message}`);
        return { statusCode: 500, success: false, message: "Internal Server Error!" };
    }
};

const createDevice = async (deviceName: string): Promise<{ statusCode: number, success: boolean, message: string }> => {
    try {
        await Kit.findOneAndUpdate(
            { id: process.env.KIT_DB_ID },
            {
                $push: {
                    devices: {
                        name: deviceName,
                        status: "offline",
                        control: "stop"
                    }
                }
            }
        );
        return { statusCode: 201, success: true, message: "Successfully created a new Device!" };
    } catch (err: any) {
        console.error(`Got Error in the createDevice function, reason: ${err.message}`);
        return { statusCode: 500, success: false, message: "Internal Server Error!" };
    }
};


const updateControl = async (details: { name: string, control: string }): Promise<{ statusCode: number, success: boolean, message: string }> => {
    try {
        await Kit.findOneAndUpdate(
            { id: process.env.KIT_DB_ID, "devices.name": details.name },
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

export { getStatus, createDevice, updateControl };