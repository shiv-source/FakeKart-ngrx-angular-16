import { Action, ActionReducer, ActionReducerMap, INIT, UPDATE } from '@ngrx/store'
import { environment } from 'src/environments/environment'
import { AuthState, authReducer } from './auth/auth.reducer'
import { CartState, cartReducer } from './cart/cart.reducer'
import { ProductState, productReducer } from './product/product.reducer'

export interface AppState {
    product: ProductState
    cart: CartState
    auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer
}

export const loggerMetaReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state: any, action: Action) => {
        console.log('Action dispatched:', action)
        console.log('Previous state:', state)
        const nextState = reducer(state, action)
        console.log('Next state:', nextState)
        return nextState
    }
}

// Save state to localStorage
export function saveToLocalStorage(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        const nextState = reducer(state, action)

        if (action.type === INIT || action.type === UPDATE) {
            // Load the cart from localStorage if it exists
            const savedCart = localStorage.getItem('cartState')
            if (savedCart) {
                return {
                    ...nextState,
                    cart: JSON.parse(savedCart)
                }
            }
        }

        // Save cart state to localStorage
        localStorage.setItem('cartState', JSON.stringify(nextState.cart))

        return nextState
    }
}

export const metaReducers = !environment.production ? [loggerMetaReducer, saveToLocalStorage] : [saveToLocalStorage]
