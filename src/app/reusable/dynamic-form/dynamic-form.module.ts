import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { EmailInputModule } from '../email-input/email-input.module'
import { TextInputModule } from '../text-input/text-input.module'
import { DynamicFormComponent } from './dynamic-form.component'
import { PasswordInputModule } from '../password-input/password-input.module'
import { NumberInputModule } from '../number-input/number-input.module'

@NgModule({
    declarations: [DynamicFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        TextInputModule,
        EmailInputModule,
        PasswordInputModule,
        NumberInputModule
    ],
    exports: [DynamicFormComponent]
})
export class DynamicFormModule {}
