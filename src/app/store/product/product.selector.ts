import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductState } from './product.reducer'

export const selectProductState = createFeatureSelector<ProductState>('product')

export const selectProducts = createSelector(selectProductState, state => state.products)
export const selectLoading = createSelector(selectProductState, state => state.loading)

export const selectSelectedProduct = createSelector(selectProductState, state => state.selectedProduct)
