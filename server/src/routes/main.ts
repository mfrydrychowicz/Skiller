import express, { Request, Response } from 'express';
const { v4: uuidV4 } = require('uuid');
const router = express.Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        res.redirect(`/${uuidV4()}`);
    } catch (error) {
        next(error);
    }
});

export { router as main };
