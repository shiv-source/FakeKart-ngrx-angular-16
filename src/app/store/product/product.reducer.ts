import { createReducer, on } from '@ngrx/store'
import {
    addSelectedProduct,
    loadProduct,
    loadProductFailure,
    loadProductSuccess,
    loadProducts,
    loadProductsFailure,
    loadProductsSuccess
} from './product.action'
import { Product } from './product.model'

export interface ProductState {
    products: Product[]
    error: string | null
    loading: boolean
    selectedProduct: Product | null
}

const initialState: ProductState = {
    products: [],
    error: null,
    loading: false,
    selectedProduct: null
}

export const productReducer = createReducer(
    initialState,
    on(loadProducts, state => ({ ...state, loading: true })),
    on(loadProductsSuccess, (state, action) => ({ ...state, loading: false, products: action.products })),
    on(loadProductsFailure, (state, action) => ({ ...state, loading: false, error: action.error })),
    on(addSelectedProduct, (state, action) => ({ ...state, selectedProduct: action.selectedProduct })),
    on(loadProduct, state => ({ ...state, loading: true })),
    on(loadProductSuccess, (state, action) => ({ ...state, loading: false, selectedProduct: action.product })),
    on(loadProductFailure, (state, action) => ({ ...state, loading: false, selectedProduct: action.error }))
)
