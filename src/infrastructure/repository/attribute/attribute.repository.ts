import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { AttributeDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IDataMapper, IRepository } from "../base";

export interface IAttributeRepository extends IRepository<AttributeDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
export class AttributeRepository extends BasePostgresRepository<AttributeDomain> implements IAttributeRepository {
    model: DatabaseModel<AttributeDomain>;
    
    @namedInject(TYPES.MAPPER, API_DOMAIN.ATTRIBUTE)
    protected mapper: IDataMapper<AttributeDomain> 

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.attribute;
    }
}