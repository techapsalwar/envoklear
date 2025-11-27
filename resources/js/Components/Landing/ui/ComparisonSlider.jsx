import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ComparisonSlider({
    beforeContent,
    afterContent,
    beforeLabel = 'Before',
    afterLabel = 'After',
    className = '',
}) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setSliderPosition(percent);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div 
            ref={containerRef}
            className={`comparison-slider relative overflow-hidden rounded-2xl ${className}`}
        >
            {/* After (Bottom Layer) */}
            <div className="w-full">
                {afterContent}
            </div>

            {/* Before (Top Layer with clip) */}
            <div 
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                {beforeContent}
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                {beforeLabel}
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                {afterLabel}
            </div>

            {/* Slider Handle */}
            <motion.div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-700">
                        <path d="M7 4L3 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 4L17 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
