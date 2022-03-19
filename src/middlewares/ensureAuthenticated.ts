import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Receber o token

    const authToken = request.headers.authorization;
    
    // validar se o token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    // 
    // Validar se token é valido

    const [,token] = authToken.split(" ")
    
    try {
        const { sub } = verify(token, "94883e4d8e916cc12fc28f4eea76f08b") as IPayload;

        request.user_id = sub;
        
        return next();
    } catch (err) {
        return response.status(401).end();
        
    }

    




     // Recuperar informações do usuário
}