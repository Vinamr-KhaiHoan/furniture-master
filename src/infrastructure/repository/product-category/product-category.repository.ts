import { DatabaseModel, IDatabase } from "../../database";
import { TYPES, API_DOMAIN, NAMES } from "../../../const";
import { ProductCategoryDomain } from "../../../domain";
import { singletonNamedProvide, namedInject } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IProductCategoryMapper } from "./product-category.mapper";

export interface IProductCategoryRepository extends IRepository<ProductCategoryDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
export class ProductCategoryRepository extends BasePostgresRepository<ProductCategoryDomain> implements IProductCategoryRepository {
    model: DatabaseModel<ProductCategoryDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.CATEGORY)
    protected mapper: IProductCategoryMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.productCategory;
    }
}