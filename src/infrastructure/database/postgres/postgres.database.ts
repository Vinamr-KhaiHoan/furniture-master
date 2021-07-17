import { inject, namedInject, singletonNamedProvide } from '../../ioc';
import { DATABASE, LOGGER, NAMES, TABLE, TYPES } from "../../../const";
import { IConfiguration, ILog, ILogger } from "../../utils";
import { Sequelize } from "sequelize";
import { DatabaseModels } from '../index';
import { IBasePostgresTable } from './tables/base';
import { AttributeDomain, CaterogyDomain, ProductAttributeDomain, ProductDomain, UserDomain, ProductCategoryDomain, PermissionDomain, MetadataDomain, OrderDomain, OrderItemDomain, ProductImageDomain, SourceDomain, ImageDomain } from '../../../domain';
import { IAttributeInstance, ICategoryInstance, ICustomerInstance, IImageInstance, IMetadataInstance, IOrderInstance, IOrderItemInstance, IPermissionInstance, IProductAttributeInstance, IProductCategoryInsance, IProductImageInstance, IProductInstance, ISourceInstance, IUserInstance } from './tables';
import { CustomerDomain } from '../../../domain/customer/customer.domain';
import { operatorsAliases } from './operator-aliases'

export interface IDatabase {
    dbModels: DatabaseModels;
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
        protected userModel: IBasePostgresTable<UserDomain, IUserInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.PRODUCT)
        protected productModel: IBasePostgresTable<ProductDomain, IProductInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.CATEGORY)
        protected categoryModel: IBasePostgresTable<CaterogyDomain, ICategoryInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.ATTRIBUTE)
        protected attributeModel: IBasePostgresTable<AttributeDomain, IAttributeInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.PRODUCT_CATEGORY)
        protected productCaterogyModel: IBasePostgresTable<ProductCategoryDomain, IProductCategoryInsance>,

        @namedInject(TYPES.DATABASE, DATABASE.PRODUCT_ATTRIBUTE)
        protected productAttributeModel: IBasePostgresTable<ProductAttributeDomain, IProductAttributeInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.PERMISSION)
        protected permissionModel: IBasePostgresTable<PermissionDomain, IPermissionInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.CUSTOMER)
        protected customerModel: IBasePostgresTable<CustomerDomain, ICustomerInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.METADATA)
        protected metadataModel: IBasePostgresTable<MetadataDomain, IMetadataInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.ORDER)
        protected orderModel: IBasePostgresTable<OrderDomain, IOrderInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.ORDER_ITEM)
        protected orderItemModel: IBasePostgresTable<OrderItemDomain, IOrderItemInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.PRODUCT_IMAGE)
        protected productImageModel: IBasePostgresTable<ProductImageDomain, IProductImageInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.SOURCE)
        protected sourceModel: IBasePostgresTable<SourceDomain, ISourceInstance>,

        @namedInject(TYPES.DATABASE, DATABASE.IMAGE)
        protected imageModel: IBasePostgresTable<ImageDomain, IImageInstance>
    ) {
        const dbConfig = {
            ...this.config.get('postgres.info.write'),
            operatorsAliases
        }

        try {

            this.conn = new Sequelize(dbConfig)
            this.initialModels()

        } catch (err) {
            process.exit()
        }
    }

    get log(): ILog {
        const databaseLogger = Symbol.keyFor(LOGGER.INFRASTRUCTURE)
        const id = Symbol.keyFor(this.id)

        return this.logger.get(databaseLogger, id)
    }

    public authenticate() {
        this.conn.authenticate()
        this.sync()
    }

    public sync() {
        return this.conn.sync({ force: true })
    }

    private initialModels() {
        const dbModels: DatabaseModels = {
            user: this.userModel.define(this.conn),
            product: this.productModel.define(this.conn),
            category: this.categoryModel.define(this.conn),
            attribute: this.attributeModel.define(this.conn),
            productAttribute: this.productAttributeModel.define(this.conn),
            productCategory: this.productCaterogyModel.define(this.conn),
            permission: this.permissionModel.define(this.conn),
            customer: this.customerModel.define(this.conn),
            metadata: this.metadataModel.define(this.conn),
            order: this.orderModel.define(this.conn),
            orderItem: this.orderItemModel.define(this.conn),
            productImage: this.productImageModel.define(this.conn),
            source: this.sourceModel.define(this.conn),
            image: this.imageModel.define(this.conn)
        }

        this.dbModels = dbModels
    }
}