import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import MySQL from "../db/MySQL";
import PasswordException from '../exception/PasswordException';
import User from "../models/User";

export class AuthController {

    static login = async(req: Request, res: Response) => {
        
        
        let data: any = req.body;

        try{

            let users: any = await MySQL.select(data.email);
       
            
            if (users.length <= 0){
                throw new Error('L\'adresse email n\'existe pas');1
            }
           
  
            const isOk = await PasswordException.comparePassword(data.user_password, users[0].user_password);
        
            if(!isOk){
                throw new Error('Password is not correct!');
            }
         

            const theToken: any = await sign({ id: users.id, name: users.fullname }, <string> process.env.JWT_KEY, { expiresIn: '5m' });
    
            const token = {
                token: theToken,
                expired: await (<any> decode(theToken)).exp
            }
       
            return res.status(201).json(token);
      
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    /**
     *
     *
     * @static
     * @memberof AuthController
     */
    static register = async(req: Request, res: Response) => {
        
        let data: any = req.body;
         try{

        
            
            if (await User.isExiste(data.email))
                throw new Error('Un compte utilisant cette adresse email est déjà enregistré');

            
            const pass = await PasswordException.hashPassword(data.user_password);
            const user = new User(data.id, data.firstname, data.lastname, data.email, pass, data.date_naissance, data.sexe, data.subscription, data.createdat, data.updateat, data.roles);
            
            
            await user.save();
            console.log(user)
            

            const theToken: any = await sign({ id: user.id, name: user.fullname }, <string>process.env.JWT_KEY, {expiresIn: '5m'})

            const token = {
                token: theToken,
                expired: await (<any> decode(theToken)).exp
            }

            return res.status(201).json( { error: false, message: "L'utilisateur a bien été crée avec succès", "user": {
                    "firstname": data.firstname,
                    "name": data.lastname,
                    "email": data.email,
                    "sexe": data.sexe,
                    "role": data.roles,
                    "dateNaissance": data.date_naissance,
                    "subscription": data.subscription
                }, 
                token
            });

        } catch (err){
            
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
    
}