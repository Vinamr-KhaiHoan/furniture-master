import { inject, namedInject, singletonNamedProvide } from '../../ioc';
import { DATABASE, LOGGER, NAMES, TABLE, TYPES } from "../../../const";
import { IConfiguration, ILog, ILogger } from "../../utils";
import { Sequelize } from "sequelize";
import { DatabaseModels } from '../index';
import { IBasePostgresTable } from './tables/base';
import { IAttributeDomain, ICategoryDomain, IProductAttributeDomain, IProductCategoryDomain, IProductDomain, IUserDomain } from '../../../domain';
import { IAttributeInstance, ICategoryInstance, IProductAttributeInstance, IProductCategoryInsance, IProductInstance, IUserInstance } from './tables';


export interface IDatabase {
    authenticate(): Promise<void>;
}

@singletonNamedProvide(TYPES.DATABASE, NAMES.POSTGRES)
export class PostgresDatabase {
    private conn: Sequelize;
    public dbModels: DatabaseModels;

    get connection() {
        return this.conn
    }

    get id() {
        return NAMES.POSTGRES
    }

    constructor(
        @inject(TYPES.CONFIG) protected config: IConfiguration,
        @inject(TYPES.LOGGER) protected logger: ILogger,


        @namedInject(TYPES.DATABASE, DATABASE.USER)
        protected userModel: IBasePostgresTable<IUserDomain, IUserInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.PRODUCT)
        protected productModel: IBasePostgresTable<IProductDomain, IProductInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.CATEGORY)
        protected categoryModel: IBasePostgresTable<ICategoryDomain, ICategoryInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.USER)
        protected attributeModel: IBasePostgresTable<IAttributeDomain, IAttributeInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.PRODUCT_CATEGORY)
        protected productCaterogyModel: IBasePostgresTable<IProductCategoryDomain, IProductCategoryInsance>,

        @namedInject(TYPES.DATABASE, DATABASE.USER)
        protected productAttributeModel: IBasePostgresTable<IProductAttributeDomain, IProductAttributeInstance>
    ) {
        const dbConfig = this.config.get('postgres.info.write')
        this.log.info(dbConfig)
        try {

            this.conn = new Sequelize(dbConfig)
            this.initialModels()

        } catch (err) {
            this.log.error(err.message)
            process.exit()
        }
    }

    get log(): ILog {
        const databaseLogger = Symbol.keyFor(LOGGER.INFRASTRUCTURE)
        const id = Symbol.keyFor(this.id)

        return this.logger.get(databaseLogger, id)
    }

    public authenticate() {
        return this.conn.authenticate()
    }

    private initialModels() {
        const dbModels: DatabaseModels = {
            user: this.userModel.define(this.conn),
            product: this.productModel.define(this.conn),
            category: this.categoryModel.define(this.conn),
            attribute: this.attributeModel.define(this.conn),
            productAttribute: this.productAttributeModel.define(this.conn),
            productCategory: this.productCaterogyModel.define(this.conn)
        }
    }
}