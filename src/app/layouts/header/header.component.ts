import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { CartProduct } from 'src/app/store/cart/cart.model'
import { CartState } from 'src/app/store/cart/cart.reducer'
import { selectCartProducts } from 'src/app/store/cart/cart.selector'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    toggleNav: boolean = false
    quantity$ = this.store
        .select(selectCartProducts)
        .pipe(map((cartProducts: CartProduct[]) => cartProducts.reduce((acc, curr) => acc + curr.quantity, 0)))

    constructor(private store: Store<{ cart: CartState }>) {}
}
