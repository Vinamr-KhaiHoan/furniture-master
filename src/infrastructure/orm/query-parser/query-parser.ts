import { Query } from '../query';
import { QueryBuilder } from '../query-builder/query-builder';
import {singletonProvide} from '../../ioc';
import {NAMES, TYPES} from "../../../const";
import {ICriteria, IFilter, IInclude, ISort} from "../../base/repository";
import {WhereOptions, IncludeOptions} from "../sequelize";

export interface IQueryParser {
  parseSelect(select: string): string[];
  parseFilters(filters: IFilter[]): WhereOptions;
  parseInclude(include: IInclude): IncludeOptions;
  parseIncludes(includes: string): IncludeOptions[];
  parseOffsetAndLimit(data: ICriteria): { offset: number; limit: number } | null;
  parseSort(sort: ISort): any;
  parse(data: ICriteria): Query;
}

@singletonProvide(TYPES.QUERY_PARSER)
export class QueryParser implements IQueryParser {
  constructor() {
  }

  parseSelect(select: string): string[] {
    return select.split(',').map(elm => elm.trim());
  }

  parseOffsetAndLimit(data: ICriteria): { offset: number; limit: number } | null {
    if (!data) return null;

    let { page, limit } = data;

    if (page === undefined || limit === undefined || page === null || limit === null) return null;

    limit = Number(limit);
    let offset = (page - 1) * limit;

    return { offset: isNaN(offset) ? 0 : offset, limit: isNaN(limit) ? 10 : limit };
  }

  parseSort(sort: ISort): any {
    if (!sort || !sort.column || !sort.direction) return null;
    let listField = sort.column.split('.');

    let order = [...listField, ['asc', 'desc'].indexOf(sort.direction) > -1 ? sort.direction : 'asc'];
    return [order];
  }

  parseFilters(filters: IFilter[]): WhereOptions {
    if (!filters || !filters.length) return {};

    const where: WhereOptions = {};

    filters.forEach(filter => {
      if (!filter.operator || !filter.code) { return; }
      if (filter.operator != 'does_not_equal' && filter.operator != 'equals' && !filter.value) { return; }

      switch (filter.operator) {
        /**
         * String
         */
        case 'equals':
          where[filter.code] = filter.value;
          break;
        case 'does_not_equal':
          where[filter.code] = { $not: filter.value };
          break;
        case 'contains':
          where[filter.code] = { $like: `%${filter.value}%` };
          break;
        case 'does_not_contain':
          where[filter.code] = { $notLike: `%${filter.value}%` };
          break;
        case 'contains_case_insensitive':
          where[filter.code] = { $iLike: `%${filter.value}%` };
          break;
        case 'does_not_contain_case_insensitive':
          where[filter.code] = { $notILike: `%${filter.value}%` };
          break;
        case 'starts_with':
          where[filter.code] = { $like: `${filter.value}%` };
          break;
        case 'ends_with':
          where[filter.code] = { $like: `%${filter.value}` };
          break;

        /**
         * Logic
         */
        case 'is':
          where[filter.code] = { $in: filter.value };
          break;
        case 'is_not':
          where[filter.code] = { $notIn: filter.value };
          break;

        /**
         * Array
         */
        case 'array_contains':
          where[filter.code] = { $contains: filter.value };
          break;

        /**
         * Number
         */
        case 'is_greater_than':
          where[filter.code] = { $gt: filter.value };
          break;
        case 'is_smaller_than':
          where[filter.code] = { $lt: filter.value };
          break;
        case 'between':
            where[filter.code] = { $between: filter.value };
          break;
      }
    });

    return where;
  }

  parseInclude(include: IInclude): IncludeOptions {
    if (!include || !include.field) return {};

    const result: IncludeOptions = { association: include.field, attributes: { exclude: ['password'] } };

    if (include.select) {
      result.attributes = include.select;
    }

    if (include.filters) {
      result.where = this.parseFilters(include.filters);
    }

    if (include.includes) {
      result.include = include.includes.map((include: any) => this.parseInclude(include));
    }

    return result;
  }

  parseIncludes(includes: string): IncludeOptions[] {
    try {
      let arr: IInclude[];

      arr = JSON.parse(includes);

      if (!arr || !arr.length) return [];

      return arr.map(include => this.parseInclude(include));
    } catch (err) {
      return [];
    }
  }

  parseSearch(keyword: string): WhereOptions | null {
    if (!keyword) return null;

    if (/^\d{9}$/.test(keyword)) {
      // case keyword match id format
      return { id: Number(keyword) };
    } else {
      // case default is entity name
      return { name: { $iLike: `%${keyword}%` } };
    }
  }

  parse(data: ICriteria): Query {
    const builder = new QueryBuilder();

    if (data.select) {
      const attributes: string[] = data.select;

      builder.setAttributes(attributes);
    }

    if (data.sort) {
      const order: any = this.parseSort(data.sort);

      builder.setOrder(order);
    }

    const offsetAndLimit = this.parseOffsetAndLimit(data);
    if (offsetAndLimit) {
      builder.setOffset(offsetAndLimit.offset);
      builder.setLimit(offsetAndLimit.limit);
    }

    if (data.transaction) {
      builder.setTransaction(data.transaction);
    }

    if (data.filters) {
      const where = this.parseFilters(data.filters);
      builder.setWhere(where);
    }

    if (data.includes && data.includes.length) {
      const includes = data.includes.map((include: any) => this.parseInclude(include));

      builder.setInclude(includes);
    }

    return builder.build();
  }
}
