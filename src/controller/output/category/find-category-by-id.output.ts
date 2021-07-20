import { CATEGORY_OUTPUT } from "../../../const";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindCategoryByIdOutput extends IFindByIdOutput<CategoryDomain> {
    category: ICategoryDomain;
}

@constructorProvide(CATEGORY_OUTPUT.FIND_BY_ID)
export class FindCategoryByIdOutput extends FindByIdOutput<CategoryDomain> implements IFindCategoryByIdOutput {
    constructor(output: IFindCategoryByIdOutput) {
        super(output)
    }

    get category() {
        return this.output.entity.json();
    }

    get response() {
        const {
            message,
            category
        } = this;

        return {
            message,
            category
        }
    }
}