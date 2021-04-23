import express, { Request, Response } from 'express';
const router = express.Router();

const exampleObj = {
    text: 'I am an example test',
    id: 123
};

router.get('/', async (req: Request, res: Response, next) => {
    try {
        res.status(200).send(JSON.stringify(exampleObj));
    } catch (error) {
        next(error);
    }
});

export default router;
