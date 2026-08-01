import express, {Application, Request, Response, NextFunction} from 'express';
import usersRouter from './routes/user.route';
import notesRouter from './routes/note.route';
import subjectsRouter from './routes/subject.route';
import authRouter from './routes/auth.route';
import noticeRouter from './routes/notice.route';
import reviewRouter from './routes/review.route';
import {errorHandler} from './middlewares/errorHandler.middleware';
import AppError from './utils/customError.utils';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

//health route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        message: "server is up and running",
        status: "success",
        success: true,
        data: null,
    });
});

app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);
app.use('/api/subjects', subjectsRouter);
app.use('/api/auths', authRouter);
app.use('/api/notices', noticeRouter);
app.use('/api/reviews', reviewRouter);

//path not found
app.use((req: Request, res: Response, next: NextFunction) => {
    const message = `Can not ${req.method} on ${req.path}`;
    next(new AppError(message, 404));
});

//error handling middleware
app.use(errorHandler);

export default app;