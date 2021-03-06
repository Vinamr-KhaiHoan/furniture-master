export const DATABASE = {
    PRODUCT: Symbol.for('PRODUCT_POSTGRES'),
    USER: Symbol.for('USER_POSTGRES'),
    CATEGORY: Symbol.for('CATEGORY_POSTGRES'),
    ATTRIBUTE: Symbol.for('ATTRIBUTE_POSTGRES'),
    PRODUCT_ATTRIBUTE: Symbol.for('PRODUCT_ATTRIBUTE_POSTGRES'),
    PRODUCT_CATEGORY: Symbol.for('PRODUCT_CATEGORY_POSTGRES'),
    ORDER: Symbol.for('ORDER_POSTGRES'),
    ORDER_ITEM: Symbol.for('ORDER_ITEM_POSTGRES'),
    CUSTOMER: Symbol.for('CUSTOMER_POSTGRES'),
    PERMISSION: Symbol.for('PERMISSION_POSTGRES'),
    METADATA: Symbol.for('METADATA_POSTGRES'),
    IMAGE: Symbol.for('IMAGE_POSTGRES'),
    PRODUCT_IMAGE: Symbol.for('PRODUCT_IMAGE_POSTGRES'),
    SOURCE: Symbol.for('SOURCE_POSTGRES')
}

export enum TABLE {
    USER = 'tb_users',
    PRODUCT = 'tb_products',
    PRODUCT_ATTRIBUTES = 'tb_products_attributes',
    CATEGORY = 'tb_categories',
    PRODUCT_CATEGORY = 'tb_products_caterogies',
    ATTRIBUTE = 'tb_attributes',
    ATTRIBUTES_VALUE = 'tb_attributes_values',
    PRODUCT_IMAGE = 'tb_product_images',
    IMAGE = 'tb_images',
    CUSTOMER = 'tb_customers',
    ADDRESS = 'tb_addresses',
    ORDER = 'tb_orders',
    ORDER_ITEM = 'tb_order_items',
    METADATA = 'tb_metadata',
    PERMISSION = 'tb_permissions',
    SOURCE = 'tb_sources'
}