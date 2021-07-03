import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { DATABASE, TABLE, TYPES } from '../../../../../const';
import { ICategoryDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface ICategoryInstance extends ModelInstance<ICategoryDomain> {}

@singletonNamedProvide(TYPES.DATABASE, DATABASE.CATEGORY)
export class CategoryModel extends BasePostgresTable<ICategoryDomain, ICategoryInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<ICategoryInstance> = {
            id: {
                type: DatabaseDataTypes.STRING,
                primaryKey: true,
                autoIncrement: true,
                field: 'category_id'
            },
            image: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'category_image'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'category_name'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'category_status',
            },
            description: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'category_description'
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
        return 'category'
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.CATEGORY
        }

        return options
    }
}