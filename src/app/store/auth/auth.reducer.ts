import { createReducer } from '@ngrx/store'
import { User } from './auth.model'

export interface AuthState {
    user: User | null
    error: string | null
    loading: boolean
    isLoggedIn: boolean
}

const initialState: AuthState = {
    user: null,
    error: null,
    loading: false,
    isLoggedIn: false
}

export const authReducer = createReducer(initialState)
