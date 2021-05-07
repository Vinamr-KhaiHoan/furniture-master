import express from 'express'
import { Application } from 'express'
import { Server } from 'http'
import { multiInject } from 'inversify';
import { TYPES } from '../../const';

export interface IHttp {
    load(): void
    listen(port: number): void;
}

const SERVER = express()

export class Http implements IHttp {
    static SERVER = SERVER;

    private http: Application;
    private server: Server;

    @multiInject(TYPES.MIDDLEWARE)
    protected middlewares: any[] | undefined;
    
    @multiInject(TYPES.ROUTER)
    protected routers: any[] | undefined;

    public load() {
        if(this.middlewares && this.routers) {
            this.middlewares.forEach(middleware => middleware.load());
            this.routers.forEach(router => router.load())
        }
    }

    public listen(port: number): void {
        if (!port) return;
        if( typeof port  !== 'number') throw new Error(`port must invalid`);
        this.server.listen(port)
    }
}