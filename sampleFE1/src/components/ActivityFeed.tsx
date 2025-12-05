import { CheckCircle2, MessageSquare, UserPlus, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function ActivityFeed() {
  const activities = [
    {
      id: '1',
      type: 'task' as const,
      user: 'John Miller',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      action: 'marked Task #12 as',
      highlight: 'Completed',
      time: '5 min ago',
    },
    {
      id: '2',
      type: 'comment' as const,
      user: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      action: 'commented on',
      highlight: 'Design Review',
      time: '12 min ago',
    },
    {
      id: '3',
      type: 'member' as const,
      user: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      action: 'added',
      highlight: 'Mike Johnson',
      time: '1 hour ago',
    },
    {
      id: '4',
      type: 'file' as const,
      user: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      action: 'uploaded',
      highlight: 'requirements.pdf',
      time: '2 hours ago',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'member':
        return <UserPlus className="w-4 h-4 text-purple-600" />;
      case 'file':
        return <FileText className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback>{activity.user[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                {getIcon(activity.type)}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">
                <span>{activity.user}</span>{' '}
                <span className="text-gray-500">{activity.action}</span>{' '}
                <span className="text-teal-600">{activity.highlight}</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
