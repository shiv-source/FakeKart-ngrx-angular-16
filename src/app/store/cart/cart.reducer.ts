import { createReducer, on } from '@ngrx/store'
import { addProductToCart, removeProductFromCart } from './cart.action'
import { CartProduct } from './cart.model'

export interface CartState {
    products: CartProduct[]
    error: string | null
    loading: boolean
}

const initialState: CartState = {
    products: [],
    error: null,
    loading: false
}

export const cartReducer = createReducer(
    initialState,
    on(addProductToCart, (state, action) => {
        let productInCart = state.products.find(p => p.product.id === action.product.id)

        let updatedProducts: CartProduct[] = []

        if (productInCart) {
            updatedProducts = state.products.map(p =>
                p.product.id === action.product.id ? { ...p, quantity: p.quantity + 1 } : p
            )
        } else {
            updatedProducts = [...state.products, { product: action.product, quantity: 1 }]
        }

        return { ...state, products: updatedProducts }
    }),
    on(removeProductFromCart, (state, action) => {
        const productInCart = state.products.find(p => p.product.id === action.product.id)

        if (!productInCart) {
            return state
        }

        let updatedProducts: CartProduct[] = []
        if (productInCart.quantity > 1) {
            updatedProducts = state.products.map(p =>
                p.product.id === action.product.id ? { ...p, quantity: p.quantity - 1 } : p
            )
        } else {
            updatedProducts = state.products.filter(p => p.product.id !== action.product.id)
        }

        return { ...state, products: updatedProducts }
    })
)
