import { useForm, usePage } from '@inertiajs/react';
import { Mail, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterForm() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        email: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('newsletter.store'), {
            onSuccess: () => {
                reset();
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            <input
                type="email"
                placeholder="Your email address"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                disabled={processing || showSuccess}
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-envoklear-green focus:border-envoklear-green disabled:opacity-50"
                required
            />
            <button
                type="submit"
                disabled={processing || showSuccess}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${showSuccess
                        ? 'bg-green-500 text-white scale-105 shadow-lg'
                        : 'bg-envoklear-green text-white hover:bg-opacity-90'
                    } disabled:opacity-50`}
            >
                {showSuccess ? (
                    <>
                        <ThumbsUp size={20} className="animate-bounce" />
                        <span className="animate-pulse">SUBSCRIBED!</span>
                    </>
                ) : (
                    <>
                        <Mail size={20} />
                        <span>{processing ? 'Subscribing...' : 'Subscribe'}</span>
                    </>
                )}
            </button>
            {errors.email && <div className="text-red-400 text-xs">{errors.email}</div>}
            {flash?.success && !showSuccess && <div className="text-green-400 text-sm">{flash.success}</div>}
        </form>
    );
}
