import { API_DOMAIN, TYPES } from "../../../const";
import { CategoryDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface ICategoryMapper extends IDataMapper<CategoryDomain> { }

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.CATEGORY)
export class CategoryMapper extends BaseDatabMapper<CategoryDomain> implements ICategoryMapper {
    protected entityType = API_DOMAIN.CATEGORY;

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'image',
            'name',
            'status',
            'description',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt'
        ]

        return toDatabaseFields
    }

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'image',
            'name',
            'status',
            'description',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt'
        ]

        return toEntityFields;
    }
}