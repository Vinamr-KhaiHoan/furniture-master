import { ApiRouter } from '../api';
import { IRouterValidator } from '../base/router-validator';
import { inject, namedInject, singletonProvide, interfaces } from '../../../ioc';
import { ILogger } from '../../../utils';
import { TYPES } from "../../../../const";
import { CONTROLLER } from '../../../../const/controller';
import { IInterceptor } from '../../middleware';

@singletonProvide(TYPES.ROUTER)
export class CategoryRouter extends ApiRouter {
    get controller() {
        return CONTROLLER.CATEGORY
    }

    constructor(
        @inject(TYPES.INTERCEPTOR)
        protected interceptor: IInterceptor,
        @inject(TYPES.LOGGER)
        logger: ILogger,
        @inject(TYPES.ROUTER_VALIDATOR)
        validator: IRouterValidator,
    ) {
        super(logger, validator);
        this.stack.push(CategoryRouter.prefix);
        this.create();
        this.findById();
    }

    static get prefix() {
        return 'categories';
    }

    // @ts-ignore
    get id() {
        return Symbol.for('CATEROGY_ROUTER');
    }

    private create() {
        this.router.post(`${this.path}/create-category`, this.validator.validate, this.interceptor.intercept(this.controller, `createCategory`))
    }

    private findById() {
        this.router.get(`${this.path}/find-category-by-id`, this.validator.validate, this.interceptor.intercept(this.controller, `findCategoryById`))
    }
}
