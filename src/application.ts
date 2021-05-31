import { BaseApplication } from './infrastructure/base/application/base.application'
import { NAMES, TYPES } from "./const";
import { IHttp } from "./infrastructure/http/http";
import { inject, namedInject, singletonNamedProvide } from './infrastructure/ioc'
import { Sequelize } from 'sequelize/types';

@singletonNamedProvide(TYPES.APPLICATION, NAMES.API)
export class ApiApplication extends BaseApplication {
    @inject(TYPES.HTTP)
    private http: IHttp | undefined;

    get id() {
        return TYPES.API;
    }

    @namedInject(TYPES.SEQUELIZE, NAMES.POSTGRES_INFO_READ)
    private inforPostgreRead: Sequelize | undefined;

    @namedInject(TYPES.SEQUELIZE, NAMES.POSTGRES_INFO_WRITE)
    private inforPostgreWrite: Sequelize | undefined;

    async load() {
        await this.inforPostgreRead?.authenticate();
        await this.inforPostgreWrite?.authenticate();

        this.inforPostgreRead?.sync({ force: true })

        this.log?.info("DB connected");
    }

    async start() {
        const port = Number(process.env.PORT) | (this.config?.get('web.port') as number);
        if(this.http) {
            this.http.listen(port)
        }
        this.log?.info(`SERVER LISTENING ${port}`)
    }
}