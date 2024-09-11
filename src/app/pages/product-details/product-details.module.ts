import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductDetailsComponent } from './product-details.component'

const routes: Routes = [
    {
        path: '',
        component: ProductDetailsComponent
    }
]

@NgModule({
    declarations: [ProductDetailsComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: []
})
export class ProductDetailsModule {}
