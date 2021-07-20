import { ATTRIBUTE_OUTPUT } from "../../../const";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindAttributeByIdOutput extends IFindByIdOutput<AttributeDomain> {
    attribute: IAttributeDomain;
}

@constructorProvide(ATTRIBUTE_OUTPUT.FIND_BY_ID)
export class FindAttributeByIdOutput extends FindByIdOutput<AttributeDomain> implements IFindAttributeByIdOutput {
    constructor(output: IFindAttributeByIdOutput) {
        super(output)
    }

    get attribute() {
        return this.entity.json();
    }

    get response() {
        const {
            attribute,
            message
        } = this;

        return {
            attribute,
            message
        }
    }
}