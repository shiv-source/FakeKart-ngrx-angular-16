import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CategoryState } from './category.reducer'

export const selectCategoryState = createFeatureSelector<CategoryState>('category')

export const selectCategories = createSelector(selectCategoryState, state => state.categories)
export const selectLoading = createSelector(selectCategoryState, state => state.loading)

export const selectCategoryProducts = createSelector(selectCategoryState, state => state.categoryProducts)

export const selectSelectedCategoryProduct = createSelector(selectCategoryState, state => state.selectedCategoryProduct)
