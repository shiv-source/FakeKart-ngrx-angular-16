import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { Observable, Subscription, combineLatest, filter, map, take, tap } from 'rxjs'
import { offersSchema } from 'src/app/schema/offers.schema'
import { UtilsService } from 'src/app/services/utils.service'
import { addProductToCart } from 'src/app/store/cart/cart.action'
import { loadCategoryProduct } from 'src/app/store/category/category.action'
import { selectSelectedCategoryProduct } from 'src/app/store/category/category.selector'
import { addSelectedProduct, loadProduct } from 'src/app/store/product/product.action'
import { Product } from 'src/app/store/product/product.model'
import { ProductState } from 'src/app/store/product/product.reducer'
import { selectSelectedProduct } from 'src/app/store/product/product.selector'

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription()
    productId$: Observable<string> = this.route.params.pipe(
        filter(params => !!params),
        map(params => params['productId'])
    )
    product$ = this.store.select(selectSelectedProduct)
    similarProducts$ = combineLatest([this.product$, this.store.select(selectSelectedCategoryProduct)]).pipe(
        map(([product, categoryProduct]) => categoryProduct?.products.filter(p => p.id !== product?.id))
    )

    offers = offersSchema
    _offers = offersSchema.slice(0, 4)

    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            740: {
                items: 1
            },
            940: {
                items: 1
            }
        },
        nav: false,
        autoplay: true, // Enable auto scroll
        autoplayTimeout: 3000, // Set auto scroll interval to 3000 ms (3 seconds)
        autoplayHoverPause: true, // Optional: pause on hover
        smartSpeed: 500 // Smooth transition speed (in ms)
    }

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store<{ product: ProductState }>,
        private readonly utilsService: UtilsService,
        private readonly router: Router
    ) {}

    getPriceAfterDiscount(product: Product) {
        return this.utilsService.getPriceAfterDiscount(product)
    }

    getDiscountPercent(product: Product) {
        return this.utilsService.getDiscountPercent(product)
    }

    ngOnInit(): void {
        this.subscription.add(
            combineLatest([this.productId$, this.product$])
                .pipe(
                    filter(([productId, product]) => Boolean(productId) && !product),
                    tap(([productId, product]) => {
                        this.store.dispatch(loadProduct({ productId: Number(productId) }))
                    })
                )
                .subscribe()
        )

        this.subscription.add(
            combineLatest([this.product$, this.store.select(selectSelectedCategoryProduct)])
                .pipe(
                    filter(([product, categoryProduct]) => !!product?.category),
                    take(1),
                    tap(([product]) => {
                        if (product?.category) this.store.dispatch(loadCategoryProduct({ category: product.category }))
                    })
                )
                .subscribe()
        )
    }

    onAddToCart(product: Product) {
        this.store.dispatch(addProductToCart({ product }))
        this.router.navigateByUrl('/cart')
    }

    onSelectedProductEvent(product: Product) {
        this.store.dispatch(addSelectedProduct({ selectedProduct: product }))
        this.router.navigate([`/product/${product.id}`])
    }

    onShowAllOffers() {
        this._offers = this.offers
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
