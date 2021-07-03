// import { Criteria } from "../../../repository";
// import { Context } from "../../../service/context-service/context-entity";
// import { DatabaseModel } from "../../index";
// import { QueryParser } from "../../query-parser/query-parser";

// export class CountQuery {
//     private model: DatabaseModel;
//     private ctx: Context;
  
//     constructor(ctx: Context, model: DatabaseModel) {
//       this.ctx = ctx;
//       this.model = model;
//     }
  
//     public async execute(criteria: Criteria): Promise<number> {
//       if (!criteria) { throw Error('missing criteria'); }
  
//       const query = QueryParser.parse(criteria);
  
//       OwnerFilter.append(this.ctx, this.model.name, query);
  
//       return this.model.count(<any>query.options);
//     }
//   }