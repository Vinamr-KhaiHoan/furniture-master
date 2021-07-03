import { IDomain } from "../../infrastructure/base/domain";

export interface IProduct {
    image: string;
    name: string;
    status: number;
    slug: string;
    description: string;
    attributes: number[];
    categories: number[];
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date
}

export interface IProductDomain extends IDomain, IProduct {}

export * from './product.domain';