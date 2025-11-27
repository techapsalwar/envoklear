import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel3D({
    items = [],
    autoRotate = true,
    autoRotateInterval = 4000,
    className = '',
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const totalItems = items.length;

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    };

    useEffect(() => {
        if (autoRotate && !isPaused && totalItems > 1) {
            intervalRef.current = setInterval(next, autoRotateInterval);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [autoRotate, isPaused, autoRotateInterval, totalItems]);

    const getItemStyle = (index) => {
        const diff = index - currentIndex;
        const normalizedDiff = ((diff + totalItems) % totalItems);
        
        // Calculate position based on distance from current
        let translateX = 0;
        let translateZ = 0;
        let rotateY = 0;
        let opacity = 1;
        let scale = 1;

        if (normalizedDiff === 0) {
            // Current item
            translateX = 0;
            translateZ = 100;
            opacity = 1;
            scale = 1;
        } else if (normalizedDiff === 1 || normalizedDiff === totalItems - 1) {
            // Adjacent items
            translateX = normalizedDiff === 1 ? 60 : -60;
            translateZ = 0;
            rotateY = normalizedDiff === 1 ? -15 : 15;
            opacity = 0.6;
            scale = 0.85;
        } else {
            // Hidden items
            opacity = 0;
            scale = 0.7;
            translateZ = -100;
        }

        return {
            transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
            zIndex: normalizedDiff === 0 ? 10 : 5 - Math.abs(normalizedDiff),
        };
    };

    return (
        <div 
            className={`relative ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Carousel Container */}
            <div 
                className="relative h-[400px] flex items-center justify-center"
                style={{ perspective: '1000px' }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute w-full max-w-lg"
                        animate={getItemStyle(index)}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{ 
                            transformStyle: 'preserve-3d',
                            pointerEvents: index === currentIndex ? 'auto' : 'none'
                        }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>

            {/* Navigation Buttons */}
            {totalItems > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'w-8 bg-primary' 
                                : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
