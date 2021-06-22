import { inject, namedInject } from "../../../ioc";
import { Context } from "../../../services/context";
import { NAMES, TYPES } from "../../../../const";
import { Model } from "../../index";
import { IQueryParser, QueryParser } from "../../query-parser";
import { ICriteria } from "../../../base/repository";
import { Query } from "../../query";

export interface IPaginateResult<Entity> {
    docs: Entity[];
    total: number;
    limit: number;
    offset: number;
    page: number;
}

export class PaginateQuery {
    private model: (new () => Model<any, any>) & typeof Model;
    private ctx: Context;
    private queryParser: IQueryParser;

    constructor(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
        this.ctx = ctx;
        this.model = model;
        this.queryParser = new QueryParser();
    }

    async execute(criteria: ICriteria) {
        const { queryParser } = this;

        if (!queryParser) {
            throw Error('missing queryParser');
        }

        let query = queryParser.parse(criteria);

        if (!query) throw Error('missing query');

        //OwnerFilter.append(this.ctx, this.model.name, query);

        const result = await this.paginate(query);

        return result;
    }

    async paginate(query: Query) {
        const { offset, limit } = query.options;

        if (!offset && offset !== 0) throw Error('missing offset');
        if (!limit) throw Error('missing limit');

        const data = await this.model.findAndCountAll(query.options);

        const result: IPaginateResult<any> = {
            docs: data.rows,
            total: data.count,
            limit,
            offset,
            page: (offset / limit) + 1
        };

        return result;
    }

}
