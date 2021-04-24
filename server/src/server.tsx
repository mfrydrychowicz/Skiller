import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const connection_uri = process.env.DATABASE_URI || 'mongodb://localhost/playground';

mongoose.connect(
    connection_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => {
        // console.log('connected to db');
    }
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use(appRouter);

const server = app.listen(port, function () {
    console.log('App listening on port: ' + port);
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

let socketList = {};

io.on('connection', (socket) => {
    console.log(`New User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        socket.disconnect();
        console.log('User disconnected!');
    });

    socket.on('BE-check-user', ({ roomId, userName }) => {
        let error = false;

        io.sockets.in(roomId).clients((err, clients) => {
            clients.forEach((client) => {
                if (socketList[client] == userName) {
                    error = true;
                }
            });
            socket.emit('FE-error-user-exist', { error });
        });
    });

    socket.on('BE-join-room', ({ roomId, userName }) => {
        socket.join(roomId);
        socketList[socket.id] = { userName, video: true, audio: true };

        io.sockets.in(roomId).clients((err, clients) => {
            try {
                const users = [];
                clients.forEach((client) => {
                    users.push({ userId: client, info: socketList[client] });
                });
                socket.broadcast.to(roomId).emit('FE-user-join', users);
            } catch (e) {
                io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
            }
        });
    });

    socket.on('BE-call-user', ({ userToCall, from, signal }) => {
        io.to(userToCall).emit('FE-receive-call', {
            signal,
            from,
            info: socketList[socket.id]
        });
    });

    socket.on('BE-accept-call', ({ signal, to }) => {
        io.to(to).emit('FE-call-accepted', {
            signal,
            answerId: socket.id
        });
    });

    socket.on('BE-send-message', ({ roomId, msg, sender }) => {
        io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
    });

    socket.on('BE-leave-room', ({ roomId, leaver }) => {
        delete socketList[socket.id];
        socket.broadcast.to(roomId).emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
        io.sockets.sockets[socket.id].leave(roomId);
    });

    socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
        if (switchTarget === 'video') {
            socketList[socket.id].video = !socketList[socket.id].video;
        } else {
            socketList[socket.id].audio = !socketList[socket.id].audio;
        }
        socket.broadcast.to(roomId).emit('FE-toggle-camera', { userId: socket.id, switchTarget });
    });
});

export { server };
