import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OrderController from '../controller/OrderController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.use(isAuthenticated);

orderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.show,
);

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customer_id: Joi.string().required(),
      products: Joi.required(),
    }),
  }),
  orderController.create,
);

export default orderRoutes;
