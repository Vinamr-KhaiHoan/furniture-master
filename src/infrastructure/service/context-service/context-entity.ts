import { Request } from "express";
import { Transaction } from "sequelize";
import { TYPES } from "../../../const";
import { UserDomain } from "../../../domain";
import { inject, interfaces } from "../../ioc";
import { IObjectHelper } from "../../utils";


export interface IRequestContext {
  params: any;
  body: any;
  query: any;
  headers: any;
  protocol: string;
}

export interface IAccountContext {
  id: number;
  name: string;
  type: number;
  permissions: string[];
  adminId: number;
  companyId: number;
  brandId: number;
}

export interface IUserContext extends UserDomain {
  token: string;
  isSuperAdmin: boolean;
  account: IAccountContext;
  originalAccount: IAccountContext;
  permissions: any[];
}

export class Context {
  public req: Request;
  public user: IUserContext;
  public transaction: Transaction;
  public timestamp: number;
  public container: interfaces.Container;
  public events: Promise<any>[];
  public protocol: string;
  public originalUrl: string;

  @inject(TYPES.OBJECT_HELPER)
  private objectHelper: IObjectHelper;

  constructor(container: any, req: any, transaction: any) {
    this.container = container;
    this.req = req;
    this.user = req.user;
    this.transaction = transaction;
    this.timestamp = Date.now();
    this.events = [];
    this.protocol = req.protocol;
    this.originalUrl = req.originalUrl;
  }

  get isSuperAdmin(): boolean {
    if (!this.user || !this.user.isSuperAdmin) return false;

    return this.user.isSuperAdmin;
  }

  get isAdminAccount(): boolean {
    if (!this.user || !this.user.account || !this.user.account.type) return false;

    return this.user.account.type === 1;
  }

  get isCompanyAccount(): boolean {
    if (!this.user || !this.user.account || !this.user.account.type) return false;

    return this.user.account.type === 2;
  }

  get isBrandAccount(): boolean {
    if (!this.user || !this.user.account || !this.user.account.type) return false;

    return this.user.account.type === 3;
  }

  get isNotAnAdmin(): boolean {
    return (
      !(this.isSuperAdmin || this.isAdminAccount)
    );
  }


  get userId(): number {
    if (!this.user || !this.user.id) return null;

    return this.user.id;
  }

  get accountTypeId(): number {
    if (!this.user || !this.user.account || !this.user.account.type) return null;

    return this.user.account.type;
  }

  get accountId(): number {
    if (!this.user || !this.user.account || !this.user.account.id) return null;

    return this.user.account.id;
  }

  get companyId(): number {
    if (!this.user || !this.user.account || !this.user.account.companyId) return null;

    return this.user.account.companyId;
  }

  get brandId(): number {
    if (!this.user || !this.user.account || !this.user.account.brandId) return null;

    return this.user.account.brandId;
  }

  get hasOriginalContext() {
    return this.user && this.user.originalAccount;
  }

  getOriginalContext() {
    // Use case roll back to original account
    if (!this.hasOriginalContext) throw Error('This user does not has original context');

    const originalContext = this.objectHelper.cloneDeep(this);

    originalContext.user.account = this.user.originalAccount;

    return originalContext;
  }

  hasPermission(permissionId: number): boolean {
    if (!this.user) return false;

    return this.user.permissions.find(permission => permission.id === permissionId) !== undefined;
  }
}
