import { API_DOMAIN, TYPES, USER_WORKFLOW } from "../../../const";
import { ICreateProductInput, ICreateProductOutput } from "../../../controller";
import { IProductDomain, ProductDomain } from "../../../domain";
import { IProductAttributeRepository, IProductCategoryRepository, IProductRepository, Operators } from "../../../infrastructure";
import { namedInject } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateProductWorkflow extends ICreateWorkflow<IProductDomain, ICreateProductInput, ICreateProductOutput> { }

export class CreateProductWorkflow extends CreateWorkflow<IProductDomain, ICreateProductInput, ICreateProductOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return USER_WORKFLOW.CREATE
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_ATTRIBUTE)
    protected productAttributeRepository: IProductAttributeRepository

    
    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
    protected productCategoryCategory: IProductCategoryRepository

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
        protected repository: IProductRepository
    ) {
        super(repository)
    }

    async validate(entity: IProductDomain): Promise<void> {
        const isExisted = await this.repository.find({
            filters: [
                { code: 'name', operator: Operators.Equals, value: [entity.name] }
            ]
        })

        if(isExisted.length > 0) {
            throw this.errorFactory.unauthorizedError(`This Product name: ${entity.name} is alread existed.`)
        }
    }

    async execute(input: ICreateProductInput): Promise<ICreateProductOutput> {
        return await super.execute(input)

        
    }
}