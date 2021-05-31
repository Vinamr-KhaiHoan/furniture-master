export {
    BaseApplication,
    IApplication
} from './infrastructure/base/application';
import {
    buildProviderModule,
    container
} from './infrastructure/ioc';

import './const';
import './infrastructure';
import './application';

container.load(buildProviderModule())

export { container }