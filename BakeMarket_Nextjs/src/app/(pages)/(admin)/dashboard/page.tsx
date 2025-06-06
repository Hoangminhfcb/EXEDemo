'use client';
import { useState } from 'react';
import { Course } from '@/types/course';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import ListCourse from '@/components/ui/ListCourse';
import CreateCourse from '@/components/admin/CreateCourse';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        courseCover: '',
    });

    const [chapterForm, setChapterForm] = useState({ courseId: '', name: '', description: '' });
    const [lessonForm, setLessonForm] = useState({ chapterId: '', lessonName: '', lessonDescription: '', linkVideoLesson: '' });
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChapterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setChapterForm({ ...chapterForm, [name]: value });
    };

    const handleLessonInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLessonForm({ ...lessonForm, [name]: value });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="space-y-8 p-6">
                <DashboardTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                />
                {activeTab === 'courses' && !selectedCourse && <ListCourse />}
                {activeTab === 'create' && !selectedCourse && <CreateCourse />}
            </div>
        </div>
    );
};

export default Dashboard;