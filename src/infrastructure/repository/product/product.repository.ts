import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { ProductDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IProductMapper } from "./product.mapper";

export interface IProductRepository extends IRepository<ProductDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
export class ProductRepository extends BasePostgresRepository<ProductDomain> implements IProductRepository {
    model: DatabaseModel<ProductDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.CATEGORY)
    protected mapper: IProductMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.product;
    }
}