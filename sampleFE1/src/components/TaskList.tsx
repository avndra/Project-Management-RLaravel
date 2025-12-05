import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Plus } from 'lucide-react';

export function TaskList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const allTasks = [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups for the new landing page',
      assignees: [
        { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
        { name: 'John Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
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
        { name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
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
        { name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike' },
      ],
      deadline: '2024-11-10',
      status: 'not-started' as const,
      priority: 'high' as const,
    },
    {
      id: '4',
      title: 'Implement dark mode',
      description: 'Add dark mode support across the application',
      assignees: [
        { name: 'Lisa Anderson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa' },
        { name: 'Tom Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom' },
      ],
      deadline: '2024-11-20',
      status: 'completed' as const,
      priority: 'low' as const,
    },
    {
      id: '5',
      title: 'Database optimization',
      description: 'Improve query performance and add indexes',
      assignees: [
        { name: 'John Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
      ],
      deadline: '2024-11-18',
      status: 'completed' as const,
      priority: 'high' as const,
    },
    {
      id: '6',
      title: 'API integration testing',
      description: 'Write integration tests for new API endpoints',
      assignees: [
        { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      ],
      deadline: '2024-11-14',
      status: 'in-progress' as const,
      priority: 'medium' as const,
    },
    {
      id: '7',
      title: 'Create marketing assets',
      description: 'Design social media graphics and banners',
      assignees: [
        { name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      ],
      deadline: '2024-11-22',
      status: 'not-started' as const,
      priority: 'low' as const,
    },
    {
      id: '8',
      title: 'Security audit',
      description: 'Perform comprehensive security review',
      assignees: [
        { name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike' },
        { name: 'Lisa Anderson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa' },
      ],
      deadline: '2024-11-16',
      status: 'in-progress' as const,
      priority: 'high' as const,
    },
  ];

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-gray-900 mb-1">All Tasks</h1>
            <p className="text-sm text-gray-500">
              Manage and track all project tasks
            </p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
            <Plus className="w-4 h-4" />
            Create Task
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200 rounded-lg"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48 bg-gray-50 border-gray-200 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-gray-900">{allTasks.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-50">
            <p className="text-sm text-green-600 mb-1">Completed</p>
            <p className="text-green-700">{allTasks.filter((t) => t.status === 'completed').length}</p>
          </div>
          <div className="p-4 rounded-xl bg-orange-50">
            <p className="text-sm text-orange-600 mb-1">In Progress</p>
            <p className="text-orange-700">{allTasks.filter((t) => t.status === 'in-progress').length}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Not Started</p>
            <p className="text-gray-700">{allTasks.filter((t) => t.status === 'not-started').length}</p>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} showActions={false} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
