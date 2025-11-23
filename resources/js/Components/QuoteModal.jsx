import Modal from '@/Components/UI/Modal';
import QuoteForm from '@/Components/QuoteForm';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function QuoteModal({ show, onClose }) {
    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            onClose();
        }, 3000);
    };

    return (
        <Modal show={show} onClose={onClose} title="Get a Quote" maxWidth="max-w-3xl">
            {showSuccess ? (
                <div className="text-center py-8">
                    <div className="mb-4">
                        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                        We've received your quote request and will get back to you within 24 hours.
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 mb-6">
                        Fill out the form below and our team will get back to you with a customized quote for your project.
                    </p>
                    <QuoteForm onSuccess={handleSuccess} />
                </>
            )}
        </Modal>
    );
}
