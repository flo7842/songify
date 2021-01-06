import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

// import DateException from "../exception/DateException";
import EmailException from "../exception/EmailException";
import PasswordException from "../exception/PasswordException";

const split = (token: string) => { return token.split('Bearer ').join('') }

export const authMidd = (req: Request, res: Response, next: () => void) => {

    try{
        if (req.headers.authorization && verify(split(req.headers.authorization), <string>process.env.JWT_KEY))
            return next();
        else
            throw new Error(`Authorization not found`);
    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
}

export const registerMidd = (req: any, res: any, next: () => void) => {

    let data: any = req.body;
    if (data && data.length === 0) {
        console.log('vide')
    }
    const requiredFields = ['id','firstname', 'lastname', 'email', 'user_password', 'date_naissance', 'sexe', 'subscription', 'createdat', 'updateat', 'roles'];

    try{
        let error: boolean = true;
        let textError: string = '';

        for (const required in requiredFields){
            error = true;

            for (const field in data){
                if(field === requiredFields[required])
                    error = false;
            }

            if (error)
                textError += `${requiredFields[required]}, `;
        }

        if (textError.length > 0){
            textError = textError.slice(0, -2);
            throw new Error(`Les champs ${textError} sont manquants.`);
        }

        // if (EmailException.checkEmail(data.email))
        //     throw new EmailException;
    
         //if (!PasswordException.isValidPassword(data.password))
          //   throw new PasswordException();

        // if (!DateException.checkDate(data.dateNaiss))
        //     throw new DateException();

        next();

    } catch(err) {
        return res.status(401).json({error: true, message: err.message}).end(); // Generate error codes. 401 means unauthorized access.
    }
}

export const loginMidd = (req: any, res: any, next: () => void) => {



    
    let data: any = req.body;
    const requiredFields = ['email', 'user_password'];

    try{
        let error: boolean = true;
        let textError: string = '';

        for (const required in requiredFields){
            error = true;

            for (const field in data){
                if(field === requiredFields[required])
                    error = false;
            }

            if (error)
                textError += `${requiredFields[required]}, `;
        }

        if (textError.length > 0){
            textError = textError.slice(0, -2);
            throw new Error(`Les champs ${textError} sont manquants.`);
        }

        if (EmailException.checkEmail(data.email))
            throw new EmailException;
    
        if (!PasswordException.isValidPassword(data.user_password))
            throw new PasswordException();

        next();

    } catch(err) {
        return res.status(401).json({error: true, message: err.message}).end();
    }
}