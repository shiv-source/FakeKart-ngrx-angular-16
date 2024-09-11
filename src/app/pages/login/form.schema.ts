import { FormField } from 'src/app/reusable/dynamic-form/dynamic-form.interface'

export const loginFormSchema: FormField[] = [
    {
        key: 'firstName',
        type: 'text',
        label: 'First Name',
        required: true,
        minLength: 2,
        maxLength: 30
    },
    {
        key: 'email',
        type: 'email',
        label: 'Email',
        required: true
    }
]
