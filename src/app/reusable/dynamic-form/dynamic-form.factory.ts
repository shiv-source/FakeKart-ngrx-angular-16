import { Injectable, Type } from '@angular/core'
import { EmailInputComponent } from '../email-input/email-input.component'
import { TextInputComponent } from '../text-input/text-input.component'
import { PasswordInputComponent } from '../password-input/password-input.component'
import { NumberInputComponent } from '../number-input/number-input.component'

@Injectable({
    providedIn: 'root'
})
export class DynamicFormFactory {
    private componentMap: { [key: string]: Type<any> } = {
        text: TextInputComponent,
        email: EmailInputComponent,
        password: PasswordInputComponent,
        number: NumberInputComponent

    }

    getComponent(type: string): Type<any> {
        const component = this.componentMap[type]
        if (!component) {
            throw new Error(`Component for type ${type} not found`)
        }
        return component
    }
}
