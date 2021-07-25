export const USER_INPUT = {
    CREATE: Symbol.for('CREATE_USER_INPUT'),
    UPDATE: Symbol.for('UPDATE_USER_INPUT'),
    FIND_BY_ID: Symbol.for('FIND_USER_BY_ID_INPUT'),
    PAGINATE: Symbol.for('PAGINATE_USER_INPUT')
}

export const AUTH_INPUT = {
    SIGN_IN: Symbol.for('SING_IN_INPUT')
}

export const CATEGORY_INPUT = {
    CREATE: Symbol.for('CREATE_CATEGORY_INPUT'),
    UPDATE: Symbol.for('UPDATE_CATEGORY_INPUT'),
    FIND_BY_ID: Symbol.for('FIND_CATEGORY_BY_ID_INPUT'),
    PAGINATE: Symbol.for('PAGINATE_CATEGORY_INPUT')
}

export const ATTRIBUTE_INPUT = {
    CREATE: Symbol.for('CREATE_ATTRIBUTE_INPUT'),
    UPDATE: Symbol.for('UPDATE_ATTRIBUTE_INPUT'),
    FIND_BY_ID: Symbol.for('FIND_ATTRIBUTE_BY_ID_INPUT'),
    PAGINATE: Symbol.for('PAGINATE_ATTRIBUTE_INPUT')
}

export const PRODUCT_INPUT = {
    CREATE: Symbol.for('CREATE_PRODUCT_INPUT'),
    UPDATE: Symbol.for('UPDATE_PRODUCT_INPUT'),
    FIND_BY_ID: Symbol.for('FIND_PRODUCT_BY_ID_INPUT'),
    PAGINATE: Symbol.for('PAGINATE_PRODUCT_INPUT')
}