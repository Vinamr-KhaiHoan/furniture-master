import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from "../../..";
import { DATABASE, TABLE, TYPES } from "../../../../../const";
import { ProductImageDomain } from "../../../../../domain";
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from "../base";

export interface IProductImageInstance extends ModelInstance<ProductImageDomain> {}

@singletonNamedProvide(TYPES.DATABASE, DATABASE.PRODUCT_IMAGE)
export class ProductImageModel extends BasePostgresTable<ProductImageDomain, IProductImageInstance> {
    get attributes() {
        const attibutes: DatabaseModelAttributes<IProductImageInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'product_image_id'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'status'
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

        return attibutes;
    }

    get tableName() {
        return 'productImage'
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT_IMAGE
        }

        return options;
    }
}
