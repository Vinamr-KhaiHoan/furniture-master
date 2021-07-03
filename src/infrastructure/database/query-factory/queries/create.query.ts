import { Model } from "sequelize";
import { DatabaseModel } from "../..";
import { Include } from "../../../repository";
import { Context } from "../../../service";

type CreateQueryOptions = {
    include? : Include;
}

export class CreateQuery{
    private model : DatabaseModel;
    private ctx : Context;
    constructor(ctx : Context , model: DatabaseModel){
        this.model = model;
        this.ctx = ctx;
    }
    public async execute<TEntity = any>(data : TEntity & {createdBy?: number} , options? : CreateQueryOptions) : Promise<Model<TEntity>> {
        if(!data) throw Error("Missing data")

        if(this.ctx.user && this.ctx.user.id)
            data.createdBy = this.ctx.user.id;

        const opts: any = {
            transaction :  await this.ctx.transaction
        }
        if(options && options.include)
            opts.include = options.include;
           
        return this.model.create(data, opts);
    }
}