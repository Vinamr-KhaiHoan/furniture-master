import { inject, injectable } from '../../ioc';

import { TYPES } from '../../../const';
import { IConfiguration } from '../../utils/configuration';
import { ILogger } from '../../utils/logger';
import { IHttpHelper } from '../../utils';

@injectable()
export abstract class BaseHttpRepository {
  @inject(TYPES.CONFIG)
  protected config: IConfiguration | undefined;

  @inject(TYPES.LOGGER)
  protected logger: ILogger | undefined;

  @inject(TYPES.HTTP_HELPER)
  protected http: IHttpHelper | undefined;
}
