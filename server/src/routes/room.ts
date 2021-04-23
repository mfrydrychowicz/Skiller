import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        res.send({ roomId: req.params.room });
    } catch (error) {
        next(error);
    }
});

export { router as room };
