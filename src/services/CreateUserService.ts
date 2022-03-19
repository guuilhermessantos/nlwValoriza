
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute ({ name, email, admin = false, password} : IUserRequest) {

        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {   // verifica se o email  esta preenchido
            throw new Error ("Email incorrect"); // se nao estiver lança um erro
        }

        const userAlreadyExists = await usersRepository.findOne({ // verifica se o usuario ja existe
            email
        })

        if ( userAlreadyExists ) { // se existir lança um erro
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({ // criando instancia
            name,
            email,
            admin,
            password: passwordHash,
        })

        await usersRepository.save(user) // salvando objeto no BD

        return user;

    }
}

export { CreateUserService }

