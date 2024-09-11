import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product } from 'src/app/store/product/product.model'

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product: Product | undefined

    @Output() productSelectEvent = new EventEmitter<Product>()

    constructor() {}

    onProductSelect(product: Product) {
        this.productSelectEvent.emit(product)
    }
}
