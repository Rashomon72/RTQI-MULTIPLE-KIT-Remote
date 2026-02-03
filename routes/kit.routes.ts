import express, { Request, Response } from "express";
import { getStatus } from "../services/kit.services";

const router = express.Router();

router.get('/get-status', async (req: Request, res: Response) => {
    const name: string = req.query.name as string;
    const result: { statusCode: number, success: boolean, message: string, status?: string } = await getStatus(name);
    return res.status(result.statusCode).json({ success: result.success, message: result.message, ...(result.status && {status: result.status})});
});

export default router;

