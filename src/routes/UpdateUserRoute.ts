import { Router } from 'express';
import { Request, Response } from 'express';
import { UserController } from '../controller/UserController';
import { registerMidd, authMidd, loginMidd } from '../middlewares/auth.middleware';



const route: Router = Router();

route.put('/user', UserController.update);

export { route }