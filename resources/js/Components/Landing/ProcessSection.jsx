import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Palette, Code, Rocket, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ProcessSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            icon: Phone,
            number: 1,
            title: 'CALL',
            duration: '30 min',
            description: 'Quick discovery call to understand your business and requirements.',
            details: [
                'Understand your business goals',
                'Discuss design preferences',
                'Define project scope',
                'Get instant quote',
            ],
        },
        {
            icon: Palette,
            number: 2,
            title: 'DESIGN',
            duration: '2-3 days',
            description: 'AI-powered design mockups tailored to your brand.',
            details: [
                'Custom design concepts',
                'Mobile-first approach',
                'Unlimited revisions',
                'Brand alignment',
            ],
        },
        {
            icon: Code,
            number: 3,
            title: 'BUILD',
            duration: '4-7 days',
            description: 'We code your website with lightning speed.',
            details: [
                'Modern tech stack',
                'SEO optimization',
                'Performance tuning',
                'Payment integration',
            ],
        },
        {
            icon: Rocket,
            number: 4,
            title: 'LAUNCH',
            duration: 'Day 1',
            description: 'Your website goes live and starts working for you.',
            details: [
                'Domain setup',
                'SSL security',
                'Analytics setup',
                'Training session',
            ],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative py-24 bg-dark overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Your Website in <span className="text-gradient">4 Simple Steps</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        From idea to live website in as little as 7 days
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Connection Line - Desktop */}
                    <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-dark-lighter">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary via-accent-cyan to-accent-teal"
                            initial={{ width: 0 }}
                            animate={inView ? { width: '100%' } : {}}
                            transition={{ duration: 2, ease: 'easeOut' }}
                        />
                    </div>

                    {/* Steps */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="grid md:grid-cols-4 gap-8 relative"
                    >
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === index;
                            
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="relative"
                                >
                                    {/* Step Circle */}
                                    <motion.div
                                        className="relative mx-auto w-fit mb-6 cursor-pointer"
                                        onClick={() => setActiveStep(isActive ? -1 : index)}
                                        whileHover={{ scale: 1.1 }}
                                        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                                        transition={isActive ? { duration: 2, repeat: Infinity } : {}}
                                    >
                                        <div className={`
                                            w-16 h-16 rounded-full flex items-center justify-center
                                            transition-all duration-300
                                            ${isActive 
                                                ? 'bg-gradient-to-br from-primary to-accent-cyan shadow-lg shadow-primary/30' 
                                                : 'bg-dark-lighter border border-white/10'
                                            }
                                        `}>
                                            <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                        </div>
                                        
                                        {/* Step Number Badge */}
                                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                                            {step.number}
                                        </div>
                                    </motion.div>

                                    {/* Step Content */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <span className="text-xl font-bold text-white">{step.title}</span>
                                            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                                                {step.duration}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">{step.description}</p>

                                        {/* Accordion Details */}
                                        <motion.div
                                            initial={false}
                                            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-dark-lighter rounded-xl p-4 text-left border border-white/10">
                                                <ul className="space-y-2">
                                                    {step.details.map((detail, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>

                                        {/* Expand Hint */}
                                        <button 
                                            onClick={() => setActiveStep(isActive ? -1 : index)}
                                            className="mt-3 text-primary text-xs flex items-center justify-center gap-1 mx-auto hover:text-primary-light transition-colors"
                                        >
                                            {isActive ? 'Hide details' : 'Show details'}
                                            <motion.span
                                                animate={{ rotate: isActive ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </motion.span>
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Total Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-8 py-4">
                        <Rocket className="w-6 h-6 text-green-400" />
                        <span className="text-white font-semibold">
                            Total time: <span className="text-green-400">7-14 days</span> (not months!)
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
