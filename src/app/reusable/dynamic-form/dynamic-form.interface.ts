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
}
