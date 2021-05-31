import express from 'express'

import { injectable, multiInject } from '../ioc';
import { TYPES } from '../../const';

export interface IHttp {
    load(): void
    listen(port: number): void;
}

const SERVER = express()

@injectable()
export class Http implements IHttp {
    static SERVER = SERVER;

    protected server = SERVER;

    @multiInject(TYPES.MIDDLEWARE)
    protected middlewares: any[] | undefined;
    
    // @multiInject(TYPES.ROUTER)
    // protected routers: any[] | undefined;

    public load() {
        if(this.middlewares) {
            this.middlewares.forEach(middleware =>{ 
                console.log(middleware)    
                middleware.load()
            });
        //     this.routers.forEach(router => router.load())
        }
        return
    }

    public listen(port: number): void {
        if (!port) return;
        if( typeof port  !== 'number') throw new Error(`port must invalid`);
        this.server.listen(port)
    }
}