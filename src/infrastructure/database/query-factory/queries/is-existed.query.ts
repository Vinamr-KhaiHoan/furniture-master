import { DatabaseModel } from "../../index";
import { IArrayHelper } from "../../../utils";
import { Criteria } from "../../../repository";
import { QueryParser } from "../../query-parser";
import { Context } from "../../../service";
import { container } from '../../../../index';
import { TYPES } from "../../../../const";


export class IsExistQuery {
    private model: DatabaseModel;
    private ctx: Context;
    private arrayHelper: IArrayHelper;

    constructor(ctx: Context, model: DatabaseModel) {
        this.model = model;
        this.ctx = ctx;

        this.arrayHelper = container.get(TYPES.ARRAY_HELPER);
    }

    public async execute(criteria: Criteria): Promise<boolean> {
        if (!criteria) { throw Error('missing criteria'); }

        const query = QueryParser.parse(criteria);

        // OwnerFilter.append(this.ctx, this.model.name, query);

        const result = await this.model.findAll(query.options);

        return this.arrayHelper.isEmpty(result);
    }
}
