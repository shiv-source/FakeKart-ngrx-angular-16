import { AfterViewInit, Component, Input } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-email-input',
    templateUrl: './email-input.component.html',
    styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements AfterViewInit {
    @Input() control!: FormControl
    @Input() label!: string
    @Input() iconPosition: 'prefix' | 'suffix' = 'suffix'
    @Input() placeholder: string = ''
    @Input() appearance: 'fill' | 'outline' = 'outline'
    @Input() hint: string = ''

    _matIcon: string = 'email'

    constructor() {}

    ngAfterViewInit(): void {
        this.control.addValidators(Validators.email)
    }
}
