import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function useScrollAnimation(options = {}) {
    const { threshold = 0.1, triggerOnce = true } = options;
    
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold,
        triggerOnce,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else if (!triggerOnce) {
            controls.start('hidden');
        }
    }, [controls, inView, triggerOnce]);

    return { ref, controls, inView };
}

// Common animation variants
export const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export const fadeInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};
