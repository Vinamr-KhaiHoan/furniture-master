import { API_DOMAIN, DATABASE, TYPES, USER_WORKFLOW } from "../../../const";
import { ICreateUserInput, ICreateUserOutput } from "../../../controller";
import { UserDomain } from "../../../domain";
import { IUserRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateUserWorkflow extends ICreateWorkflow<UserDomain, ICreateUserInput, ICreateUserOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, USER_WORKFLOW.CREATE)
export class CreateUserWorkflow extends CreateWorkflow<UserDomain, ICreateUserInput, ICreateUserOutput> {
    get DOMAIN() {
        return API_DOMAIN.USER;
    }

    get id() {
        return USER_WORKFLOW.CREATE
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.USER)
        protected repository: IUserRepository
    ) {
        super(repository)
    }

    async validate(entity: UserDomain): Promise<void> {
        const isExistedUser = await this.repository.findByEmail(entity.email)

        if(isExistedUser) {
            throw this.errorFactory.unauthorizedError(`This email: ${entity.email} isn't existed.`)
        }
    }

    async plugInStep(output?: any): Promise<any> {
        return
    }
}