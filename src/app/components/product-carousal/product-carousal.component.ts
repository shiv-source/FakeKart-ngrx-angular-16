import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router } from '@angular/router'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { Product } from 'src/app/store/product/product.model'

@Component({
    selector: 'app-product-carousal',
    templateUrl: './product-carousal.component.html',
    styleUrls: ['./product-carousal.component.scss']
})
export class ProductCarousalComponent {
    @Input() category: string = ''
    @Input() products: Product[] = []
    @Input() hasDetailsBtn: boolean = true

    @Output() selectedProductEvent: EventEmitter<Product> = new EventEmitter<Product>()
    @Output() selectedCategoryEvent: EventEmitter<string> = new EventEmitter<string>()

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
                items: 6
            }
        },
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 500,
        margin: 15
    }

    constructor(private router: Router) {}

    onSelectCategory(category: string) {
        this.selectedCategoryEvent.emit(category)
    }

    onSelectedProductEvent(product: Product) {
        this.selectedProductEvent.emit(product)
    }
}
