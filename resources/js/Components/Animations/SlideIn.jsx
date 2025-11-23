import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SlideIn({ children, direction = 'left', delay = 0, duration = 0.6, className = '' }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const directionOffset = {
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        up: { x: 0, y: 50 },
        down: { x: 0, y: -50 },
    };

    const offset = directionOffset[direction] || directionOffset.left;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...offset }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
