import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';


const split = (token: string) => { return token.split('Bearer ').join('') }

export const userMidd = (req: Request, res: Response, next: () => void) => {

    // Check authorization token valid
    try{
        if (req.headers.authorization && verify(split(req.headers.authorization), <string>process.env.JWT_KEY))
            return next();
        else
            throw new Error(`Authorization not found`);
    } catch (err) {
        return res.status(401).json({ error: true, message: "Votre token n'est pas correct" }).end();
    }
}


