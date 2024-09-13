import { ApiResponseBase } from 'src/app/interfaces/apiResponse'

export interface Product {
    id: number
    title: string
    image: string
    price: number
    description: string
    brand: string
    model: string
    color: string
    category: string
    discount: number
}

export interface ProductsApiResponse extends ApiResponseBase {
    products: Product[]
}

export interface ProductApiResponse extends ApiResponseBase {
    product: Product
}
