import { API_DOMAIN, PRODUCT_WORKFLOW, TYPES, USER_WORKFLOW } from "../../../const";
import { IFindProductByIdInput } from "../../../controller/input/product/find-by-id.input";
import { IFindByIdOutput } from "../../../controller/output/base";
import { IFindProductByIdOutput } from "../../../controller/output/product/find-by-id.output";
import { IProductDomain } from "../../../domain";
import { IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdWorkflow, IFindByIdWorkflow } from "../../base";

export interface IFindProductByIdWorkflow extends IFindByIdWorkflow<IProductDomain, IFindProductByIdInput, IFindProductByIdOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_WORKFLOW.FIND_BY_ID)
export class FindProductByIdWorkflow extends FindByIdWorkflow<IProductDomain, IFindProductByIdInput, IFindProductByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return USER_WORKFLOW.FIND_BY_ID;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
        protected repository: IProductRepository
    ) {
        super(repository)
    }

    async execute(input: IFindProductByIdInput): Promise<IFindProductByIdOutput> {
        return super.execute(input)
    }
}