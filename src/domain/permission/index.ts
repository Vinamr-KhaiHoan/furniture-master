import { IDomain } from "../../infrastructure/base/domain";

export interface IPermission {
    id: number;
    name: string;
    role: number[];
    accountTypes: number[];
}

export interface IPermissionDomain extends IDomain, IPermission {}

export * from './permission.domain';