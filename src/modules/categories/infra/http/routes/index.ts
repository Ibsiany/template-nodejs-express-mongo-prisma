import { Router } from 'express';
import { CreateCategoryController } from '../controllers/CreateCategoryController';
import { DeleteCtegoryController } from '../controllers/DeleteCtegoryController';
import { GetCategoriesController } from '../controllers/GetCategoriesController';

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const deleteCtegoryController = new DeleteCtegoryController();
const getCategoriesController = new GetCategoriesController();

categoryRoutes.post('/:user_id', createCategoryController.handle);
categoryRoutes.delete('/:id', deleteCtegoryController.handle);
categoryRoutes.get('/:user_id', getCategoriesController.handle);

export default categoryRoutes;
