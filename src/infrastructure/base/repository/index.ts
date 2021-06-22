import { Transaction } from '../../orm';
import {IPaginateResult} from "../../orm/query-factory/queries/paginate-query";

export * from './mapper';

export * from './base-postgres.repository';
export * from './base-http.repository';

export type Operator =
  | 'is_greater_than'
  | 'is_smaller_than'
  | 'contains'
  | 'does_not_contain'
  | 'contains_case_insensitive'
  | 'does_not_contain_case_insensitive'
  | 'is'
  | 'is_not'
  | 'equals'
  | 'does_not_equal'
  | 'array_contains'
  | 'starts_with'
  | 'ends_with'
  | 'between'

export enum FilterOperator {
  Equals = 'equals',
  DoesNotEqual = 'does_not_equal',
  Contains = 'contains',
  DoesNotContain = 'does_not_contain',
  ContainsCaseInsensitive = 'contains_case_insensitive',
  DoesNotContainCaseInsensitive = 'does_not_contain_case_insensitive',
  StartsWith = 'starts_with',
  EndsWith = 'ends_with',
  Is = 'is',
  IsNot = 'is_not',
  IsGreaterThan = 'is_greater_than',
  IsSmallerThan = 'is_smaller_than',
  ArrayContains = 'array_contains',
  Between = 'between'
}

export interface IFilter {
  code: string;
  operator: Operator;
  value: null | string | string[] | number | number[];
}

export interface IInclude {
  field: string;
  select?: string[];
  includes?: IInclude[];
  filters?: IFilter[];
}

export interface ICriteria {
  select?: string[];
  filters?: IFilter[];
  sort?: ISort;
  limit?: number;
  includes?: IInclude[];
  transaction?: Transaction;
  page?: number
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface ISort {
  column: string;
  direction?: SortDirection;
}

export interface IReadableRepository<T> {
  find: (criteria: ICriteria) => Promise<(T | null)[]> ;
  paginate: (criteria: ICriteria) => Promise<IPaginateResult<T> | null> ;
  findAll: () => Promise<(T | null)[]>;
  findById: (id: number | number) => Promise<T | null>;
}

export interface IWritableRepository<T> {
  create: (item: any) => Promise<T | null>;
  bulkCreate(entities: T[]): Promise<(T | null)[]>;
  update: (id: string | number, item: any) => Promise<void | null>;
  delete: (id: string | number) => Promise<void | null>;
}

export interface ISettableRepository {
  keyOfSet(id: string | number): string;
  createSet(id: string | number, items: string[]): Promise<void>;
  buildSet(id: string | number, keys: string[]): Promise<void>;
}

export interface IRepository<T> extends IReadableRepository<T>, IWritableRepository<T> { }
