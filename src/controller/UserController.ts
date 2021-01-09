import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import PasswordException from '../exception/PasswordException';
import User from "../models/User";

export class UserController {

    /**
     *
     *
     * @static
     * @memberof UserController
     */
    static update = async(req: Request, res: Response) => {

        
        
        let data: any = req.body;
         try{

            const pass = await PasswordException.hashPassword(data.user_password);
            const user = new User(data.id, data.firstname, data.lastname, data.email, pass, data.date_naissance, data.sexe, data.subscription, data.createdat, data.updateat, data.roles);
            
            await user.update();

            const theToken: any = await sign({ id: user.id, name: user.fullname }, <string>process.env.JWT_KEY, {expiresIn: '5m'})

            const token = {
                token: theToken,
                expired: await (<any> decode(theToken)).exp
            }


            return res.status(201).json( { error: false, message: "Vos données ont été mises à jour"});

        } catch (err){
            
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    

   
}