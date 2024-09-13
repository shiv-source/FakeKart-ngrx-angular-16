import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UtilsModule } from 'src/app/services/utils.module'
import { ProductCardComponent } from './product-card.component'

@NgModule({
    declarations: [ProductCardComponent],
    imports: [CommonModule, UtilsModule],
    exports: [ProductCardComponent]
})
export class ProductCardModule {}
