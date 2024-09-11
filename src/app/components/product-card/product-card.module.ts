import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProductCardComponent } from './product-card.component'

@NgModule({
    declarations: [ProductCardComponent],
    imports: [CommonModule],
    exports: [ProductCardComponent]
})
export class ProductCardModule {}
