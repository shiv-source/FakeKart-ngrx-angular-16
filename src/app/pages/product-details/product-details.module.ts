import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductCarousalModule } from 'src/app/components/product-carousal/product-carousal.module'
import { UtilsModule } from 'src/app/services/utils.module'
import { ProductDetailsComponent } from './product-details.component'

const routes: Routes = [
    {
        path: '',
        component: ProductDetailsComponent
    }
]

@NgModule({
    declarations: [ProductDetailsComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ProductCarousalModule, UtilsModule],
    exports: []
})
export class ProductDetailsModule {}
