import { inject, injectable } from "../../../ioc";
import { Context } from "../../../services/context";
import { TYPES } from "../../../../const";

import { Model } from "../../index";
import { IArrayHelper } from "../../../utils/helpers";

@injectable()
export class BulkCreateQuery {
    private model: (new () => Model<any, any>) & typeof Model;
    private ctx: Context;

    @inject(TYPES.ARRAY_HELPER)
    private arrayHelper: IArrayHelper | undefined;

    constructor(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
        this.ctx = ctx;
        this.model = model;
    }

    async execute(data: any[]): Promise<any[]> {
        if (!data || this.arrayHelper?.isEmpty(data)) throw Error('missing data');

        data = data.map(datum => {
            datum.createdBy = this.ctx.user ? this.ctx.userId : null;

            return datum;
        });

        const result = await this.model.bulkCreate(data, {
            transaction: this.ctx.transaction,
            returning: true
        });

        return result;
    }
}
