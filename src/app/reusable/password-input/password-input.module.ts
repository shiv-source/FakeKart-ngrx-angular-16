import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PasswordInputComponent } from './password-input.component'

@NgModule({
    declarations: [PasswordInputComponent],
    imports: [CommonModule, FormsModule],
    exports: [PasswordInputComponent]
})
export class PasswordInputModule {}
