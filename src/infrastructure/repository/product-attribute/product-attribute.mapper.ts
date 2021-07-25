import { API_DOMAIN, TYPES } from "../../../const";
import { ProductAttributeDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IProductAttributeMapper extends IDataMapper<ProductAttributeDomain> { }

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.PRODUCT_ATTRIBUTE)
export class ProductAttributeMapper extends BaseDatabMapper<ProductAttributeDomain> implements IProductAttributeMapper {
    protected entityType = API_DOMAIN.PRODUCT_ATTRIBUTE;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'productId',
            'attributeId',
            'status',
            'createdAt',
            'updatedAt',
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'id',
            'productId',
            'attributeId',
            'status',
            'createdAt',
            'updatedAt',
        ]

        return toDatabaseFields;
    }
}