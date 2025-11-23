import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function StaggerChildren({ children, staggerDelay = 0.1, className = '' }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const StaggerItem = ({ children, className = '' }) => {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    );
};
