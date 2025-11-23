import { Link } from '@inertiajs/react';

export default function Button({
    type = 'button',
    variant = 'primary',
    className = '',
    processing,
    children,
    href,
    ...props
}) {
    const baseClasses =
        'inline-flex items-center px-6 py-3 border text-base font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5';

    const variants = {
        primary:
            'border-transparent text-white bg-envoklear-green hover:bg-envoklear-green-dark focus:ring-envoklear-green',
        secondary:
            'border-transparent text-envoklear-green bg-envoklear-green-light hover:bg-envoklear-green-100 focus:ring-envoklear-green-500',
        outline:
            'border-envoklear-green text-envoklear-green bg-transparent hover:bg-envoklear-green-50 focus:ring-envoklear-green',
        dark:
            'border-transparent text-white bg-envoklear-dark hover:bg-gray-800 focus:ring-gray-500',
    };

    const classes = `${baseClasses} ${variants[variant]} ${processing ? 'opacity-25 cursor-not-allowed' : ''
        } ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            disabled={processing}
            {...props}
        >
            {children}
        </button>
    );
}
