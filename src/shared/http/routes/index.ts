import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import customerRoutes from '@modules/customers/routes/customer.routes';
import passwordRoutes from '@modules/users/routes/password.routes';
import profileRoutes from '@modules/users/routes/profile.routes';
import sessionRoutes from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import orderRoutes from '@modules/orders/routes/order.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes);
routes.use('/customers', customerRoutes);
routes.use('/orders', orderRoutes);

export default routes;
