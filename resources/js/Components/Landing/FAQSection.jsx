import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle } from 'lucide-react';
import Accordion from './ui/Accordion';

export default function FAQSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const faqs = [
        {
            question: "You're just one person. What if you disappear?",
            answer: "Great question! Your website is 100% yours - all code, hosting access, and documentation is handed over to you. Even if I'm not available, any developer can maintain it. Plus, I'm building a long-term business and have backup team members for emergencies. Your investment is protected.",
        },
        {
            question: "Is AI-generated work really good enough?",
            answer: "AI doesn't replace creativity - it accelerates it. I use AI to handle repetitive tasks (like writing boilerplate code) while I focus on design, strategy, and customization. The result? Same quality as a ₹5L agency, but delivered 10x faster at 70% lower cost.",
        },
        {
            question: "₹50K sounds too cheap. What's the catch?",
            answer: "No catch! Traditional agencies have massive overhead: office rent, large teams, marketing budgets. I work remotely, use AI efficiently, and pass those savings to you. It's not cheap - it's smart. You're paying for results, not overhead.",
        },
        {
            question: "What if I need changes after launch?",
            answer: "Minor content updates are free for the first month. For larger changes, I offer affordable maintenance packages starting at ₹5,000/month. Or, since you own the code, you can hire any developer to make changes.",
        },
        {
            question: "Do you offer support after the website is live?",
            answer: "Absolutely! Every package includes post-launch support (1-6 months depending on plan). After that, optional support packages are available. Plus, you always have WhatsApp access to me for quick questions.",
        },
        {
            question: "Can I see the website before I pay the full amount?",
            answer: "Yes! I work on a milestone basis. You pay 50% upfront, see the design, approve it, then I build. You pay the remaining 50% only when you're 100% satisfied. Zero risk for you.",
        },
        {
            question: "What technologies do you use?",
            answer: "I use modern, battle-tested technologies: React/Next.js for frontend, Node.js/Laravel for backend, and reliable hosting on AWS/Vercel. Your website will be fast, secure, and scalable.",
        },
        {
            question: "How do you handle payments and invoicing?",
            answer: "All payments are handled through secure payment links (Razorpay). You receive proper GST invoices for all transactions. EMI options available through credit cards and Bajaj Finserv.",
        },
    ];

    return (
        <section className="relative py-24 bg-dark overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        Got questions? We've got answers.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Accordion items={faqs} />
                </motion.div>

                {/* More Questions CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 mb-4">Still have questions?</p>
                    <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Ask on WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
