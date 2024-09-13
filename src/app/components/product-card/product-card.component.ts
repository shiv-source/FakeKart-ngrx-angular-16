import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UtilsService } from 'src/app/services/utils.service'
import { Product } from 'src/app/store/product/product.model'

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product: Product | undefined

    @Output() selectedProductEvent = new EventEmitter<Product>()

    constructor(private readonly utilsService: UtilsService) {}

    get priceAfterDiscount() {
        // const price = this.product?.price ? this.product.price - (this.product?.discount ?? 0) : 0
        // return price.toFixed(2)

        return this.product ? this.utilsService.getPriceAfterDiscount(this.product) : 0
    }

    get discountPercent() {
        // const percent = this.product?.price ? ((this.product?.discount ?? 0) / this.product.price) * 100 : 0
        // return percent.toFixed(2)

        return this.product ? this.utilsService.getDiscountPercent(this.product) : 0
    }

    onProductSelect(product: Product) {
        this.selectedProductEvent.emit(product)
    }
}
