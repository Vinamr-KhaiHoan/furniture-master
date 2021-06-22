import { inject, injectable } from "../../../ioc";
import { Context } from "../../../services/context";
import { NAMES, TYPES } from "../../../../const";
import { Model } from "../../index";
import { IQueryParser } from "../../query-parser/query-parser";
import { ICriteria } from "../../../base/repository";

@injectable()
export class FindQuery {
    private model: (new () => Model<any, any>) & typeof Model;
    private ctx: Context;
    private queryParser: IQueryParser | undefined;

    constructor(
        ctx: Context,
        model: { new(): Model<any, any> } & typeof Model,
        queryParser: IQueryParser | undefined
    ) {
        this.model = model;
        this.ctx = ctx;
        this.queryParser = queryParser;
    }

    async execute(criteria: ICriteria) {
        if (!criteria) throw Error('missing criteria');

        const query = this.queryParser?.parse(criteria);

        //OwnerFilter.append(this.ctx, this.model.name, query);

        const result = await this.model.findAll(query?.options);

        return result;
    }
}
