import { BaseMiddleware } from "../base"
import { singletonProvide } from '../../../ioc'
import { TYPES } from "../../../../const"

import express from 'express'


@singletonProvide(TYPES.MIDDLEWARE)
export class BodyParserMiddleware extends BaseMiddleware {
    constructor() {
        super()

        this.middleware.use(express.urlencoded())
        this.middleware.use(express.json())
    }

    get id() {
        return Symbol.for('BODY_PARSER_MIDDLEWARE')
    }
}