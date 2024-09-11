import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { addSelectedProduct, loadProducts } from 'src/app/store/product/product.action'
import { Product } from 'src/app/store/product/product.model'
import { ProductState } from 'src/app/store/product/product.reducer'
import { selectProducts } from 'src/app/store/product/product.selector'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    products$ = this.store.select(selectProducts)

    constructor(
        private readonly router: Router,
        private readonly store: Store<{ product: ProductState }>
    ) {}

    ngOnInit(): void {
        this.store.dispatch(loadProducts())
    }

    onProductSelectEvent(product: Product) {
        this.router.navigate([`/product/${product.id}`])
        this.store.dispatch(addSelectedProduct({ selectedProduct: product }))
    }
}
