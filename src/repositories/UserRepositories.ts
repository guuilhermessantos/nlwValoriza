import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User)
class UsersRepositories extends Repository<User>{  // extendendo metodos de outra classe
    
}

export { UsersRepositories};