import React, { useEffect } from 'react';
import { Trophy, Star, X } from 'lucide-react';

interface AchievementNotificationProps {
    title: string;
    points: number;
    onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
    title,
    points,
    onClose
}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-20 right-10 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-6 rounded-3xl shadow-2xl animate-in slide-in-from-right duration-500 max-w-sm z-50">
            <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                    <Trophy className="text-yellow-300" size={28} fill="currentColor" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">¡Logro Desbloqueado!</h4>
                    <p className="text-teal-50 text-sm mb-2">{title}</p>
                    <div className="flex items-center gap-2">
                        <Star size={16} fill="currentColor" className="text-yellow-300" />
                        <span className="font-bold">+{points} XP</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};
