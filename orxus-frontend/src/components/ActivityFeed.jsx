import React from 'react';
import { CheckCircle2, MessageSquare, UserPlus, FileText } from 'lucide-react';
import { Avatar } from './ui/Avatar';

const ActivityFeed = () => {
    const activities = [
        {
            id: '1',
            type: 'task',
            user: 'John Miller',
            action: 'completed task',
            item: 'Dashboard UI Design',
            time: '2 min ago',
            icon: CheckCircle2,
            iconColor: 'text-green-500'
        },
        {
            id: '2',
            type: 'comment',
            user: 'Sarah Chen',
            action: 'commented on',
            item: 'Project Requirements',
            time: '15 min ago',
            icon: MessageSquare,
            iconColor: 'text-blue-500'
        },
        {
            id: '3',
            type: 'member',
            user: 'Admin',
            action: 'added new member',
            item: 'Michael Rodriguez',
            time: '1 hour ago',
            icon: UserPlus,
            iconColor: 'text-purple-500'
        },
        {
            id: '4',
            type: 'task',
            user: 'David Kim',
            action: 'created task',
            item: 'API Integration',
            time: '3 hours ago',
            icon: FileText,
            iconColor: 'text-yellow-500'
        },
        {
            id: '5',
            type: 'task',
            user: 'Emily Johnson',
            action: 'updated task',
            item: 'Homepage Design',
            time: '5 hours ago',
            icon: CheckCircle2,
            iconColor: 'text-green-500'
        }
    ];

    const getIcon = (activity) => {
        const IconComponent = activity.icon;
        return <IconComponent className={`w-4 h-4 ${activity.iconColor}`} />;
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map(activity => (
                    <div key={activity.id} className="flex items-start">
                        <div className="p-2 bg-slate-100 rounded-lg mr-3">
                            {getIcon(activity)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-800">
                                <span className="font-medium">{activity.user}</span> {activity.action} <span className="text-primary-600">{activity.item}</span>
                            </p>
                            <p className="text-slate-500 text-sm mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-center text-primary-600 hover:bg-slate-50 rounded-lg text-sm font-medium border border-slate-200">
                View All Activity
            </button>
        </div>
    );
};

export { ActivityFeed };