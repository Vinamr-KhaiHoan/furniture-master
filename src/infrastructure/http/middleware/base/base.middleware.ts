import { LOGGER, TYPES } from '../../../../const';
import { injectable, inject } from '../../../ioc'
import { IConfiguration, ILog, ILogger } from '../../../utils';
import { Http } from '../../http'


@injectable()
export abstract class BaseMiddleware {
    protected middleware = Http.SERVER;

    @inject(TYPES.LOGGER)
    private logger: ILogger | undefined;

    get log(): ILog | undefined {
        
        let infraLogger = Symbol.keyFor(LOGGER.INFRASTRUCTURE)
        let routerType = Symbol.keyFor(TYPES.ROUTER)
        let id

        if (this.id) {
            id = Symbol.keyFor(this.id);
        }

        if (this.logger) {
            if (infraLogger && routerType && id) {
                return this.logger.get(
                    infraLogger.toUpperCase(),
                    id.toLowerCase()
                )
            }
        }

        return undefined
    }

    public load() {
        let id = Symbol.keyFor(this.id)
        if(this.log && id) {
            this.log.info(id.toLowerCase())
        }
    }

    @inject(TYPES.CONFIG)
    protected config: IConfiguration | undefined;

    abstract id: symbol
}