import { CATEGORY_OUTPUT } from "../../../const";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateCategoryOutput extends ICreateOutput<CategoryDomain> {
    category: ICategoryDomain;
}

@constructorProvide(CATEGORY_OUTPUT.CREATE)
export class CreateCategoryOutput extends CreateOutput<CategoryDomain> implements ICreateCategoryOutput {
    constructor(output: ICreateCategoryOutput) {
        super(output)
    }

    get category() {
        return this.entity.json();
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