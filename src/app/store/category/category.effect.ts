import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, catchError, filter, forkJoin, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs'
import { UtilsService } from 'src/app/services/utils.service'
import {
    loadCategories,
    loadCategoriesFailure,
    loadCategoriesProducts,
    loadCategoriesProductsFailure,
    loadCategoriesProductsSuccess,
    loadCategoriesSuccess,
    loadCategoryProduct,
    loadCategoryProductFailure,
    loadCategoryProductSuccess
} from './category.action'
import { CategoryProduct } from './category.reducer'
import { selectCategories, selectCategoryState } from './category.selector'
import { CategoryService } from './category.service'

@Injectable({ providedIn: 'root' })
export class CategoryEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly categoryService: CategoryService,
        private readonly store: Store,
        private readonly utilsService: UtilsService
    ) {}

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            withLatestFrom(this.store.select(selectCategories)),
            filter(([action, categories]) => !categories || categories.length === 0),
            mergeMap(() =>
                this.categoryService.getCategories().pipe(
                    map(categories => loadCategoriesSuccess({ categories })),
                    catchError(error => of(loadCategoriesFailure({ error })))
                )
            )
        )
    )

    loadCategoriesProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategoriesProducts),
            withLatestFrom(this.store.select(selectCategoryState)),
            filter(
                ([_, categoryState]) =>
                    categoryState.categories && categoryState.categories.length > 0 && categoryState.categoryProducts.length < 1
            ),
            switchMap(([_, categoryState]) => {
                const categoriesObservables: Observable<CategoryProduct>[] = categoryState.categories.map(category =>
                    this.categoryService.getProductsByCategory(category)
                )
                return forkJoin(categoriesObservables)
            }),
            map(categoryProducts => {
                let electronics = categoryProducts
                    .filter(
                        (categoryProduct: CategoryProduct) =>
                            categoryProduct.category === 'laptop' ||
                            categoryProduct.category === 'audio' ||
                            categoryProduct.category === 'mobile'
                    )
                    .map(c => c.products)
                    .flat()

                electronics = this.utilsService.getRandomItems(electronics, 30)

                categoryProducts.unshift({ category: 'best in electronics', products: electronics })

                return loadCategoriesProductsSuccess({ categoryProducts })
            }),
            catchError(error => of(loadCategoriesProductsFailure({ error })))
        )
    )

    loadCategoryProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategoryProduct),
            mergeMap(action =>
                this.categoryService.getProductsByCategory(action.category).pipe(
                    map(categoryProduct => loadCategoryProductSuccess({ categoryProduct })),
                    catchError(error => of(loadCategoryProductFailure({ error })))
                )
            )
        )
    )
}
