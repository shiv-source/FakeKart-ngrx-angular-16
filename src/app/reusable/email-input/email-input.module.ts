import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EmailInputComponent } from './email-input.component'

@NgModule({
    declarations: [EmailInputComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [EmailInputComponent]
})
export class EmailInputModule {}
