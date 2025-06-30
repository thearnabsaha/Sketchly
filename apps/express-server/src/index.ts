import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3001;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
const morganFormat = ':method :url :status :response-time ms';
app.use(morgan(morganFormat));
app.use(helmet());
import userRoutes from './routes/user.routes'
import shapeRoutes from './routes/shape.routes'
import roomRoutes from './routes/room.routes'
import { CORS_ORIGIN } from './utils/config';
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/',userRoutes);
app.use('/shape/',shapeRoutes);
app.use('/room/',roomRoutes);
app.listen(port, () => console.log('> Server is up and running on port: ' + port));