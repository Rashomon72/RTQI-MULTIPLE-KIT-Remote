import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './config/db.config';

// ---------------- Routes ---------------------
import kitRoutes from './routes/kit.routes';

const app = express();

// ---------------- Middleware ------------------
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("➡️", req.method, req.url);
  console.log("IP:", req.ip);
  console.log("Headers:", req.headers['authorization']);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  next();
});

// ---------------- DB Connection -------------------
connectDB();

// ---------------- Test Routes ---------------------
app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is Working!"});
});

app.get('/ping', async (req: Request, res: Response) => {
    res.status(200).json({
        message: "OK",
        date: new Date().toString()
    });
});

// ---------------- Error Handler --------------------
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error Handler: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error"});
});

// ---------------- Actual Routes --------------------
app.use("/kit", kitRoutes);

// ---------------- Export APP ---------------------
export default app;


