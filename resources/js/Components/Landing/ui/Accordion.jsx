import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items = [], className = '' }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => toggleItem(index)}
                />
            ))}
        </div>
    );
}

function AccordionItem({ item, isOpen, onToggle }) {
    return (
        <motion.div
            className={`
                bg-dark-lighter rounded-xl overflow-hidden
                border transition-colors duration-300
                ${isOpen ? 'border-primary/50' : 'border-white/10'}
            `}
            initial={false}
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
                <span className="text-lg font-semibold text-white pr-4">
                    {item.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
