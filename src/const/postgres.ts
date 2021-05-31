export const DATABASE = {
    PRODUCT_READ: Symbol.for('PRODUCT_READ_POSTGRES'),
    PRODUCT_WRITE: Symbol.for('PRODUCT_WRITE_POSTGRES')
}

export enum TABLE {
    PRODUCT = 'tb_products',
    PRODUCT_ATTRIBUTES = 'tb_products_attributes',
    CATEGORY = 'tb_categories',
    PRODUCT_CATEGORY = 'tb_products_caterogies',
    ATTRIBUTES_VALUE = 'tb_attributes_value',
    PRODUCT_IMAGE = 'tb_product_image',
    IMAGE = 'tb_image',
    CUSTOMER = 'tb_customer',
    ADDRESS = 'tb_address',
    ORDER = 'tb_order',
    ORDER_ITEM = 'tb_order_item'
}