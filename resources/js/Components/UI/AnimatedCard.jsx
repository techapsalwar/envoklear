import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedCard({ children, className = '', ...props }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' }
            }}
            {...props}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-envoklear-green to-blue-500 rounded-lg opacity-0"
                animate={{ opacity: isHovered ? 0.1 : 0 }}
                transition={{ duration: 0.3 }}
            />
            {children}
        </motion.div>
    );
}
