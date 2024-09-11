import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store, select } from '@ngrx/store'
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import {
    loadProduct,
    loadProductFailure,
    loadProductSuccess,
    loadProducts,
    loadProductsFailure,
    loadProductsSuccess
} from './product.action'
import { selectProducts } from './product.selector'
import { ProductService } from './product.service'

@Injectable({ providedIn: 'root' })
export class ProductEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly productService: ProductService,
        private readonly store: Store
    ) {}

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            withLatestFrom(this.store.pipe(select(selectProducts))),
            filter(([action, products]) => !products || products.length === 0),
            mergeMap(() =>
                this.productService.getProducts().pipe(
                    map(products => loadProductsSuccess({ products })),
                    catchError(error => of(loadProductsFailure(error)))
                )
            )
        )
    )

    loadProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProduct),
            mergeMap(action =>
                this.productService.getProductById(action.productId).pipe(
                    map(product => loadProductSuccess({ product })),
                    catchError(error => of(loadProductFailure(error)))
                )
            )
        )
    )
}
