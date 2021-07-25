import { Request } from "express";
import { PRODUCT_INPUT } from "../../../const";
import { IProduct } from "../../../domain";
import { singletonProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateProductInput extends ICreateInput, IProduct {}

@singletonProvide(PRODUCT_INPUT.CREATE)
export class CreateProductInput extends CreateInput<ICreateProductInput> implements ICreateProductInput {
    constructor(req: Request) {
        super(req)
    }

    get image() {
        return this.input.image;
    }

    get name() {
        return this.input.name;
    }

    get status() {
        return this.input.status;
    }

    get slug() {
        return this.input.slug;
    }

    get description() {
        return this.input.description;
    }

    get attributes() {
        return this.input.attributes;
    }

    get categories() {
        return this.input.categories;
    }

    get createdAt() {
        return new Date();
    }

    get createdBy() {
        return 1;
    }

    get updatedAt() {
        return new Date();
    }

    get updatedBy() {
        return 1;
    }
}