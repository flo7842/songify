import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import MySQL, { jointureInterface } from "../db/MySQL";
import PasswordException from '../exception/PasswordException';
import User from "../models/User";

export class AuthController {

    static login = async(req: Request, res: Response) => {
        
        let data: any = req.body;
        try{
            let users: any = await User.select(data.email);
            
            
            if (users.length < 0){
                throw new Error(`Email doesn't exist!`);
            }
           
            
                
                const isOk = await PasswordException.comparePassword(data.user_password, users[0].user_password);
                console.log(isOk)
                if(!isOk){
                    throw new Error('Password is not correct!');
                }
                console.log(isOk)
                

                const theToken: any = await sign({ id: users.id, name: users.fullname }, <string> process.env.JWT_KEY, { expiresIn: '5m' });
        
                const token = {
                    token: theToken,
                    expired: await (<any> decode(theToken)).exp
                }
                console.log('connecté');
            
            
            return res.status(201).json(token);
                

                
                
                
         
            
            
                //let userConnected = user[i];
                //console.log(userConnected)
            
            


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

        
            
            //   if (await User.isExiste(data.email))
            //       throw new Error('Email already exists!');

            const pass = await PasswordException.hashPassword(data.user_password);
            const user = new User(data.id, data.firstname, data.lastname, data.email, pass, data.date_naissance, data.sexe, data.subscription, data.createdat, data.updateat, data.roles);
            await user.save();
            console.log(user)
            

            const theToken: any = await sign({ id: user.id, name: user.fullname }, <string>process.env.JWT_KEY, {expiresIn: '5m'})

            const token = {
                token: theToken,
                expired: await (<any> decode(theToken)).exp
            }
            return res.status(201).json(token);

        } catch (err){
            
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    refreshToken = async (req: Request, res: Response) => {}
    checkToken = async (req: Request, res: Response) => {}
    logout = async (req: Request, res: Response) => {}
}