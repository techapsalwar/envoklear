export default function Section({
    className = '',
    id,
    background = 'white',
    children,
}) {
    const backgrounds = {
        white: 'bg-white',
        light: 'bg-envoklear-light-gray',
        dark: 'bg-envoklear-dark text-white',
        green: 'bg-envoklear-green text-white',
    };

    return (
        <section
            id={id}
            className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
}
