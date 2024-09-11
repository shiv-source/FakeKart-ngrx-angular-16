import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'app-email-input',
    templateUrl: './email-input.component.html',
    styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent {
    @Input() control!: FormControl
    @Input() label!: string
    @Input() type: string = 'text'
}
