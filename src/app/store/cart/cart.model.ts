import { Product } from '../product/product.model'

export interface CartProduct {
    product: Product
    quantity: number
}
