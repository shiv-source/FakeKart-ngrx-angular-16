/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#4A90E2',
                secondary: '#50E3C2',
                'primary-dark': '#F5F7FA'
            }
        }
    },
    plugins: []
}
