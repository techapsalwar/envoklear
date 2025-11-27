import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function AnimatedCounter({ 
    value, 
    prefix = '', 
    suffix = '', 
    duration = 2,
    decimals = 0,
    className = '' 
}) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [displayValue, setDisplayValue] = useState(0);
    
    const count = useMotionValue(0);
    const springCount = useSpring(count, { duration: duration * 1000, bounce: 0 });

    useEffect(() => {
        if (inView) {
            count.set(value);
        }
    }, [inView, value, count]);

    useEffect(() => {
        const unsubscribe = springCount.on('change', (latest) => {
            setDisplayValue(decimals > 0 ? latest.toFixed(decimals) : Math.round(latest));
        });
        return () => unsubscribe();
    }, [springCount, decimals]);

    return (
        <motion.span 
            ref={ref}
            className={className}
        >
            {prefix}{displayValue.toLocaleString('en-IN')}{suffix}
        </motion.span>
    );
}
