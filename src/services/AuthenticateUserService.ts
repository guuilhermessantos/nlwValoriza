import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'

import { UsersRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        // verificar se a senha está correta

        const passwordMatch = await compare(password, user.password);

        if (!user) {
            throw new Error("Email/Password incorrect")
        }

        // Gerar token

        const token = sign(
            {
                email: user.email
            },
            "94883e4d8e916cc12fc28f4eea76f08b",
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );

        return token;
    

    }

}

export { AuthenticateUserService }