import { inject } from "../../../ioc";
import { Context } from "../../../services/context";
import { NAMES, TYPES } from "../../../../const";
import { Model } from "../../index";
import { IQueryParser } from "../../query-parser/query-parser";
import { ICriteria } from "../../../base/repository";


export class BulkDeleteQuery {
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

    async execute(criteria: ICriteria): Promise<number> {
        const query = this.queryParser?.parse(criteria);

        return this.model.destroy({
            where: <any>query?.options.where,
            transaction: this.ctx.transaction
        });
    }
}
