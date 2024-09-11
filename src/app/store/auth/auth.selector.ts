import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from './auth.reducer'

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectIsLoggedIn = createSelector(selectAuthState, state => state.isLoggedIn)
export const selectUser = createSelector(selectAuthState, state => state.user)
export const selectLoading = createSelector(selectAuthState, state => state.loading)
