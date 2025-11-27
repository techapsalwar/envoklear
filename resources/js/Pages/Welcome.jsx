import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

// Landing Page Sections
import LandingHeader from '@/Components/Landing/LandingHeader';
import HeroSection from '@/Components/Landing/HeroSection';
import ProblemSection from '@/Components/Landing/ProblemSection';
import SolutionSection from '@/Components/Landing/SolutionSection';
import PortfolioSection from '@/Components/Landing/PortfolioSection';
import ComparisonSection from '@/Components/Landing/ComparisonSection';
import TransparencySection from '@/Components/Landing/TransparencySection';
import TestimonialsSection from '@/Components/Landing/TestimonialsSection';
import ProcessSection from '@/Components/Landing/ProcessSection';
import PricingSection from '@/Components/Landing/PricingSection';
import FAQSection from '@/Components/Landing/FAQSection';
import FinalCTASection from '@/Components/Landing/FinalCTASection';
import FloatingElements from '@/Components/Landing/FloatingElements';

export default function Welcome({ portfolios = [] }) {
    return (
        <>
            <Head title="AI Powered Web Development Agency | EnvoKlear" />
            
            {/* Landing Page Header */}
            <LandingHeader />
            
            {/* Dark theme wrapper for landing page */}
            <div className="bg-dark min-h-screen dark-scrollbar">
                {/* Hero Section - Animated gradient, typewriter, stats, 3D mockups */}
                <HeroSection />
                
                {/* Problem Section - Cost calculator, pain point flip cards */}
                <ProblemSection />
                
                {/* Solution Section - Before/After slider, benefit pillars */}
                <SolutionSection />
                
                {/* Portfolio Section - 3D carousel, device switcher */}
                <PortfolioSection portfolios={portfolios} />
                
                {/* Comparison Section - Animated table, savings counter */}
                <ComparisonSection />
                
                {/* Transparency Section - Pie charts, timeline race */}
                <TransparencySection />
                
                {/* Testimonials Section - Reviews, client logos */}
                <TestimonialsSection />
                
                {/* Process Section - 4 steps timeline */}
                <ProcessSection />
                
                {/* Pricing Section - 3D pricing cards, EMI calculator */}
                <PricingSection />
                
                {/* FAQ Section - Animated accordion */}
                <FAQSection />
                
                {/* Final CTA Section - Urgency counter, confetti */}
                <FinalCTASection />
            </div>
            
            {/* Floating Elements - WhatsApp button, scroll to top */}
            <FloatingElements />
        </>
    );
}
