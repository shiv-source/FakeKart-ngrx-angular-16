import { createAction, props } from '@ngrx/store'
import { Product } from '../product/product.model'

export const addProductToCart = createAction('[Cart] Add Product To Cart', props<{ product: Product }>())

export const removeProductFromCart = createAction('[Cart] Remove Product From Cart', props<{ product: Product }>())
