// import { WhereOptions } from "sequelize";
// import { DatabaseModel } from "../../index";
// import { Criteria } from "../../../repository";
// import { QueryParser } from "../../query-parser/query-parser";

// export class BulkUpdateQuery {
//     private model: DatabaseModel;
//     private ctx: any;
  
//     constructor(ctx: any, model: DatabaseModel) {
//       this.ctx = ctx;
//       this.model = model;
//     }
  
//     public async execute<TEntity = any>(
//       criteria: Criteria,
//       data: TEntity & { updatedAt?: Date; updatedBy?: number },
//     ): Promise<any[]> {
//       if (!criteria) {
//         throw Error('missing criteria');
//       }
//       if (!data) {
//         throw Error('missing data');
//       }
  
//       data.updatedAt = new Date();
  
//       if (this.ctx.user && this.ctx.user.id) {
//         data.updatedBy = this.ctx.user.id;
//       }
  
//       const query = QueryParser.parse(criteria);
  
//       OwnerFilter.append(this.ctx, this.model.name, query);
  
//       return this.model.update(data, {
//         where: query.options.where as WhereOptions<any>,
//         transaction: this.ctx.transaction,
//         returning: true,
//       });
//     }
//   }