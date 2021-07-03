export const DATABASE = {
    PRODUCT: Symbol.for('PRODUCT_POSTGRES'),
    USER: Symbol.for('USER_POSTGRES'),
    CATEGORY: Symbol.for('CATEGORY_POSTGRES'),
    ATTRIBUTE: Symbol.for('ATTRIBUTE_POSTGRES'),
    PRODUCT_ATTRIBUTE: Symbol.for('PRODUCT_ATTRIBUTE_POSTGRES'),
    PRODUCT_CATEGORY: Symbol.for('PRODUCT_CATEGORY_POSTGRES')

}

export enum TABLE {
    USER = 'tb_users',
    PRODUCT = 'tb_products',
    PRODUCT_ATTRIBUTES = 'tb_products_attributes',
    CATEGORY = 'tb_categories',
    PRODUCT_CATEGORY = 'tb_products_caterogies',
    ATTRIBUTE = 'tb_attributes',
    ATTRIBUTES_VALUE = 'tb_attributes_value',
    PRODUCT_IMAGE = 'tb_product_image',
    IMAGE = 'tb_image',
    CUSTOMER = 'tb_customer',
    ADDRESS = 'tb_address',
    ORDER = 'tb_order',
    ORDER_ITEM = 'tb_order_item'
}