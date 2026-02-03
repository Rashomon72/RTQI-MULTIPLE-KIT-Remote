import express, { Request, Response } from "express";
import { createDevice, getStatus, updateControl } from "../services/kit.services";

const router = express.Router();

router.get('/get-status', async (req: Request, res: Response) => {
    const name: string = req.query.name as string;
    const result: { statusCode: number, success: boolean, message: string, status?: string } = await getStatus(name);
    return res.status(result.statusCode).json({ success: result.success, message: result.message, ...(result.status && {status: result.status})});
});

router.post('/create-device', async (req: Request, res: Response) => {
    const details: { name: string } = req.body;
    const result: { statusCode: number, success: boolean, message: string } = await createDevice(details.name);
    return res.status(result.statusCode).json({ success: result.success, message: result.message });
});

router.post('/update-control', async (req: Request, res: Response) => {
    const details: { name: string, control: string } = req.body;
    const result: { statusCode: number, success: boolean, message: string } = await updateControl(details);
    return res.status(result.statusCode).json({ success: result.success, message: result.message });
});

export default router;