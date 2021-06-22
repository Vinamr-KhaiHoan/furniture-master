import {inject} from "../../../ioc";
import {Context} from "../../../services/context";
import {TYPES} from "../../../../const";
import {Model} from "../../index";
import {IQueryParser} from "../../query-parser/query-parser";
import {ICriteria} from "../../../base/repository";

export class UpdateByIdQuery {
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

  async execute(id: number, data: any) {
    if (!id) throw Error('missing id');
    if (!data) throw Error('missing data');

    const criteria: ICriteria = { filters: [{ code: 'id', operator: 'is', value: [id] }] };

    const query = this.queryParser?.parse(criteria);

    //OwnerFilter.append(this.ctx, this.model.name, query);

    data = { ...data, ...{ updatedAt: new Date(), updatedBy: this.ctx.user ? this.ctx.userId : null } };

    const doc = await this.model.findOne(query?.options);

    if (!doc) throw Error('NotFoundError');

    const updatedDoc = await doc.update(data, { transaction: this.ctx.transaction });

    return updatedDoc;
  }
}
