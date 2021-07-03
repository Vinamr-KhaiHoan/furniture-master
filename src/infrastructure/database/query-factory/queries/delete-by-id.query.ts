import { DatabaseModel } from "../..";
import { Criteria } from "../../../repository";
import { Context } from "../../../service";
import { QueryParser } from "../../query-parser";

export class DeleteByIdQuery {
  private model: DatabaseModel;
  private ctx: Context;

  constructor(ctx: Context, model: DatabaseModel) {
    this.model = model;
    this.ctx = ctx;
  }

  public async execute(id: number): Promise<void> {
    if (!id) { throw Error('missing id'); }

    const criteria: Criteria = { filters: [{ code: 'id', operator: 'is', value: [id] }] };

    const query = QueryParser.parse(criteria);

    // OwnerFilter.append(this.ctx, this.model.name, query);

    const doc = await this.model.findOne(query.options);

    if (!doc) { throw Error('NotFoundError'); }

    return await doc.destroy({ transaction: this.ctx.transaction });
  }
}
