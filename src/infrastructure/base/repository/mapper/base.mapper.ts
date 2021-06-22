import { interfaces, injectable } from '../../../ioc';

export interface IMapper<T> {
  toEntity: (data: any) => T | null;
  toFullEntity: (data: any) => T | null;
  toDatabase: (data: any) => any;
  toJSON: (domain: T) => any;
}

@injectable()
export class BaseMapper<T> implements IMapper<T> {
  constructor(private Domain: interfaces.Newable<T>) { }

  toEntity(context: any): T | null {
    if (!context) return null;
    return new this.Domain(context);
  }

  toFullEntity(context: any): T | null {
    if (!context) return null;
    return new this.Domain(context);
  }

  toJSON(context: T) : any {
    if (!context) return null;

    let contextElement = (context as any)['context'];

    return contextElement;
  }

  toDatabase(context: any): any {
    return context;
  }
}
