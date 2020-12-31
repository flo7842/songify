import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';

import PasswordException from '../exception/PasswordException';
import User from "../models/User";
import Personne from "../models/Personne";

export class AuthController {

    static login = async(req: Request, res: Response) => {
        
        let data: any = req.body;

        try{
            let user: any = await User.select({email: data.email});

            if (user.length < 0)
                throw new Error(`Email doesn't exist!`);

            user = user[0];

            const isOk = await PasswordException.comparePassword(data.password, user.password);

            if(!isOk)
                throw new Error('Password is not correct!');

            const theToken: any = await sign({ id: user.personne_id, name: user.fullname }, <string> process.env.JWT_KEY, { expiresIn: '1m' });

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
                throw new Error('Email already exists!');

            const personne = new Personne(null, data.prenom, data.nom, data.dateNaiss, data.pays, data.adresse, data.ville, data.zipcode);
            await personne.save();
            const pass = await PasswordException.hashPassword(data.password);
            const user = new User(personne, data.email, pass);
            await user.save();

            const theToken: any = await sign({ id: user.id, name: user.fullname }, <string>process.env.JWT_KEY, {expiresIn: '1m'})

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