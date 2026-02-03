import { Kit } from "../models/kit.model";
import { IDevice, IKit } from "../interface/kit.model.interface";

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

export { getStatus };