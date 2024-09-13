import { createAction, props } from '@ngrx/store'
import { CategoryProduct } from './category.reducer'

export const loadCategories = createAction('[Categories] Load Categories')
export const loadCategoriesSuccess = createAction('[Categories] Load Categories Success', props<{ categories: string[] }>())
export const loadCategoriesFailure = createAction('[Categories] Load Categories Failure', props<{ error: any }>())

export const loadCategoriesProducts = createAction('[Categories Products] Load Categories Products')
export const loadCategoriesProductsSuccess = createAction(
    '[Categories Products] Load Categories Products Success',
    props<{ categoryProducts: CategoryProduct[] }>()
)
export const loadCategoriesProductsFailure = createAction(
    '[Categories Products] Load Categories Products Failure',
    props<{ error: any }>()
)

export const selectedCategoryProduct = createAction(
    '[Categories Products] Selected Category Products',
    props<{ categoryProduct: CategoryProduct }>()
)

export const loadCategoryProduct = createAction('[Category Products] Load Category Products', props<{ category: string }>())

export const loadCategoryProductSuccess = createAction(
    '[Category Products] Load Category Products Success',
    props<{ categoryProduct: CategoryProduct }>()
)

export const loadCategoryProductFailure = createAction(
    '[Category Products] Load Category Products Failure',
    props<{ error: any }>()
)
