import { Model } from "sequelize";
import { DatabaseModel } from "../..";
import { Criteria } from "../../../repository";
import { Context } from "../../../service";
import { QueryParser } from "../../query-parser";


export class FindQuery {
    private model: DatabaseModel;
    private ctx: Context;

    constructor(ctx: Context, model: DatabaseModel) {
        this.ctx = ctx;
        this.model = model;
    }

    public async execute<TEntity = any>(criteria: Criteria): Promise<Model<TEntity>[]> {
        if (!criteria) { throw Error('missing criteria'); }

        const query = QueryParser.parse(criteria);

        // OwnerFilter.append(this.ctx, this.model.name, query);

        return this.model.findAll(query.options);
    }
}
