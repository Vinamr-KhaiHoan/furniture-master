import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { CategoryDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { ICategoryMapper } from "./category.mapper";

export interface ICategoryRepository extends IRepository<CategoryDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
export class CategoryRepository extends BasePostgresRepository<CategoryDomain> implements ICategoryRepository {
    model: DatabaseModel<CategoryDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.CATEGORY)
    protected mapper: ICategoryMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.category;
    }
}