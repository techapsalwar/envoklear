import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

export default function PricingCard({
    name,
    price,
    originalPrice,
    description,
    features = [],
    isPopular = false,
    ctaText = 'Get Started',
    onCtaClick,
    className = '',
}) {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Subtle tilt effect - reduced for mobile
        const maxRotate = 5;
        setRotateX((-mouseY / rect.height) * maxRotate);
        setRotateY((mouseX / rect.width) * maxRotate);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
            className={`
                relative rounded-2xl p-8
                transition-all duration-200 ease-out
                ${isPopular 
                    ? 'bg-gradient-to-br from-primary/20 to-accent-cyan/20 border-2 border-primary glow-border scale-105 z-10' 
                    : 'bg-dark-lighter border border-white/10 hover:border-white/20'
                }
                ${className}
            `}
            whileHover={{ scale: isPopular ? 1.08 : 1.03 }}
        >
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-accent-cyan px-4 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 text-white fill-white" />
                        <span className="text-sm font-bold text-white">MOST POPULAR</span>
                    </div>
                </div>
            )}

            {/* Plan Name */}
            <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
            <p className="text-gray-400 text-sm mb-6">{description}</p>

            {/* Price */}
            <div className="mb-6">
                {originalPrice && (
                    <div className="relative inline-block mb-1">
                        <span className="text-gray-500 text-lg line-through">
                            ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            SAVE {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                        </span>
                    </div>
                )}
                <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-white">
                        ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-400 ml-2">one-time</span>
                </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                    >
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isPopular ? 'text-primary' : 'text-green-400'}`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.li>
                ))}
            </ul>

            {/* CTA Button */}
            <motion.button
                onClick={onCtaClick}
                whileTap={{ scale: 0.95 }}
                className={`
                    w-full py-4 rounded-xl font-bold text-lg
                    transition-all duration-300
                    ${isPopular 
                        ? 'bg-gradient-to-r from-primary to-accent-cyan text-white hover:shadow-lg hover:shadow-primary/30' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }
                `}
            >
                {ctaText}
            </motion.button>
        </motion.div>
    );
}
