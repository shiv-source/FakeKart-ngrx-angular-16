import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { EmailInputModule } from '../email-input/email-input.module'
import { TextInputModule } from '../text-input/text-input.module'
import { DynamicFormComponent } from './dynamic-form.component'

@NgModule({
    declarations: [DynamicFormComponent],
    imports: [CommonModule, ReactiveFormsModule, TextInputModule, EmailInputModule],
    exports: [DynamicFormComponent]
})
export class DynamicFormModule {}
