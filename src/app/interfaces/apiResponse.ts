import { Product } from '../store/product/product.model'

export interface ApiResponseBase {
    status: string
    message: string
}

export interface ProductsApiResponse extends ApiResponseBase {
    products: Product[]
}

export interface ProductApiResponse extends ApiResponseBase {
    product: Product
}