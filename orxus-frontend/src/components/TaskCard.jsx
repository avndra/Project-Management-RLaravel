import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MoreVertical } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from './ui/Dropdown';

const TaskCard = ({ task }) => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'done': return 'bg-green-100 text-green-800';
            case 'inprogress': return 'bg-blue-100 text-blue-800';
            case 'todo': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const handleCardClick = (e) => {
        // Prevent navigation if clicking the dropdown trigger
        if (e.target.closest('[data-radix-collection-item]') || e.target.closest('button')) {
            return;
        }
        navigate(`/tasks/${task.id}`);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-slate-800">{task.title}</h3>
                        <Badge className={getStatusColor(task.status)}>
                            {task.status === 'todo' ? 'Akan Dikerjakan' : 
                             task.status === 'inprogress' ? 'Sedang Dikerjakan' : 
                             task.status === 'done' ? 'Selesai' : task.status}
                        </Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                            </Badge>
                            <div className="flex items-center text-slate-500 text-sm">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{task.due_date}</span>
                            </div>
                        </div>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                                <DropdownMenuItem onClick={() => navigate(`/tasks/${task.id}`)}>Lihat Detail</DropdownMenuItem>
                                {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TaskCard };