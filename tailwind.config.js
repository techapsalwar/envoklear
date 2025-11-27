import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Poppins', ...defaultTheme.fontFamily.sans],
                display: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                envoklear: {
                    green: {
                        DEFAULT: '#00b84d',
                        50: 'rgba(0, 184, 77, 0.05)',
                        100: 'rgba(0, 184, 77, 0.1)',
                        500: '#00b84d',
                        600: '#009d40',
                        700: '#007830',
                        light: '#e6f9f0',
                        dark: '#009d40',
                    },
                    dark: {
                        DEFAULT: '#1a1a1a',
                        gray: '#4a4a4a',
                    },
                    light: {
                        gray: '#f4f6f8',
                    },
                    border: '#e5e7eb',
                },
                primary: {
                    DEFAULT: '#6366f1',
                    dark: '#4f46e5',
                    light: '#818cf8',
                },
                accent: {
                    cyan: '#06b6d4',
                    purple: '#a855f7',
                    teal: '#14b8a6',
                },
                dark: {
                    DEFAULT: '#0f172a',
                    lighter: '#1e293b',
                    card: '#1e293b',
                },
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },

    plugins: [forms],
};
