import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AnimatedPieChart({
    data = [],
    size = 200,
    strokeWidth = 30,
    className = '',
}) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    let currentOffset = 0;

    return (
        <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size }}>
            <svg 
                width={size} 
                height={size} 
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                />
                
                {/* Data segments */}
                {data.map((item, index) => {
                    const segmentLength = (item.value / 100) * circumference;
                    const offset = currentOffset;
                    currentOffset += segmentLength;
                    
                    return (
                        <motion.circle
                            key={index}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke={item.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={inView ? { 
                                strokeDashoffset: circumference - segmentLength,
                            } : {}}
                            transition={{ 
                                duration: 1, 
                                delay: index * 0.2,
                                ease: 'easeOut'
                            }}
                            style={{
                                strokeDashoffset: circumference - offset - segmentLength,
                            }}
                            className="origin-center"
                        />
                    );
                })}
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">
                    {data.reduce((acc, item) => acc + item.value, 0)}%
                </span>
            </div>
        </div>
    );
}

// Simpler donut chart variant
export function DonutChart({ 
    percentage = 0, 
    label = '', 
    sublabel = '',
    color = '#6366f1',
    size = 160,
    strokeWidth = 12,
    className = '' 
}) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={inView ? { strokeDashoffset } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span 
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                >
                    {label}
                </motion.span>
                {sublabel && (
                    <span className="text-xs text-gray-400 mt-1">{sublabel}</span>
                )}
            </div>
        </div>
    );
}
