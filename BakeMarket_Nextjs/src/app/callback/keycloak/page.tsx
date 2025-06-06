'use client';

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function CallbackKeycloakContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (code) {
            handleSendCode(code);
        } else {
            setError('No code found in URL');
            setIsLoading(false);
            console.error('No code found in URL');
        }
    }, [code, router]);

    const handleSendCode = async (code: string) => {
        try {
            const formData = new FormData();
            formData.append('code', code);

            const response = await fetch('http://localhost:8080/auth/sign-in-keycloak', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (data.result && data.result.accessToken) {
                localStorage.setItem('access_token', data.result.accessToken);
                localStorage.setItem('refresh_token', data.result.refreshToken);
                router.push('/');
            } else {
                setError('Failed to process authentication');
                console.error('Failed to process code:', data);
            }
        } catch (error) {
            setError('Error during authentication process');
            console.error('Error sending code:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Callback Keycloak</h1>
            {error ? (
                <div className="text-red-600 mb-4">{error}</div>
            ) : (
                <p className="text-gray-600">Redirecting to application...</p>
            )}
        </div>
    );
}

// Component chính bao bọc bởi Suspense
export default function CallbackKeycloak() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <CallbackKeycloakContent />
        </Suspense>
    );
}