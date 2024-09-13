import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductCardModule } from 'src/app/components/product-card/product-card.module'
import { UtilsModule } from 'src/app/services/utils.module'
import { ProductsComponent } from './products.component'

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent
    }
]

@NgModule({
    declarations: [ProductsComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ProductCardModule, UtilsModule],
    exports: []
})
export class ProductsModule {}
