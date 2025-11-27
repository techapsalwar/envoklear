import { motion } from 'framer-motion';

export default function FlipCard({ 
    frontContent, 
    backContent, 
    className = '',
    frontClassName = '',
    backClassName = '' 
}) {
    return (
        <div className={`flip-card h-full ${className}`}>
            <motion.div 
                className="flip-card-inner relative w-full h-full"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div 
                    className={`
                        flip-card-front absolute inset-0 w-full h-full
                        bg-dark-lighter rounded-2xl p-6
                        border border-white/10
                        flex flex-col items-center justify-center
                        ${frontClassName}
                    `}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {frontContent}
                </div>
                
                {/* Back */}
                <div 
                    className={`
                        flip-card-back absolute inset-0 w-full h-full
                        bg-gradient-to-br from-primary/20 to-accent-cyan/20 
                        rounded-2xl p-6
                        border border-primary/30
                        flex flex-col items-center justify-center
                        ${backClassName}
                    `}
                    style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {backContent}
                </div>
            </motion.div>
        </div>
    );
}
