import { Router } from 'express';
import { CreateCardController } from '../controllers/CreateCardController';
import { DeleteCardController } from '../controllers/DeleteCardController';
import { GetCardsController } from '../controllers/GetCardsController';
import { UpdateCardController } from '../controllers/UpdateCardController';

const cardsRoutes = Router();

const createCardController = new CreateCardController();
const updateCardController = new UpdateCardController();
const deleteCardController = new DeleteCardController();
const getCardsController = new GetCardsController();

cardsRoutes.post('/:user_id', createCardController.handle);
cardsRoutes.patch('/:id', updateCardController.handle);
cardsRoutes.delete('/:id', deleteCardController.handle);
cardsRoutes.get('/:user_id', getCardsController.handle);

export default cardsRoutes;
