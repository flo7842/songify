import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
import { registerMidd, loginMidd, authMidd } from '../middlewares/auth.middleware';

const route: Router = Router();

route.get('/', authMidd, (req: any, res: any) => {
    return res.end('<h1>You signed in correctly!</h1>');
})

route.post('/login', loginMidd, AuthController.login);
route.post('/register', registerMidd, AuthController.register);

export { route as AuthentificationRoute }