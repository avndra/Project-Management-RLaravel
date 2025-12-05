import { Calendar, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  assignees: Array<{ name: string; avatar: string }>;
  deadline: string;
  status: 'completed' | 'in-progress' | 'not-started';
  priority: 'high' | 'medium' | 'low';
}

interface TaskCardProps {
  task: Task;
  showActions: boolean;
}

export function TaskCard({ task, showActions }: TaskCardProps) {
  const statusConfig = {
    completed: { label: 'Completed', color: 'bg-green-100 text-green-700 border-green-200' },
    'in-progress': { label: 'In Progress', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    'not-started': { label: 'Not Started', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  };

  const priorityConfig = {
    high: { color: 'border-l-red-500' },
    medium: { color: 'border-l-orange-500' },
    low: { color: 'border-l-green-500' },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = () => {
    if (task.status === 'completed') return false;
    return new Date(task.deadline) < new Date();
  };

  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all border-l-4',
        priorityConfig[task.priority].color
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-gray-900 mb-1">{task.title}</h4>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
        
        {showActions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
              <DropdownMenuItem>Mark as In Progress</DropdownMenuItem>
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {/* Assignees */}
          <div className="flex -space-x-2">
            {task.assignees.map((assignee, idx) => (
              <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                <AvatarImage src={assignee.avatar} />
                <AvatarFallback>{assignee.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Status Badge */}
          <Badge variant="outline" className={cn('text-xs', statusConfig[task.status].color)}>
            {statusConfig[task.status].label}
          </Badge>
        </div>

        {/* Deadline */}
        <div
          className={cn(
            'flex items-center gap-1.5 text-sm',
            isOverdue() ? 'text-red-600' : 'text-gray-500'
          )}
        >
          <Calendar className="w-4 h-4" />
          <span>{formatDate(task.deadline)}</span>
          {isOverdue() && <span className="text-xs">(Overdue)</span>}
        </div>
      </div>
    </div>
  );
}
