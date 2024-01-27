import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { GetUserByIdController } from '../controllers/GetUserByIdController';
import { SessionController } from '../controllers/SessionController';
import { UpdateUserController } from '../controllers/UpdateUserController';

const userRoutes = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const sessionController = new SessionController();
const getUserByIdController = new GetUserByIdController();

userRoutes.post('/', upload.single('file'), createUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);
userRoutes.patch('/', upload.single('file'), updateUserController.handle);
userRoutes.get('/:id', getUserByIdController.handle);
userRoutes.post('/session', sessionController.handle);

export default userRoutes;
