import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { DATABASE, TABLE, TYPES } from '../../../../../const';
import { IAttributeDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IAttributeInstance extends ModelInstance<IAttributeDomain> {}

@singletonNamedProvide(TYPES.DATABASE, DATABASE.ATTRIBUTE)
export class AttributeModel extends BasePostgresTable<IAttributeDomain, IAttributeInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IAttributeInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'attribute_id'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'attribute_name'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'attribute_status'
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
        return 'attribute'
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.ATTRIBUTE
        }

        return options
    }
}