import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MagneticButton({ 
    children, 
    className = '', 
    onClick,
    variant = 'primary',
    disabled = false,
    ...props 
}) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (disabled || !ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;
        
        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-accent-cyan text-white hover:shadow-lg hover:shadow-primary/30',
        secondary: 'bg-dark-lighter text-white border border-primary/30 hover:border-primary/60',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            disabled={disabled}
            whileTap={{ scale: 0.95 }}
            className={`
                relative inline-flex items-center justify-center px-8 py-4 
                text-lg font-semibold rounded-full
                transition-all duration-300 ease-out
                pulse-glow
                ${variants[variant]}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent-cyan/20 blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.button>
    );
}
