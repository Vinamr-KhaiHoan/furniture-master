import {inject} from "../../../ioc";
import {Context} from "../../../services/context";
import {NAMES, TYPES} from "../../../../const";
import {Model} from "../../index";
import {IQueryParser} from "../../query-parser/query-parser";
import {ICriteria} from "../../../base/repository";

export class UpdateQuery {
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

  async execute(criteria: ICriteria, data: any) {
    if (!criteria) throw Error('missing criteria');
    if (!data) throw Error('missing data');

    const query = this.queryParser?.parse(criteria);

    //OwnerFilter.append(this.ctx, this.model.name, query);

    data = { ...data, ...{ updatedAt: new Date(), updatedBy: this.ctx.user ? this.ctx.userId : null } };

    const result = await this.model.update(data, {
      where: <any>query?.options.where,
      transaction: this.ctx.transaction
    });

    return result;
  }
}
