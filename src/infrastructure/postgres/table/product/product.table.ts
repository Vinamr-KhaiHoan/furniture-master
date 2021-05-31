import { DATABASE, NAMES, TABLE, TYPES } from '../../../../const';
import { injectable, namedInject, singletonNamedProvide } from '../../../ioc'
import { BasePostgresTable, DataTypes, Model, ModelAttributes, ModelOptions, Sequelize } from '../../../orm';

export interface IProductInstance extends Model {
    id: number
}

class ProductPostgresTable extends BasePostgresTable<IProductInstance> {
    get tableName() {
        return TABLE.PRODUCT
    }

    get attributes() {
        const attributes: ModelAttributes = {
            id: {
                field: 'product_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            image: {
                field: 'product_image',
                type: DataTypes.STRING,
                allowNull: false
            },
            isOnSell: {
                field: 'product_is_on_sell',
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            isBestSeller: {
                field: 'product_is_best_seller',
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            name: {
                field: 'product_name',
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                field: 'product_slug',
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                field: 'product_description',
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE,
                allowNull: false
            }
        }

        return attributes
    }

    get options() {
        const options: ModelOptions<Model<IProductInstance>> = {
            tableName: 'furniture_product',
            timestamps: true
        }
        return options
    }
}

@singletonNamedProvide(TYPES.TABLE, DATABASE.PRODUCT_WRITE)
export class WriteProductTable extends ProductPostgresTable {
    constructor(
        @namedInject(TYPES.SEQUELIZE, NAMES.POSTGRES_INFO_WRITE)
        postgres: Sequelize
    ) {
        super();

        this.postgres = postgres;
    }
}


@singletonNamedProvide(TYPES.TABLE, DATABASE.PRODUCT_READ)
export class ReadProductTable extends ProductPostgresTable {
    constructor(
        @namedInject(TYPES.SEQUELIZE, NAMES.POSTGRES_INFO_READ)
        postgres: Sequelize
    ) {
        super();

        this.postgres = postgres;
    }
}

