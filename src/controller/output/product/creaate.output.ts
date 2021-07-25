import { Request } from "express";
import { PRODUCT_OUTPUT } from "../../../const";
import { IProductDomain, ProductDomain } from "../../../domain";
import { singletonProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateProductOutput extends ICreateOutput<ProductDomain> {
    product: IProductDomain;
}

@singletonProvide(PRODUCT_OUTPUT.CREATE)
export class CreateProductOutput extends CreateOutput<ProductDomain> implements ICreateProductOutput {
    constructor(output: ICreateProductOutput) {
        super(output)
    }

    get product() {
        return this.entity.json();
    }

    get response() {
        const {
            message,
            product
        } = this;

        return {
            message,
            product
        }
    }
}