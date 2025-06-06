'use client';
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { verifyToken } from "@/services/authService";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PrivateRouterProps {
    children: ReactNode;
}

const PrivateRouter = ({ children }: PrivateRouterProps) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken') || '';
                if (!token) {
                    router.push('/login');
                    return;
                }
                const response = await verifyToken();
                if (response.valid) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('accessToken');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                setIsAuthenticated(false);
                router.push('/login');
            }
        };

        verifyAuth();
    }, [router]);

    if (isAuthenticated === null) {
        return (
            <div className="flex h-screen items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (isAuthenticated === false) {
        return null;
    }

    return <>{children} </>;
};

export default PrivateRouter;