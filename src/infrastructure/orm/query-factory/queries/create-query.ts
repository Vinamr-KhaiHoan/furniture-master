import {Context} from "../../../services/context";
import {Model} from "../../index";

export class CreateQuery {
  private model: (new () => Model<any, any>) & typeof Model;
  private ctx: Context;

  constructor(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    this.ctx = ctx;
    this.model = model;
  }

  async execute(data: any): Promise<any> {
    if (!data) throw Error('missing data');

    data.createdBy = this.ctx.user ? this.ctx.userId : null;

    const result = await this.model.create(data, {
      transaction: this.ctx.transaction,
    });

    return result;
  }
}
