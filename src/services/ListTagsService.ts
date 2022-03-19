import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer"
import { Tag } from "../entities/Tag";

class ListTagsService {
    async execute() {

        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tags = await tagsRepositories.find();

        

        return classToPlain<Tag>(tags);
    }
}

export { ListTagsService }