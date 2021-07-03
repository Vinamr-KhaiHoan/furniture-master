import { WhereOptions } from "sequelize";
import { DatabaseModel } from "../..";
import { Criteria } from "../../../repository";
import { Context } from "../../../service";
import { QueryParser } from "../../query-parser";

export class UpdateQuery {
  private model: DatabaseModel;
  private ctx: Context;

  constructor(ctx: Context, model: DatabaseModel) {
    this.model = model;
    this.ctx = ctx;
  }

  public async execute<TEntity = any>(criteria: Criteria, data: TEntity & { updatedAt?: Date; updatedBy?: number }) {
    if (!criteria) {
      throw Error('missing criteria');
    }
    if (!data) {
      throw Error('missing data');
    }

    const query = QueryParser.parse(criteria);

    // OwnerFilter.append(this.ctx, this.model.name, query);

    data.updatedAt = new Date();

    if (this.ctx.user && this.ctx.user.id) {
      data.updatedBy = this.ctx.user.id;
    }

    return this.model.update(data, {
      where: query.options.where as WhereOptions<any>,
      transaction: this.ctx.transaction,
    });
  }
}
