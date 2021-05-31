import { BaseMiddleware } from "../base/base.middleware";
import { singletonProvide } from '../../../ioc'
import { TYPES } from "../../../../const";

import cors from 'cors'

@singletonProvide(TYPES.MIDDLEWARE)
export class CorsMiddleware extends BaseMiddleware {
    constructor() {
        super()

        this.middleware.use(cors())
    }

    get id() {
        return Symbol.for('CORS_MIDDLEWARE')
    }
}