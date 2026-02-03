import express, { Request, Response } from "express";
import { createDevice, deleteDevice, getControl, getStatus, updateControl, updateStatus } from "../services/kit.services";

const router = express.Router();

router.get('/test', async (req: Request, res: Response) => {
    return res.status(200).json({ message: "working" });
});

router.get('/get-status', async (req: Request, res: Response) => {
    const name: string = req.query.name as string;
    const result: { statusCode: number, success: boolean, message: string, status?: string } = await getStatus(name);
    return res.status(result.statusCode).json({ success: result.success, message: result.message, ...(result.status && {status: result.status})});
});

router.post('/update-status', async (req: Request, res: Response) => {
    const details: { name: string, status: string } = req.body;
    const result: { statusCode: number, success: boolean, message: string } = await updateStatus(details);
    return res.status(result.statusCode).json({ success: result.success, message: result.message });
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

router.get('/get-control', async (req: Request, res: Response) => {
    const name: string = req.query.name as string;
    const result: { statusCode: number, success: boolean, message: string, control?: string } = await getControl(name);
    return res.status(result.statusCode).json({ success: result.success, message: result.message, ...(result.control && {control: result.control})});
});

router.delete('/delete-device', async (req: Request, res: Response) => {
    const name: string = req.query.name as string;
    const result: { statusCode: number, success: boolean, message: string } = await deleteDevice(name);
    return res.status(result.statusCode).json({ success: result.success, message: result.message });
});

export default router;