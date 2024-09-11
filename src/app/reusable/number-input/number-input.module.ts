import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NumberInputComponent } from './number-input.component'

@NgModule({
    declarations: [NumberInputComponent],
    imports: [CommonModule, FormsModule],
    exports: [NumberInputComponent]
})
export class NumberInputModule {}
