import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, Subscription, map, tap } from 'rxjs'
import { AuthState } from 'src/app/store/auth/auth.reducer'
import { selectIsLoggedIn } from 'src/app/store/auth/auth.selector'
import { addProductToCart, removeProductFromCart } from 'src/app/store/cart/cart.action'
import { CartProduct } from 'src/app/store/cart/cart.model'
import { CartState } from 'src/app/store/cart/cart.reducer'
import { selectCartProducts } from 'src/app/store/cart/cart.selector'
import { addSelectedProduct } from 'src/app/store/product/product.action'
import { Product } from 'src/app/store/product/product.model'

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription()
    cartProducts$: Observable<CartProduct[]> = this.store.select(selectCartProducts)

    subTotal$ = this.store.select(selectCartProducts).pipe(
        map((cartProducts: CartProduct[]) => {
            const quantity = cartProducts.reduce((acc, curr) => acc + curr.quantity, 0)
            const price = cartProducts.reduce((acc, curr) => acc + curr.quantity * curr.product.price, 0)
            return { quantity, price }
        })
    )

    isLoggedIn: boolean = false

    constructor(
        private readonly store: Store<{ cart: CartState; auth: AuthState }>,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            this.store
                .select(selectIsLoggedIn)
                .pipe(tap(isLoggedIn => (this.isLoggedIn = isLoggedIn)))
                .subscribe()
        )
    }

    addProduct(product: Product) {
        this.store.dispatch(addProductToCart({ product }))
    }

    removeProduct(product: Product) {
        this.store.dispatch(removeProductFromCart({ product }))
    }

    calculateProductPrice(cartProducts: CartProduct) {
        return ((cartProducts.product.price * cartProducts.quantity * 100) / 100).toFixed(2)
    }

    calculateGst(price: number) {
        return ((price * 18) / 100).toFixed(2)
    }

    calculateTotalAmount(price: number) {
        return (price + (price * 18) / 100).toFixed(2)
    }

    onProceedToPay() {
        if (!this.isLoggedIn) {
            this.router.navigate(['/login'])
        }
    }

    onSelectProduct(product: Product) {
        this.store.dispatch(addSelectedProduct({ selectedProduct: product }))
        this.router.navigate([`/product/${product.id}`])
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
