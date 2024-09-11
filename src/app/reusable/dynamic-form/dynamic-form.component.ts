import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
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

    @ViewChild('formContainer', { read: ViewContainerRef, static: true }) formContainer: ViewContainerRef | undefined
    @ViewChild('form', { read: ViewContainerRef, static: true }) form!: ViewContainerRef

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
                    componentRef.instance.type = field.type
                    this.formGroup.addControl(field.key, control)
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
        console.log('Alway show this.formGroup.value', this.formGroup.value)
    }

    onClear(): void {
        this.formGroup.reset()
    }
}
