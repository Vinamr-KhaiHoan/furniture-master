import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from '../../..';
import { DATABASE, TABLE, TYPES } from '../../../../../const';
import { IProductDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IProductInstance extends ModelInstance<IProductDomain> {}

@singletonNamedProvide(TYPES.TABLE, DATABASE.PRODUCT)
export class ProductModel extends BasePostgresTable<IProductDomain, IProductInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'product_id'
            },
            image: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'product_image'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_status'
            },
            slug: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'product_slug'
            },
            description: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'product_description'
            },
            createdAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            createdBy: {
                type: DatabaseDataTypes.NUMBER,
                allowNull: true,
                field: 'created_by'
            },
            updatedAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            },
            updatedBy: {
                type: DatabaseDataTypes.NUMBER,
                allowNull: true,
                field: 'updated_by'
            }
        }

        return attributes;
    }

    get tableName() {
        return 'product'
    }
    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT
        }

        return options
    }
}