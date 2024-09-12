import { Component } from '@angular/core'
import { signupFormSchema } from './form.schema'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    _signupFormSchema = signupFormSchema
}
