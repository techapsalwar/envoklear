export default function Card({ className = '', children, ...props }) {
    return (
        <div
            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
