import { createReducer, on } from '@ngrx/store'
import { Product } from '../product/product.model'
import {
    loadCategories,
    loadCategoriesFailure,
    loadCategoriesProducts,
    loadCategoriesProductsFailure,
    loadCategoriesProductsSuccess,
    loadCategoriesSuccess,
    loadCategoryProduct,
    loadCategoryProductFailure,
    loadCategoryProductSuccess,
    selectedCategoryProduct
} from './category.action'

export interface CategoryProduct {
    category: string
    products: Product[]
}

export interface CategoryState {
    categories: string[]
    error: string | null
    loading: boolean
    categoryProducts: CategoryProduct[]
    selectedCategoryProduct: CategoryProduct | null
}

const initialState: CategoryState = {
    categories: [],
    error: null,
    loading: false,
    categoryProducts: [],
    selectedCategoryProduct: null
}

export const categoryReducer = createReducer(
    initialState,
    on(loadCategories, state => ({ ...state, loading: true })),
    on(loadCategoriesSuccess, (state, action) => ({ ...state, loading: false, categories: action.categories })),
    on(loadCategoriesFailure, (state, action) => ({ ...state, loading: false, error: action.error })),

    on(loadCategoriesProducts, state => ({ ...state, loading: true })),
    on(loadCategoriesProductsSuccess, (state, action) => ({
        ...state,
        loading: false,
        categoryProducts: action.categoryProducts
    })),
    on(loadCategoriesProductsFailure, (state, action) => ({ ...state, loading: false, error: action.error })),

    on(selectedCategoryProduct, (state, action) => ({ ...state, selectedCategoryProduct: action.categoryProduct })),
    on(loadCategoryProduct, state => ({ ...state, loading: true })),
    on(loadCategoryProductSuccess, (state, action) => ({
        ...state,
        loading: false,
        selectedCategoryProduct: action.categoryProduct
    })),
    on(loadCategoryProductFailure, (state, action) => ({ ...state, loading: false, error: action.error }))
)
