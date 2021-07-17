import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { DATABASE, TABLE, TYPES } from '../../../../../const';
import { IProductAttributeDomain, ProductAttributeDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IProductAttributeInstance extends ModelInstance<ProductAttributeDomain> {}

@singletonNamedProvide(TYPES.DATABASE, DATABASE.PRODUCT_ATTRIBUTE)
export class ProductAttributeModel extends BasePostgresTable<ProductAttributeDomain, IProductAttributeInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductAttributeInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'product_attribute_id'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id'
            },
            attributeId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'attribute_id'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_attribute_status'
            },
            createdAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt:{
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        }

        return attributes
    }

    get tableName() {
        return 'productAttribute'
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT_ATTRIBUTES
        }

        return options
    }
}