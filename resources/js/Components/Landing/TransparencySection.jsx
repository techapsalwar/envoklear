import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Users, Clock, MessageSquare } from 'lucide-react';
import { DonutChart } from './ui/AnimatedPieChart';

export default function TransparencySection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="relative py-24 bg-dark overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Why We're <span className="text-gradient">70% Cheaper</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Complete transparency. No hidden costs. Just smart use of AI technology.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Pie Chart Comparison */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid sm:grid-cols-2 gap-8"
                    >
                        {/* Traditional Agency */}
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-white mb-4">Traditional Agency</h3>
                            <div className="flex justify-center mb-4">
                                <DonutChart
                                    percentage={95}
                                    label="95%"
                                    sublabel="Overhead"
                                    color="#ef4444"
                                />
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="text-gray-400">95% Office, Salaries, Marketing</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                                    <span className="text-gray-400">5% Actual Work</span>
                                </div>
                            </div>
                        </div>

                        {/* EnvoKlear */}
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-white mb-4">EnvoKlear</h3>
                            <div className="flex justify-center mb-4">
                                <DonutChart
                                    percentage={60}
                                    label="60%"
                                    sublabel="AI Power"
                                    color="#6366f1"
                                />
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                    <span className="text-gray-400">60% AI-Powered Efficiency</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-gray-400">40% You Save!</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline Race */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-dark-lighter rounded-2xl p-8 border border-white/10"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-primary" />
                            Delivery Speed Comparison
                        </h3>

                        {/* Traditional Agency Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Traditional Agency</span>
                                <span className="text-red-400 font-semibold">8-12 weeks</span>
                            </div>
                            <div className="h-8 bg-dark rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-end pr-4"
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: '100%' } : {}}
                                    transition={{ duration: 2, delay: 0.5 }}
                                >
                                    <span className="text-white text-xs font-bold">12 weeks</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* EnvoKlear Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">EnvoKlear</span>
                                <span className="text-green-400 font-semibold">7 days 🚀</span>
                            </div>
                            <div className="h-8 bg-dark rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-end pr-4"
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: '8%' } : {}}
                                    transition={{ duration: 0.5, delay: 1.5 }}
                                >
                                    <span className="text-white text-xs font-bold">7d</span>
                                </motion.div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm mt-6 text-center">
                            <span className="text-green-400 font-bold">12x faster</span> delivery with AI-powered workflow
                        </p>
                    </motion.div>
                </div>

                {/* Founder Message */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-br from-primary/10 to-accent-cyan/10 border border-primary/20 rounded-2xl p-8 max-w-3xl mx-auto"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                <span className="text-primary font-semibold">From the Founder</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                "I built EnvoKlear because I saw Indian SMBs getting charged 
                                <span className="text-white font-semibold"> 10x what they should pay</span>. 
                                With AI, I can deliver the same quality in 1/10th the time. 
                                That's not a discount—that's efficiency passed on to you."
                            </p>
                            <p className="text-primary font-semibold mt-4">— Founder, EnvoKlear</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
