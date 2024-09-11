import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TextInputComponent } from './text-input.component'

@NgModule({
    declarations: [TextInputComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [TextInputComponent]
})
export class TextInputModule {}
