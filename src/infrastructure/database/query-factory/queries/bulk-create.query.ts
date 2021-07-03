import { Model } from "sequelize/types";
import { DatabaseModel } from "../..";
import { TYPES } from "../../../../const";
import { IArrayHelper } from "../../../index";
import { container } from '../../../../index';

export class BulkCreateQuery {
    private model: DatabaseModel;
    private ctx: any;
    private arrayHelper: IArrayHelper;
  
    constructor(ctx: any, model: DatabaseModel) {
      this.ctx = ctx;
      this.model = model;
  
      this.arrayHelper = container.get(TYPES.ARRAY_HELPER);
    }
  
    public async execute<TEntity = any>(data: (TEntity & { createdBy?: number })[]): Promise<Model<TEntity>[]> {
      if (!data || this.arrayHelper.isEmpty(data)) {
        throw Error('missing data');
      }
  
      data = data.map((datum) => {
        // append created by
        if (this.ctx.user && this.ctx.user.id) {
          datum.createdBy = this.ctx.user.id;
        }
  
        return datum;
      });
  
      return this.model.bulkCreate(data, {
          transaction: this.ctx.tracsaction
      })
    }
  }
  