export type Appearance = 'fill' | 'outline'

export interface FormField {
    key: string
    type: string
    label: string
    required: boolean
    minLength?: number
    maxLength?: number
    pattern?: string
    min?: number
    max?: number
    wrapperClass?: string
    matIcon?: string
    iconPosition?: 'prefix' | 'suffix'
    placeholder?: string
    appearance?: Appearance
    hint?: string
    togglePassword?: boolean
}
