import { ATTRIBUTE_OUTPUT } from "../../../const";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateAttributeOutput extends ICreateOutput<AttributeDomain> {
    attribute: IAttributeDomain
}

@constructorProvide(ATTRIBUTE_OUTPUT.CREATE)
export class CreateAttributeOutput extends CreateOutput<AttributeDomain> implements ICreateAttributeOutput {
    constructor(output: ICreateAttributeOutput) {
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