import {
    FindQuery,
    FindByIdQuery,
    PaginateQuery,
    CreateQuery,
    UpdateQuery,
    UpdateByIdQuery,
    DeleteByIdQuery,
    BulkCreateQuery,
    BulkDeleteQuery,
    BulkUpdateQuery,
    CountQuery
} from './queries'

import {Context} from "../../services/context";
import {inject, singletonNamedProvide} from "../../ioc";
import {NAMES, TYPES} from "../../../const";
import { Model} from "../index";
import { IQueryParser } from '../query-parser';

@singletonNamedProvide(TYPES.FACTORY, NAMES.QUERY)
export class QueryFactory {

  @inject(TYPES.QUERY_PARSER)
  private queryParser: IQueryParser | undefined;

  createFindQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new FindQuery(ctx, model, this.queryParser);
  }

  createFindByIdQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new FindByIdQuery(ctx, model, this.queryParser);
  }

  createPaginateQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new PaginateQuery(ctx, model);
  }

  createCreateQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new CreateQuery(ctx, model);
  }

  createUpdateQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new UpdateQuery(ctx, model, this.queryParser);
  }

  createUpdateByIdQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new UpdateByIdQuery(ctx, model, this.queryParser);
  }

  createDeleteByIdQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new DeleteByIdQuery(ctx, model, this.queryParser);
  }

  createBulkCreateQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new BulkCreateQuery(ctx, model);
  }

  createBulkUpdateQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new BulkUpdateQuery(ctx, model, this.queryParser);
  }

  createBulkDeleteQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new BulkDeleteQuery(ctx, model, this.queryParser);
  }

  createCountQuery(ctx: Context, model: (new () => Model<any, any>) & typeof Model) {
    return new CountQuery(ctx, model, this.queryParser);
  }
}

