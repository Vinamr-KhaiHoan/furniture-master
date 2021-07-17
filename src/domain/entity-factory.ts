import { API_DOMAIN, TYPES } from '../const';
import { IDomain } from '../infrastructure/base/domain';
import { singletonProvide } from '../infrastructure/ioc';
import { AddressDomain } from './address';
import { AttributeDomain } from './attribute';
import { CaterogyDomain } from './category';
import { ChannelDomain } from './channel';
import { CustomerDomain } from './customer/customer.domain';
import { ImageDomain } from './image';
import { MetadataDomain } from './metadata';
import { OrderDomain } from './order';
import { OrderItemDomain } from './order-item';
import { PermissionDomain } from './permission';
import { ProductDomain } from './product';
import { ProductAttributeDomain } from './product-attribute';
import { ProductCategoryDomain } from './product-caterogy/product-category.domain';
import { ProductImageDomain } from './product-image';
import { SourceDomain } from './source';
import { UserDomain } from './user';

export interface IEntityFactory {
    create(type: string, data: any): IDomain
}

@singletonProvide(TYPES.ENTITY_FACTORY)
export class EntityFactory {
    create(type: string, data:any) {
        switch(type) {
            case API_DOMAIN.USER.toString(): 
            return new UserDomain(data);

            case API_DOMAIN.PRODUCT.toString(): 
            return new ProductDomain(data);

            case API_DOMAIN.CATEGORY.toString(): 
            return new CaterogyDomain(data);

            case API_DOMAIN.ATTRIBUTE.toString(): 
            return new AttributeDomain(data);

            case API_DOMAIN.PRODUCT_CATEGORY.toString(): 
            return new ProductCategoryDomain(data);

            case API_DOMAIN.PRODUCT_ATTRIBUTE.toString(): 
            return new ProductAttributeDomain(data);

            case API_DOMAIN.ADDRESS.toString(): 
            return new AddressDomain(data);
            
            case API_DOMAIN.CHANNEL.toString(): 
            return new ChannelDomain(data);
            
            case API_DOMAIN.CUSTOMER.toString(): 
            return new CustomerDomain(data);

            case API_DOMAIN.IMAGE.toString(): 
            return new ImageDomain(data);

            case API_DOMAIN.METADATA.toString(): 
            return new MetadataDomain(data);

            case API_DOMAIN.ORDER.toString(): 
            return new OrderDomain(data);
            
            case API_DOMAIN.ORDER_ITEM.toString(): 
            return new OrderItemDomain(data);

            case API_DOMAIN.PERMISSION.toString(): 
            return new PermissionDomain(data);

            case API_DOMAIN.PRODUCT_IMAGE.toString(): 
            return new ProductImageDomain(data);

            case API_DOMAIN.SOURCE.toString(): 
            return new SourceDomain(data);
            
            default: throw new Error(`${type} is not suppported.`)
        }
    }
}