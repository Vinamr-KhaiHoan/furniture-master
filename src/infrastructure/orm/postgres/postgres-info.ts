import { Sequelize } from '../sequelize';
import { NAMES, TYPES } from '../../../const';
import { inject, singletonNamedProvide } from '../../ioc'
import { IConfiguration } from '../../utils';
import { operatorsAliases } from './base'

@singletonNamedProvide(TYPES.SEQUELIZE, NAMES.POSTGRES_INFO_READ)
export class PostgresInfoRead {
    constructor(@inject(TYPES.CONFIG) config: IConfiguration) {
        const info = {
            ...config.get(`postgres.info.read`),
            operatorsAliases
        };
        return new Sequelize(info)
    }
}

@singletonNamedProvide(TYPES.SEQUELIZE, NAMES.POSTGRES_INFO_WRITE)
export class PostgresInfoWirte {
    constructor(@inject(TYPES.CONFIG) config: IConfiguration) {
        const info = {
            ...config.get(`postgres.info.write`),
            operatorsAliases
        };
        return new Sequelize(info)
    }
}