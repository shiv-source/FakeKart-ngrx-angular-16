import {
    Component,
    ComponentRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicFormFactory } from './dynamic-form.factory'
import { FormField } from './dynamic-form.interface'

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Input() formGroup!: FormGroup
    @Input() formFields: FormField[] = []
    @Input() actionTemplate: TemplateRef<any> | undefined
    @Input() hasResetBtn: boolean = false

    @ViewChild('formContainer', { read: ViewContainerRef, static: true }) formContainer: ViewContainerRef | undefined
    @ViewChild('form', { read: ViewContainerRef, static: true }) form!: ViewContainerRef

    @Output() formGroupValueEvent = new EventEmitter<any>()
    @Output() formGroupEvent = new EventEmitter<FormGroup>()

    constructor(private readonly dynamicFormFactory: DynamicFormFactory) {}

    ngOnInit(): void {
        if (this.formFields.length) {
            this.buildForm(this.formFields)
        }
    }

    buildForm(formFields: FormField[]): void {
        if (!this.formGroup) {
            this.formGroup = new FormGroup({})
        }

        if (this.formContainer) {
            this.formContainer.clear()

            formFields.forEach(field => {
                const validators: any = this.createValidators(field)
                // Dynamically create the component for the field
                const componentClass = this.dynamicFormFactory.getComponent(field.type)

                if (componentClass && this.formContainer) {
                    const componentRef: ComponentRef<any> = this.formContainer.createComponent(componentClass)
                    const control = new FormControl('', { validators })

                    componentRef.instance.control = control
                    componentRef.instance.label = field.label
                    componentRef.instance.matIcon = field.matIcon
                    componentRef.instance.iconPosition = field.iconPosition ?? 'suffix'
                    componentRef.instance.placeholder = field.placeholder
                    componentRef.instance.appearance = field.appearance ?? 'outline'
                    componentRef.instance.hint = field.hint
                    componentRef.instance.togglePassword = field.togglePassword ?? true

                    // adding the controls into formGroup
                    this.formGroup.addControl(field.key, control)

                    // Create a wrapper div and add classes
                    const wrapperDiv = document.createElement('div')
                    wrapperDiv.classList.add('w-full')
                    wrapperDiv.classList.add(`${field?.wrapperClass ?? 'col-span-6'}`)
                    wrapperDiv.appendChild(componentRef.location.nativeElement)

                    this.formContainer?.element.nativeElement.appendChild(wrapperDiv)
                }
            })
        }
    }

    createValidators(field: FormField): Validators[] {
        const validators: Validators[] = []

        if (field.required) {
            validators.push(Validators.required)
        }

        if (field.minLength) {
            validators.push(Validators.minLength(field.minLength))
        }
        if (field.maxLength) {
            validators.push(Validators.maxLength(field.maxLength))
        }
        if (field.pattern) {
            validators.push(Validators.pattern(field.pattern))
        }
        if (field.min) {
            validators.push(Validators.min(field.min))
        }
        if (field.max) {
            validators.push(Validators.max(field.max))
        }

        return validators
    }

    onSubmit(): void {
        if (this.formGroup.invalid) {
            return
        }
        this.formGroupValueEvent.emit(this.formGroup.value)
        this.formGroupEvent.emit(this.formGroup)

        console.log('Alway show this.formGroup.value', this.formGroup.value)
    }

    onReset(): void {
        this.formGroup.reset()
    }
}
