import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const montserrat = Montserrat({ subsets: ['latin'] });

interface TopNavigationProps {
    courseName: string;
    isCoursePanelOpen: boolean;
    onTogglePanel: () => void;
}

export const TopNavigation = ({ courseName, isCoursePanelOpen, onTogglePanel }: TopNavigationProps) => {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">
                    <Link href="/home">
                        <Image
                            src="/elearning.jpg"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </Link>
                    <h1 className={`${montserrat.className} text-lg font-semibold text-gray-900`}>
                        {courseName}
                    </h1>
                </div>
                <button
                    onClick={onTogglePanel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isCoursePanelOpen ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};