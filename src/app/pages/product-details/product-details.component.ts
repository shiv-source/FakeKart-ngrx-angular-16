import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs'
import { addProductToCart } from 'src/app/store/cart/cart.action'
import { loadProduct } from 'src/app/store/product/product.action'
import { Product } from 'src/app/store/product/product.model'
import { ProductState } from 'src/app/store/product/product.reducer'
import { selectSelectedProduct } from 'src/app/store/product/product.selector'

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    productId$: Observable<string> = this.route.params.pipe(
        filter(params => !!params),
        map(params => params['productId'])
    )

    product$ = this.store.select(selectSelectedProduct)

    subscription: Subscription = new Subscription()

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store<{ product: ProductState }>
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            combineLatest([this.productId$, this.product$])
                .pipe(
                    map(([productId, product]) => {
                        if (productId && !product) {
                            this.store.dispatch(loadProduct({ productId: Number(productId) }))
                        }
                    })
                )
                .subscribe()
        )
    }

    onAddToCart(product: Product) {
        this.store.dispatch(addProductToCart({ product }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
