'use client';
import { API_URL } from '@/utils/BaseUrl';
import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'initial',
            content: 'Chào bạn! Tôi là CourseBot, sẵn sàng giúp bạn tìm khóa học hoặc giải đáp thắc mắc. Bạn muốn tìm hiểu gì hôm nay?',
            isUser: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            closeEventSource();
        } else {
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        return () => {
            closeEventSource();
        };
    }, []);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const closeEventSource = () => {
        if (eventSourceRef.current && eventSourceRef.current.readyState !== 2) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setIsTyping(false);
        }
    };

    const sendQuestion = () => {
        if (!input.trim() || isTyping) return;

        const question = input.trim();
        const userMessage = {
            id: Date.now().toString(),
            content: question,
            isUser: true,
            time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);
        scrollToBottom();

        const botMessage = {
            id: (Date.now() + 1).toString() + '-bot',
            content: '',
            isUser: false,
            time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, botMessage]);

        closeEventSource();

        const url = `${API_URL}/chat/chatbot/ask?question=${encodeURIComponent(question)}`;
        console.log(`Connecting to: ${url}`);

        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
            const chunk = event.data;
            if (chunk) {
                const formattedChunk = chunk
                    .replace(/([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯ])([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯ])/g, '$1 $2')
                    .replace(/([^\s])([0-9])/g, '$1 $2')
                    .replace(/([0-9])([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯ])/g, '$1 $2')
                    .replace(/([^\s])([**])/g, '$1 $2')
                    .replace(/([**])([^\s])/g, '$1 $2');
                setMessages((prev) => {
                    const updatedMessages = prev.map((msg) =>
                        msg.id === botMessage.id ? { ...msg, content: msg.content + (msg.content ? ' ' : '') + formattedChunk } : msg
                    );
                    return updatedMessages;
                });
            }
        };

        eventSource.onopen = () => {
            console.log('SSE connection established');
        };

        eventSource.onerror = () => {
            const lastBotMessage = messages.find((msg) => msg.id === botMessage.id);
            if (lastBotMessage && !lastBotMessage.content) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === botMessage.id ? { ...msg, content: 'Xin lỗi, tôi không thể kết nối với máy chủ. Vui lòng thử lại sau.' } : msg
                    )
                );
            }
            setIsTyping(false);
            closeEventSource();
        };

        setTimeout(() => {
            if (eventSource.readyState === 1 && !messages.find((msg) => msg.id === botMessage.id)?.content) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === botMessage.id
                            ? { ...msg, content: 'Hết thời gian chờ phản hồi từ máy chủ. Vui lòng thử lại.' }
                            : msg
                    )
                );
                setIsTyping(false);
                closeEventSource();
            }
        }, 30000);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        sendQuestion();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={toggleChatbot}
                className="bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-110 focus:outline-none cursor-pointer"
                aria-label="Open Chatbot"
            >
                <FaRobot className="w-6 h-6" />
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-slide-up">
                    <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">CourseBot</h3>
                        <button
                            onClick={toggleChatbot}
                            className="text-white hover:text-slate-300 focus:outline-none"
                            aria-label="Close Chatbot"
                        >
                            <FaTimes className="w-5 h-5 cursor-pointer" />
                        </button>
                    </div>

                    <div ref={chatContainerRef} className="h-80 p-4 overflow-y-auto bg-slate-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        <div className="flex flex-col space-y-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-3 rounded-lg max-w-[80%] ${message.isUser ? 'bg-slate-800 text-white self-end' : 'bg-slate-200 text-slate-800 self-start'}`}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words">
                                        {message.content} <span className="text-xs text-gray-500 ml-2">{message.time}</span>
                                    </p>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center space-x-2 bg-slate-200 p-3 rounded-lg self-start max-w-[80%]">
                                    <div className="flex space-x-1">
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                    </div>
                                    <p className="text-sm text-slate-600">Đang trả lời...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-white border-t border-slate-200">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Nhập câu hỏi của bạn..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 p-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-700"
                                    disabled={isTyping}
                                />
                                <button
                                    type="submit"
                                    className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors duration-200 disabled:bg-slate-500 cursor-pointer"
                                    disabled={isTyping}
                                >
                                    Gửi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;