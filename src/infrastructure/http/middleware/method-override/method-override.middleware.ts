import { BaseMiddleware } from "../base";
import { singletonProvide } from '../../../ioc';
import { TYPES } from "../../../../const";

import methodOverride from 'method-override';

@singletonProvide(TYPES.MIDDLEWARE)
export class MethodOverrideMiddleware extends BaseMiddleware {
    constructor() {
        super()
    
    this.middleware.use(methodOverride('X-HTTP-Method'));
    this.middleware.use(methodOverride('X-HTTP-Method-Override'));
    this.middleware.use(methodOverride('X-Method-Override'));
    this.middleware.use(methodOverride('_method'));
    }

    get id() {
        return Symbol.for('METHOD_OVERRIDE_MIDDLEWARE')
    }
}