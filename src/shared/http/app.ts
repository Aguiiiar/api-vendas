import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/http/errors/AppError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import logger from '@lib/logger';
import { pagination } from 'typeorm-pagination';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use('/api/v1', routes);

app.use(errors());
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    logger.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export default app;
