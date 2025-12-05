import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

export function TeamTable() {
  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@orxus.pm',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      completion: 92,
      tasksCompleted: 23,
      totalTasks: 25,
      lastActive: '2 min ago',
      status: 'online' as const,
    },
    {
      id: '2',
      name: 'John Miller',
      email: 'john.miller@orxus.pm',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      completion: 88,
      tasksCompleted: 22,
      totalTasks: 25,
      lastActive: '15 min ago',
      status: 'online' as const,
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.wilson@orxus.pm',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      completion: 85,
      tasksCompleted: 17,
      totalTasks: 20,
      lastActive: '1 hour ago',
      status: 'away' as const,
    },
    {
      id: '4',
      name: 'Mike Johnson',
      email: 'mike.johnson@orxus.pm',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      completion: 76,
      tasksCompleted: 19,
      totalTasks: 25,
      lastActive: '3 hours ago',
      status: 'offline' as const,
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@orxus.pm',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
      completion: 72,
      tasksCompleted: 13,
      totalTasks: 18,
      lastActive: '5 hours ago',
      status: 'offline' as const,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Top Performers</h2>
          <p className="text-sm text-gray-500">Team members by task completion rate</p>
        </div>
        <Badge variant="secondary">This Month</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3">
                Member
              </th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3">
                Tasks
              </th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3">
                Completion
              </th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3">
                Status
              </th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3">
                Last Active
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-sm text-gray-900">
                    {member.tasksCompleted}/{member.totalTasks}
                  </p>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Progress value={member.completion} className="w-24 h-2" />
                    <span className="text-sm text-gray-900">{member.completion}%</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        member.status === 'online'
                          ? 'bg-green-500'
                          : member.status === 'away'
                          ? 'bg-orange-500'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                    <span className="text-sm text-gray-600 capitalize">{member.status}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-500">{member.lastActive}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
