import { Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export function CalendarWidget() {
  const upcomingEvents = [
    {
      id: '1',
      title: 'Design Review Meeting',
      time: '10:00 AM',
      date: 'Nov 11',
      participants: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      ],
    },
    {
      id: '2',
      title: 'Sprint Planning',
      time: '2:00 PM',
      date: 'Nov 12',
      participants: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      ],
    },
    {
      id: '3',
      title: 'Client Presentation',
      time: '11:00 AM',
      date: 'Nov 13',
      participants: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=chris',
      ],
    },
  ];

  const deadlines = [
    { task: 'Website Redesign', date: 'Nov 10', priority: 'high' as const },
    { task: 'API Documentation', date: 'Nov 15', priority: 'medium' as const },
    { task: 'User Testing', date: 'Nov 18', priority: 'low' as const },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Upcoming</h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        {/* Meetings */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Meetings</p>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-gray-900">{event.title}</p>
                  <Badge variant="outline" className="text-xs">
                    {event.date}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {event.participants.map((avatar, idx) => (
                      <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deadlines */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Deadlines</p>
          <div className="space-y-2">
            {deadlines.map((deadline, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      deadline.priority === 'high'
                        ? 'bg-red-500'
                        : deadline.priority === 'medium'
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                  ></div>
                  <span className="text-sm text-gray-700">{deadline.task}</span>
                </div>
                <span className="text-xs text-gray-500">{deadline.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
