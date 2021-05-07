import {injectable, inject } from '../../infrastructure/ioc'

export interface IApplication {
    load(): Promise<void>;
    start(): Promise<void>;
}

@injectable()
export abstract class BaseApplication implements IApplication {
    // get log(): 

    abstract id: symbol;
    abstract load(): Promise<void>;
    abstract start(): Promise<void>;
}