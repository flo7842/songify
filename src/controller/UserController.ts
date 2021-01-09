import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import MySQL, { jointureInterface } from "../db/MySQL";
import PasswordException from '../exception/PasswordException';
import User from "../models/User";

export class UserController {

    /**
     *
     *
     * @static
     * @memberof AuthController
     */
    static update = async(req: Request, res: Response) => {

        
        
        let data: any = req.body;
         try{

        
            
            //   if (await User.isExiste(data.email))
            //       throw new Error('Un compte utilisant cette adresse email est déjà enregistré');
            
            const pass = await PasswordException.hashPassword(data.user_password);
            const user = new User(data.id, data.firstname, data.lastname, data.email, pass, data.date_naissance, data.sexe, data.subscription, data.createdat, data.updateat, data.roles);
            
            await user.update();
            
            

            const theToken: any = await sign({ id: user.id, name: user.fullname }, <string>process.env.JWT_KEY, {expiresIn: '5m'})

            const token = {
                token: theToken,
                expired: await (<any> decode(theToken)).exp
            }

            var dateNow = new Date();
            var d = new Date,
            dformat = [d.getMonth()+1,
                       d.getDate(),
                       d.getFullYear()].join('/')+' '+
                      [d.getHours(),
                       d.getMinutes(),
                       d.getSeconds()].join(':');

            

            return res.status(201).json( { error: false, message: "L'utilisateur a bien été modifié avec succès", "user": {
                    "firstname": data.firstname,
                    "name": data.lastname,
                    "email": data.email,
                    "sexe": data.sexe,
                    "role": data.roles,
                    "dateNaissance": data.date_naissance,
                    "createdAt": data.createdat,
                    "updateAt": data.updateat,
                    "subscription": data.subscription
                }, 
                token
            });

        } catch (err){
            
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
}