import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"
import { classToPlain } from "class-transformer"
import { User } from "../entities/User"





class ListUserService  {
    async execute() {
        const usersRepositories= getCustomRepository(UsersRepositories)
        const users = await usersRepositories.find()

        return classToPlain<User>(users);
    }

}

export { ListUserService }