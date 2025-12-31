import LandingHeader from '@/Components/Landing/LandingHeader';
import Footer from '@/Components/Layout/Footer';
import FloatingElements from '@/Components/Landing/FloatingElements';

export default function LandingLayout({ children }) {
    return (
        <>
            <LandingHeader />
            <div className="bg-dark min-h-screen dark-scrollbar">
                <main className="pt-24">
                    {children}
                </main>
                <Footer />
            </div>
            <FloatingElements />
        </>
    );
}
