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
    // console.log('App listening on port: ' + port);
});

export { server };
