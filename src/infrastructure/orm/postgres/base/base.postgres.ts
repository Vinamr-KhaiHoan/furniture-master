import { Model, BuildOptions, ModelAttributes } from '../../sequelize';
import { injectable } from '../../../ioc';
import { ModelOptions, Sequelize } from 'sequelize/types';

@injectable()
export abstract class BasePostgresTable<I extends Model> {
    model: (typeof Model & { new (values?: object, options?: BuildOptions): I}) | undefined;

    abstract tableName: string;
    abstract attributes: ModelAttributes;

    abstract options?: ModelOptions<Model<I>> | undefined;
    
    set postgres(postgres: Sequelize) {
        this.model = postgres.define(this.tableName, this.attributes, this.options) as any; 
    }
}