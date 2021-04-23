import express, { static as serveStatic } from 'express';
import example from './example';
import { main } from './main';
import { room } from './room';
import * as path from 'path';

const router = express.Router();

const publicPath = path.join(__dirname, '../../../client/build');

router.use('/api/example', example);
router.use('/', main);
router.use('/:room', room);

// for any other requests, send `index.html` as a response
router.use(serveStatic(publicPath));
router.use('*', (req, res) => {
    // send `index.html` file from ./client
    return res.sendFile(path.join(publicPath, './index.html'));
});

export { router as appRouter };
