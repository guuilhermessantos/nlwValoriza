import { Exclude } from "class-transformer";
import { Entity, PrimaryColumn,  Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid" // definindo um nome ao v4 gerador de id


@Entity("users") // referenciando a tabela ("users")
class User {
    @PrimaryColumn()
    readonly id: string; // readonly - somente leitura

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Exclude()
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    constructor() {
        if (!this.id) { // acessando atributo de uma classe com o this.
            this.id = uuid();
        } 
    }
}


export { User };

/**
 * Entidade < - > ORM < - > BD (users)
 *          Repositories
 */

