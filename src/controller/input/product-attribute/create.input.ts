import { IProductAttributeDomain } from "../../../domain";
import { ICreateInput } from "../base";

export interface ICreateProductAttributeInput extends ICreateInput, IProductAttributeDomain {}
