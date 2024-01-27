import { Router } from 'express';
import cardsRoutes from '../../../../modules/cards/infra/http/routes';
import categoryRoutes from '../../../../modules/categories/infra/http/routes';
import userRoutes from '../../../../modules/users/infra/http/routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/card', cardsRoutes);

export { router };
