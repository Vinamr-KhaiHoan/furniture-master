import { IQueryFactory } from ".";
import { TYPES } from "../../../const";
import { singletonProvide } from "../../ioc";
import { FindQuery, FindByIdQuery, UpdateQuery, UpdateByIdQuery, DeleteByIdQuery, BulkCreateQuery, BulkDeleteQuery, PaginateQuery } from "./queries";
import { CreateQuery } from "./queries/create.query";


//Factory to create Query with context
@singletonProvide(TYPES.QUERY_FACTORY)
export default class QueryFactory implements IQueryFactory{
    public createFindQuery(ctx: any, model: any) {
        return new FindQuery(ctx, model)
    }
    public createFindByIdQuery(ctx: any, model: any): FindByIdQuery {
        return new FindByIdQuery(ctx, model)
    }
    createPaginateQuery(ctx: any, model: any) {
        return new PaginateQuery(ctx, model)
    }
    public createCreateQuery(ctx: any, model: any) : CreateQuery {
        return new CreateQuery(ctx, model);
    }

    public createUpdateQuery(ctx: any, model: any) : UpdateQuery {
        return new UpdateQuery(ctx, model)
    }

    createUpdateByIdQuery(ctx: any, model: any) {
        return new UpdateByIdQuery(ctx, model)
    }
    createDeleteByIdQuery(ctx: any, model: any) {
        return new DeleteByIdQuery(ctx, model)
    }
    createBulkCreateQuery(ctx: any, model: any) {
        return new BulkCreateQuery(ctx, model)
    }

    createBulkDeleteQuery(ctx: any, model: any) {
        return new BulkDeleteQuery(ctx, model)
    }
    createBulkUpdateQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    createCountQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    
}