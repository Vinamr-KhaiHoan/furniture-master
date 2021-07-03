import { DatabaseModel } from '../index';
import { Context } from '../../service';
import { BulkCreateQuery, BulkDeleteQuery, DeleteByIdQuery, FindByIdQuery, FindQuery, PaginateQuery, UpdateByIdQuery, UpdateQuery } from './queries';
import { CreateQuery } from './queries/create.query';

export * from './query';

export interface IQueryFactory {
    createFindQuery(ctx: Context, model: DatabaseModel): FindQuery;
    createFindByIdQuery(ctx: Context, model: DatabaseModel): FindByIdQuery;

    createCreateQuery(ctx: Context, model: DatabaseModel): CreateQuery;
    createUpdateQuery(ctx: Context, model: DatabaseModel): UpdateQuery;
    createUpdateByIdQuery(ctx: Context, model: DatabaseModel): UpdateByIdQuery; 
    createDeleteByIdQuery(ctx: Context, model: DatabaseModel): DeleteByIdQuery; 
    createBulkCreateQuery(ctx: Context, model: DatabaseModel): BulkCreateQuery;
    createBulkDeleteQuery(ctx: Context, model: DatabaseModel): BulkDeleteQuery //BulkDeleteQuery;
    createBulkUpdateQuery(ctx: Context, model: DatabaseModel): any //BulkUpdateQuery;
    createCountQuery(ctx: Context, model: DatabaseModel): any //CountQuery;
    createPaginateQuery(ctx: Context, model: DatabaseModel): PaginateQuery;
}

export * from './queries';
export * from './query-factory';