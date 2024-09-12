import { FormField } from 'src/app/reusable/dynamic-form/dynamic-form.interface'

export const loginFormSchema: FormField[] = [
    // {
    //     key: 'firstName',
    //     type: 'text',
    //     label: 'First Name',
    //     required: true,
    //     minLength: 2,
    //     maxLength: 30,
    //     matIcon: 'email'
    // },
    {
        key: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        wrapperClass: 'col-span-12'
    },
    {
        key: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        wrapperClass: 'col-span-12'
    }
]
