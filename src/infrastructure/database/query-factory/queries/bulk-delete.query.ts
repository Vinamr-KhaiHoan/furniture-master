import { WhereOptions } from "sequelize";
import { DatabaseModel } from "../../index";
import { Criteria } from "../../../repository";
import { QueryParser } from "../../query-parser";

export class BulkDeleteQuery {
    private model: DatabaseModel;
    private ctx: any;
  
    constructor(ctx: any, model: DatabaseModel) {
      this.model = model;
      this.ctx = ctx;
    }
  
    public async execute(criteria: Criteria): Promise<number> {
      const query = QueryParser.parse(criteria);
  
      return this.model.destroy({
        where: query.options.where as WhereOptions<any>,
        transaction: this.ctx.transaction,
      });
    }
  }
  