import { ApiResponseBase } from 'src/app/interfaces/apiResponse'
import { Product } from '../product/product.model'

export interface CategoryApiResponse extends ApiResponseBase {
    categories: string[]
}

export interface CategoryProductApiResponse extends ApiResponseBase {
    products: Product[]
}
