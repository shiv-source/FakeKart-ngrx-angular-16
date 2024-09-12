import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DynamicFormModule } from 'src/app/reusable/dynamic-form/dynamic-form.module'
import { SignupComponent } from './signup.component'

const routes: Routes = [
    {
        path: '',
        component: SignupComponent
    }
]

@NgModule({
    declarations: [SignupComponent],
    imports: [DynamicFormModule, RouterModule.forChild(routes)],
    exports: []
})
export class SignupModule {}
