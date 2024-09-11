import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignupComponent } from './signup.component'

const routes: Routes = [
    {
        path: '',
        component: SignupComponent
    }
]

@NgModule({
    declarations: [SignupComponent],
    imports: [RouterModule.forChild(routes)],
    exports: []
})
export class SignupModule {}
