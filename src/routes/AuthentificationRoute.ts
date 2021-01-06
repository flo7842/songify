import { Router } from 'express';

import { AuthController } from '../controller/AuthController';
import { registerMidd, authMidd, loginMidd } from '../middlewares/auth.middleware';
var bouncer = require ("express-bouncer")(500, 900000);

const route: Router = Router();

route.get('/', authMidd, (req: any, res: any) => {
    return res.end('<h1>You signed in correctly!</h1>');
})






route.post('/register', registerMidd, AuthController.register);
route.post('/login', loginMidd, AuthController.login);

export { route as AuthentificationRoute }