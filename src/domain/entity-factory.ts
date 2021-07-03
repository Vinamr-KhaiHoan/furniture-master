import { API_DOMAIN, TYPES } from '../const';
import { IDomain } from '../infrastructure/base/domain';
import { singletonProvide } from '../infrastructure/ioc';
import { AttributeDomain } from './attribute';
import { CaterogyDomain } from './category';
import { ProductDomain } from './product';
import { ProductAttributeDomain } from './product-attribute';
import { ProductCategoryDomain } from './product-caterogy';
import { UserDomain } from './user';

export interface IEntityFactory {
    create(type: string, data: any): IDomain
}

@singletonProvide(TYPES.ENTITY_FACTORY)
export class EntityFactory {
    create(type: string, data:any) {
        switch(type) {
            case API_DOMAIN.USER.toString(): return new UserDomain(data);

            case API_DOMAIN.PRODUCT.toString(): return new ProductDomain(data);

            case API_DOMAIN.CATEGORY.toString(): return new CaterogyDomain(data);

            case API_DOMAIN.ATTRIBUTE.toString(): return new AttributeDomain(data);

            case API_DOMAIN.PRODUCT_CATEGORY.toString(): return new ProductCategoryDomain(data);

            case API_DOMAIN.PRODUCT_ATTRIBUTE.toString(): return new ProductAttributeDomain(data);
            
            default: throw new Error(`${type} is not suppported.`)
        }
    }
}