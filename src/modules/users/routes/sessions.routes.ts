import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionController from '../controller/SessionController';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionController.create,
);

export default sessionRoutes;
