import { Component } from '@angular/core'
import { loginFormSchema } from './form.schema'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    _loginFormSchema = loginFormSchema
}
