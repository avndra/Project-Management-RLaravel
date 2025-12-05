import { StatsCard } from './StatsCard';
import { TaskCard } from './TaskCard';
import { CalendarWidget } from './CalendarWidget';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function StaffDashboard() {
  const stats = [
    {
      title: 'My Tasks',
      value: '24',
      icon: Clock,
      progress: 58,
      change: '14 completed',
      color: 'blue' as const,
    },
    {
      title: 'Completed',
      value: '14',
      icon: CheckCircle2,
      progress: 58,
      change: '+3 this week',
      color: 'green' as const,
    },
    {
      title: 'In Progress',
      value: '10',
      icon: AlertCircle,
      progress: 42,
      change: '2 due today',
      color: 'orange' as const,
    },
  ];

  const myTasks = [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups for the new landing page',
      assignees: [
        { name: 'Me', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=staff' },
      ],
      deadline: '2024-11-12',
      status: 'in-progress' as const,
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Update user documentation',
      description: 'Add new features to the user guide',
      assignees: [
        { name: 'Me', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=staff' },
      ],
      deadline: '2024-11-15',
      status: 'in-progress' as const,
      priority: 'medium' as const,
    },
    {
      id: '3',
      title: 'Fix navigation bug',
      description: 'Resolve the mobile navigation menu issue',
      assignees: [
        { name: 'Me', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=staff' },
      ],
      deadline: '2024-11-10',
      status: 'not-started' as const,
      priority: 'high' as const,
    },
    {
      id: '4',
      title: 'Code review for PR #234',
      description: 'Review the authentication module changes',
      assignees: [
        { name: 'Me', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=staff' },
      ],
      deadline: '2024-11-11',
      status: 'not-started' as const,
      priority: 'medium' as const,
    },
    {
      id: '5',
      title: 'Implement dark mode',
      description: 'Add dark mode support across the application',
      assignees: [
        { name: 'Me', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=staff' },
      ],
      deadline: '2024-11-20',
      status: 'completed' as const,
      priority: 'low' as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">My Tasks</h2>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-0">
                {myTasks.map((task) => (
                  <TaskCard key={task.id} task={task} showActions={true} />
                ))}
              </TabsContent>

              <TabsContent value="in-progress" className="space-y-4 mt-0">
                {myTasks
                  .filter((task) => task.status === 'in-progress')
                  .map((task) => (
                    <TaskCard key={task.id} task={task} showActions={true} />
                  ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-0">
                {myTasks
                  .filter((task) => task.status === 'completed')
                  .map((task) => (
                    <TaskCard key={task.id} task={task} showActions={true} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <CalendarWidget />
          
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">This Week</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                <span className="text-teal-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hours Logged</span>
                <span className="text-teal-600">32h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Meetings</span>
                <span className="text-teal-600">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
