import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
    @Input() control!: FormControl
    @Input() label!: string
    @Input() iconPosition: 'prefix' | 'suffix' = 'suffix'
    @Input() placeholder: string = ''
    @Input() appearance: 'fill' | 'outline' = 'outline'
    @Input() hint: string = ''
    @Input() togglePassword: boolean = true

    _type: 'password' | 'text' = 'password'

    _show: boolean = false

    get _matIcon() {
        return this._show ? 'visibility_off' : 'visibility'
    }
}
