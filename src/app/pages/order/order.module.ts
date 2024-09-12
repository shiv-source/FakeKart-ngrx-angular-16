import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrderComponent } from './order.component'

const routes: Routes = [
    {
        path: '',
        component: OrderComponent
    }
]

@NgModule({
    declarations: [OrderComponent],
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class OrderModule {}
