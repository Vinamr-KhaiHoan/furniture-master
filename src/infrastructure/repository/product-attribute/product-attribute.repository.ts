import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { ProductAttributeDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IProductAttributeMapper } from "./product-attribute.mapper";

export interface IProductAttributeRepository extends IRepository<ProductAttributeDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_ATTRIBUTE)
export class ProductAttributeRepository extends BasePostgresRepository<ProductAttributeDomain> implements IProductAttributeRepository {
    model: DatabaseModel<ProductAttributeDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.CATEGORY)
    protected mapper: IProductAttributeMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.product;
    }
}