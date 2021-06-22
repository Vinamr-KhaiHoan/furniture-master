import { ICriteria, IRepository } from './index';
import { IMapper } from './mapper';
import { container, inject, injectable, namedInject, unmanaged } from '../../ioc';
import { Model } from '../../orm';
import { NAMES, TYPES } from "../../../const";
import { QueryFactory } from "../../orm/query-factory/query-factory";
import { Context } from "../../services/context";

@injectable()
export abstract class BasePostgresRepository<D, I> implements IRepository<D> {

  @namedInject(TYPES.FACTORY, NAMES.QUERY)
  protected queryFactory: QueryFactory | undefined;

  protected constructor(
    protected rModel: (new () => Model<any, any>) & typeof Model,
    protected wModel: (new () => Model<any, any>) & typeof Model,
    @unmanaged() protected mapper: IMapper<D>,
  ) {
  }

  async create(entity: any) {
    console.log(entity)
    try {
      const { mapper, wModel, queryFactory } = this;

      const ctx = container.get<Context>(
        TYPES.HTTP_CONTEXT
      )

      if (!ctx || !queryFactory || !wModel || !mapper) {
        return null
      }

      const createQuery = queryFactory.createCreateQuery(ctx, wModel);

      const doc = await createQuery.execute(mapper.toDatabase(entity));

      return mapper.toEntity(doc);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError')
        throw Error(err.errors[0].message);
      throw err;
    }
  }

  async findAll() {
    const { rModel, mapper } = this;
    const records = await rModel.findAll({});

    const entites = records.map(record => mapper.toEntity(record));

    return entites;
  }

  async update(id: number | string, context: any) {
    if (!id) throw new Error('id is missing');
    if (!context) throw new Error('context is missing');
    const { wModel } = this;

    await wModel.update(context, { where: { id } });
  }

  async delete(id: number | string) {
    if (!id) throw new Error('id is missing');
    const { wModel } = this;
    wModel.destroy({ where: { id } });
  }

  async findById(id: number | string) {
    if (!id) throw new Error('id is missing');
    const record = await this.rModel.findByPk(id);

    return this.mapper.toEntity(record);
  }

  async find(criteria: ICriteria) {
    const { rModel, mapper, queryFactory } = this;

    const ctx = container.get<Context>(
      TYPES.HTTP_CONTEXT
    )
    if (!ctx || !queryFactory || !rModel || !mapper) {
      return []
    }
    const findQuery = queryFactory.createFindQuery(ctx, rModel);

    if (!findQuery) {
      return []
    }

    const docs = await findQuery.execute(criteria);

    return docs.map((doc: any) => mapper.toEntity(doc));
  }

  async paginate(criteria: ICriteria) {
    const { rModel, mapper, queryFactory } = this;

    const ctx = container.get<Context>(
      TYPES.HTTP_CONTEXT
    )

    if (!ctx || !queryFactory || !rModel || !mapper) {
      return null
    }
    const paginateQuery = queryFactory.createPaginateQuery(ctx, rModel);

    if (!paginateQuery) {
      return null
    }

    const result = await paginateQuery.execute(criteria);
    result.docs = result.docs.map((doc: any) => mapper.toEntity(doc))

    return result;
  }

  async bulkCreate(entities: D[]): Promise<(D | null)[]> {
    try {
      const { wModel, mapper, queryFactory } = this;

      const ctx = container.get<Context>(
        TYPES.HTTP_CONTEXT
      )
      if (!ctx || !queryFactory || !wModel || !mapper) {
        return []
      }

      const bulkCreateQuery = queryFactory.createBulkCreateQuery(ctx, wModel);

      const docs = await bulkCreateQuery.execute(entities.map(entity => this.mapper.toDatabase(entity)));

      return docs.map(doc => this.mapper.toEntity(doc));

    } catch (err) {
      throw err;
    }
  }


}
