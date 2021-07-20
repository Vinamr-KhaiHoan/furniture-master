import { API_DOMAIN, CATEGORY_OUTPUT, CATEGORY_WORKFLOW, TYPES } from "../../../const";
import { IFindCategoryByIdInput, IFindCategoryByIdOutput } from "../../../controller";
import { CategoryDomain } from "../../../domain";
import { ICategoryRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdWorkflow, ICreateWorkflow } from "../../base";

export interface IFindCategoryByIdWorkflow extends ICreateWorkflow<CategoryDomain, IFindCategoryByIdInput, IFindCategoryByIdOutput> { }

@singletonNamedProvide(TYPES.WORKFLOW, CATEGORY_WORKFLOW.FIND_BY_ID)
export class FindCategoryByIdWorkflow extends FindByIdWorkflow<CategoryDomain, IFindCategoryByIdInput, IFindCategoryByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.CATEGORY;
    }

    get id() {
        return CATEGORY_WORKFLOW.FIND_BY_ID;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
        repository: ICategoryRepository
    ) {
        super(repository)
    } 
}