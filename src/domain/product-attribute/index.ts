import { IDomain } from "../../infrastructure/base/domain";

export interface IProductAttribute {
    productId: number;
    attributeId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductAttributeDomain extends IDomain, IProductAttribute {}

export * from './product-attribute.domain';