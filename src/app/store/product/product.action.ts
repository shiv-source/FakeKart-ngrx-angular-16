import { createAction, props } from '@ngrx/store'
import { Product } from './product.model'

export const loadProducts = createAction('[Products] Load Products')
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>())
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: any }>())

export const addSelectedProduct = createAction('[Product] Add Selected Product', props<{ selectedProduct: Product }>())

export const loadProduct = createAction('[Product] Load Product', props<{ productId: number }>())
export const loadProductSuccess = createAction('[Product] Load Product Success', props<{ product: Product }>())
export const loadProductFailure = createAction('[Product] Load Product Failure', props<{ error: any }>())
