import { Router } from 'express';
import { Request, Response } from 'express';
import { UserController } from '../controller/UserController';
import { userMidd } from '../middlewares/user.middleware';




const route: Router = Router();

route.get('/', userMidd, (req: any, res: any) => {
    return res.end('<h1>You signed in correctly!</h1>');
})

route.put('/user', userMidd, UserController.update);

export { route as UpdateUserRoute }