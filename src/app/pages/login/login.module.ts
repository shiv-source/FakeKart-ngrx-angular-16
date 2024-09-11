import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DynamicFormModule } from 'src/app/reusable/dynamic-form/dynamic-form.module'
import { LoginComponent } from './login.component'

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
]

@NgModule({
    declarations: [LoginComponent],
    imports: [RouterModule.forChild(routes), DynamicFormModule],
    exports: []
})
export class LoginModule {}
