import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { DATABASE, TABLE, TYPES } from '../../../../../const';
import { OrderItemDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IOrderItemInstance extends ModelInstance<OrderItemDomain> {}

@singletonNamedProvide(TYPES.DATABASE, DATABASE.ORDER_ITEM)
export class OrderItemModel extends BasePostgresTable<OrderItemDomain, IOrderItemInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IOrderItemInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'order_item_id'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id'
            },
            orderId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'order_id' 
            },
            quantity: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'quantity'
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
        return 'orderItem'
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.ORDER_ITEM
        }

        return options
    }
}