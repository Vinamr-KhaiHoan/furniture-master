import { Request } from 'express';
import { Context } from './context-entity';
import { container } from '../../ioc';
import {Transaction} from "../../orm";
import {inject, singletonNamedProvide, Container} from "../../ioc";
import {NAMES, TYPES} from "../../../const";
import {IJwtHelper, IObjectHelper} from "../../utils";

export interface IContextService {
  initRequestContext(container: Container, req: Request, transaction: Transaction): Context;
  getRequestContext(): Context | undefined;
}

@singletonNamedProvide(TYPES.SERVICE, NAMES.CONTEXT)
export class ContextService implements IContextService {
  @inject(TYPES.OBJECT_HELPER)
  private objectHelper: IObjectHelper | undefined;

  @inject(TYPES.JWT_HELPER)
  private jwtHelper: IJwtHelper | undefined;

  @inject(TYPES.HTTP_CONTEXT)
  private ctx: Context | undefined;

  initRequestContext(container: Container, req: Request, transaction: Transaction | undefined): Context {
    const ctx = new Context(
      container,
      this.objectHelper?.pick(req, ['user', 'params', 'query', 'body', 'headers', 'protocol', 'originalUrl']),
      transaction
    );

    return ctx;
  }

  getRequestContext(): Context | undefined {
    return this.ctx;
  }

  getSystemContext(): Context {
    const systemUser = {
      id: 1000000000,
      email: 'super.admin@yomedia.vn',
      password: '$2b$10$K6dEMjPZeHKoJuCd3aAFHeHuyhkxnWMEyNJLG0LKeRUNE0va/.xZC',
      firstName: 'Super',
      lastName: 'Admin',
      isSuperAdmin: true,
      isSwitchedAccount: false,
      originalAccount: null,
      account: null
    };

    const systemToken = this.jwtHelper?.signin(systemUser);

    const currCtx = this.getRequestContext();

    const ctx = this.initRequestContext(
      container,
      <any>{
        user: { ...systemUser, token: systemToken, permissions: [] },
        params: currCtx?.req.params,
        query: currCtx?.req.params,
        body: currCtx?.req.params,
        header: currCtx?.req.params,
        protocol: currCtx?.req.params,
        originalUrl: currCtx?.req.params
      },
      currCtx?.transaction
    );

    return ctx;
  }
}
