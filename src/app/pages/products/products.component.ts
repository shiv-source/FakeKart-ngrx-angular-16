import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs'
import { loadCategories, loadCategoriesProducts, selectedCategoryProduct } from 'src/app/store/category/category.action'
import { CategoryProduct } from 'src/app/store/category/category.reducer'
import { selectCategories, selectCategoryProducts, selectSelectedCategoryProduct } from 'src/app/store/category/category.selector'
import { addSelectedProduct } from 'src/app/store/product/product.action'
import { Product } from 'src/app/store/product/product.model'

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription()
    selectedCategory: string = ''

    categoryProduct$: Observable<CategoryProduct | null> = this.store.select(selectSelectedCategoryProduct)

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            combineLatest([
                this.route.queryParams,
                this.store.select(selectSelectedCategoryProduct),
                this.store.select(selectCategoryProducts),
                this.store.select(selectCategories)
            ])
                .pipe(
                    filter(([params, categoryProduct, categoryProducts, categories]) => !!params),
                    map(
                        ([params, categoryProduct, categoryProducts, categories]: [
                            Params,
                            CategoryProduct | null,
                            CategoryProduct[],
                            string[]
                        ]) => {
                            this.selectedCategory = params['category']
                            return [params, categoryProduct, categoryProducts, categories, this.selectedCategory] as [
                                Params,
                                CategoryProduct | null,
                                CategoryProduct[],
                                string[],
                                string
                            ]
                        }
                    ),
                    filter(
                        ([params, categoryProduct, categoryProducts, categories, category]) =>
                            Boolean(category) && categoryProduct === null
                    ),
                    map(([params, categoryProduct, categoryProducts, categories, category]) => {
                        this.store.dispatch(loadCategories())
                        return [params, categoryProduct, categoryProducts, categories, category]
                    }),
                    filter(
                        ([params, categoryProduct, categoryProducts, categories, category]) =>
                            Boolean(category) && Array.isArray(categories) && categories.length > 0
                    ),
                    map(([params, categoryProduct, categoryProducts, categories, category]) => {
                        this.store.dispatch(loadCategoriesProducts())
                        return [params, categoryProduct, categoryProducts, categories, category]
                    }),
                    filter(
                        ([params, categoryProduct, categoryProducts, categories, category]) =>
                            Boolean(category) &&
                            categoryProduct === null &&
                            Array.isArray(categoryProducts) &&
                            categoryProducts.length > 0
                    ),
                    map(([params, categoryProduct, categoryProducts, categories, category]) => {
                        const selectedProduct = (categoryProducts as CategoryProduct[]).find(
                            categoryProduct => categoryProduct.category === category
                        )
                        if (selectedProduct) this.store.dispatch(selectedCategoryProduct({ categoryProduct: selectedProduct }))
                    })
                )
                .subscribe()
        )
    }

    onSelectedProductEvent(product: Product) {
        this.store.dispatch(addSelectedProduct({ selectedProduct: product }))
        this.router.navigate([`/product/${product.id}`])
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
