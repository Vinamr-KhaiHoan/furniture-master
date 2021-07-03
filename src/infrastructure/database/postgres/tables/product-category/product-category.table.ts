import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { DATABASE, TYPES } from '../../../../../const';
import { IProductCategoryDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IProductCategoryInsance extends ModelInstance<IProductCategoryDomain> {}

@singletonNamedProvide(TYPES.DATABASE, DATABASE.PRODUCT_CATEGORY)
export class ProductCategoryModel extends BasePostgresTable<IProductCategoryDomain, IProductCategoryInsance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductCategoryInsance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'product_attribute_id'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id',
            },
            attributeId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: true,
                field: 'attribute_id'
            },
            createdAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt: {
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
            tableName: 'product_attribute'
        }

        return options
    }

}