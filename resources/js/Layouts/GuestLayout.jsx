import Header from '@/Components/Layout/Header';
import Footer from '@/Components/Layout/Footer';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
