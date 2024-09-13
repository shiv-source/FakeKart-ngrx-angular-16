import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { Observable, Subscription, filter, tap } from 'rxjs'
import { loadCategories, loadCategoriesProducts, selectedCategoryProduct } from 'src/app/store/category/category.action'
import { CategoryProduct } from 'src/app/store/category/category.reducer'
import { selectCategories, selectCategoryProducts } from 'src/app/store/category/category.selector'
import { addSelectedProduct, loadProducts } from 'src/app/store/product/product.action'
import { Product } from 'src/app/store/product/product.model'
import { ProductState } from 'src/app/store/product/product.reducer'
import { selectProducts } from 'src/app/store/product/product.selector'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription()
    products$ = this.store.select(selectProducts)
    categories$ = this.store.select(selectCategories)
    categoryProducts$: Observable<CategoryProduct[]> = this.store.select(selectCategoryProducts)

    banners: string[] = [
        'assets/images/banners/banner1.jpg',
        'assets/images/banners/banner2.jpg',
        'assets/images/banners/banner3.jpg',
        'assets/images/banners/banner4.jpg',
        'assets/images/banners/banner5.jpg'
    ]

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
        private readonly router: Router,
        private readonly store: Store<{ product: ProductState }>
    ) {}

    ngOnInit(): void {
        this.store.dispatch(loadProducts())
        this.store.dispatch(loadCategories())

        this.subscription.add(
            this.categories$
                .pipe(
                    filter(categories => categories && categories.length > 0),
                    tap(() => this.store.dispatch(loadCategoriesProducts()))
                )
                .subscribe()
        )
    }

    onSelectedProductEvent(product: Product) {
        this.router.navigate([`/product/${product.id}`])
        this.store.dispatch(addSelectedProduct({ selectedProduct: product }))
    }

    onSelectedCategoryEvent(category: string, categoryProduct: CategoryProduct) {
        this.store.dispatch(selectedCategoryProduct({ categoryProduct }))
        this.router.navigate(['/products'], {
            queryParams: { category }
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
