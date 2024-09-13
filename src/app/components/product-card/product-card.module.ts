import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AppDirectiveModule } from 'src/app/reusable/directives/directive.module'
import { UtilsModule } from 'src/app/services/utils.module'
import { ProductCardComponent } from './product-card.component'

@NgModule({
    declarations: [ProductCardComponent],
    imports: [CommonModule, UtilsModule, AppDirectiveModule],
    exports: [ProductCardComponent]
})
export class ProductCardModule {}
