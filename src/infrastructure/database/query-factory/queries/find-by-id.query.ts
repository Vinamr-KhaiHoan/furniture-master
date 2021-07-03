import { DatabaseModel } from "../../index";
import { Criteria } from "../../../repository";
import { QueryParser } from "../../query-parser";
import { Context } from "../../../service";
import { Model } from "sequelize";


export class FindByIdQuery {
  private model: DatabaseModel;
  private ctx: Context;

  constructor(ctx: Context, model: DatabaseModel) {
    this.ctx = ctx;
    this.model = model;
  }

  public async execute<TEntity = any>(id: number, criteria?: Criteria): Promise<Model<TEntity>> {
    if (!id) { throw Error('missing id'); }

    const args: Criteria = { filters: [{ code: 'id', operator: 'is', value: [id] }] };

    if (criteria) {
      if (criteria.select) { args.select = criteria.select; }
      if (criteria.includes) { args.includes = criteria.includes; }
      if (criteria.transaction) { args.transaction = criteria.transaction; }
    }

    const query = QueryParser.parse(args);

    // OwnerFilter.append(this.ctx, this.model.name, query);

    return this.model.findOne(query.options);
  }
}
