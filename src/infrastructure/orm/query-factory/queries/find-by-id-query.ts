import {inject} from "../../../ioc";
import {Context} from "../../../services/context";
import {NAMES, TYPES} from "../../../../const";
import {Model} from "../../index";
import {IQueryParser} from "../../query-parser/query-parser";
import {ICriteria} from "../../../base/repository";

export class FindByIdQuery {
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

  async execute(id: number, criteria?: ICriteria) {
    if (!id) throw Error('missing id');
    const args: ICriteria = { filters: [{ code: 'id', operator: 'is', value: [id] }] };

    if (criteria) {
      if (criteria.select) args.select = criteria.select;
      if (criteria.includes) args.includes = criteria.includes;
      if (criteria.transaction) args.transaction = criteria.transaction;
      if (criteria.filters && !args) (args as any).filters.push(...criteria.filters);
    }

    const query = this.queryParser?.parse(args);

    //OwnerFilter.append(this.ctx, this.model.name, query);

    const result = await this.model.findOne(query?.options);

    return result;
  }
}
