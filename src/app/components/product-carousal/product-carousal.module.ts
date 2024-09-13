import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { UtilsModule } from 'src/app/services/utils.module'
import { ProductCardModule } from '../product-card/product-card.module'
import { ProductCarousalComponent } from './product-carousal.component'

@NgModule({
    declarations: [ProductCarousalComponent],
    exports: [ProductCarousalComponent],
    imports: [CommonModule, CarouselModule, ProductCardModule, UtilsModule]
})
export class ProductCarousalModule {}
