import { IDomain } from "../../infrastructure/base/domain";

export interface IProductCategory {
    productId: number;
    categoryId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductCategoryDomain extends IDomain, IProductCategory {}