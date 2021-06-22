import {inject} from "../../../ioc";
import {Context} from "../../../services/context";
import {NAMES, TYPES} from "../../../../const";
import {Model} from "../../index";
import {IQueryParser} from "../../query-parser/query-parser";
import {ICriteria} from "../../../base/repository";

export class DeleteByIdQuery {
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

  async execute(id: number): Promise<void> {
    if (!id) throw Error('missing id');

    const criteria: ICriteria = { filters: [{ code: 'id', operator: 'is', value: [id] }] };

    const query = this.queryParser?.parse(criteria);

    //OwnerFilter.append(this.ctx, this.model.name, query);

    const doc = await this.model.findOne(query?.options);

    if (!doc) throw Error('NotFoundError');

    return await doc.destroy({ transaction: this.ctx.transaction });
  }
}
