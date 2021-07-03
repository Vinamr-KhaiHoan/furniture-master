
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from '../../..';
import { DATABASE, TABLE, TYPES } from '../../../../../const';
import { IUserDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IUserInstance extends ModelInstance<IUserDomain> {}

@singletonNamedProvide(TYPES.TABLE, DATABASE.PRODUCT)
export class UserModel extends BasePostgresTable<IUserDomain, IUserInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IUserInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "user_id"
            },
            firstName: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'user_firstname'
            },
            lastName: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'user_lastname'
            },
            email: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'user_email'
            },
            isSuperAdmin: {
                type: DatabaseDataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'user_is_superadmin'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'user_status'
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

        return attributes
    }

    get tableName() {
        return 'user'
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.USER
        }

        return options
    }
}