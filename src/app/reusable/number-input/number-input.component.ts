import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {
    @Input() control!: FormControl
    @Input() label!: string
    @Input() matIcon: string = ''
    @Input() iconPosition: 'prefix' | 'suffix' = 'suffix'
    @Input() placeholder: string = ''
    @Input() appearance: 'fill' | 'outline' = 'outline'
    @Input() hint: string = ''
}
