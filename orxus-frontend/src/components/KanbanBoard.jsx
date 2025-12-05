import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import apiClient from '../api';
import Droppable from './Droppable';
import { Calendar, GripVertical, CheckCircle2, Clock, Circle, MoreHorizontal } from 'lucide-react';

const DragHandle = (props) => (
    <div {...props} className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={16} />
    </div>
);

const getPriorityBadge = (priority) => {
    switch (priority) {
        case 'high':
            return <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">High</span>;
        case 'medium':
            return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">Medium</span>;
        case 'low':
            return <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">Low</span>;
        default:
            return <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">Normal</span>;
    }
};

const Task = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
    const navigate = useNavigate();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group bg-white p-4 mb-3 rounded-xl shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}
        >
            {/* Decorative side bar based on priority */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.priority === 'high' ? 'bg-rose-500' :
                    task.priority === 'medium' ? 'bg-amber-400' :
                        task.priority === 'low' ? 'bg-blue-400' : 'bg-slate-300'
                }`} />

            <div className="flex justify-between items-start pl-2">
                <div className="flex-1 cursor-pointer" onClick={() => navigate(`/tasks/${task.id}`)}>
                    <div className="flex justify-between items-start mb-2">
                        {getPriorityBadge(task.priority)}
                        <div {...attributes} {...listeners} className="ml-2">
                            <DragHandle />
                        </div>
                    </div>

                    <h4 className="font-bold text-slate-800 mb-2 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {task.title}
                    </h4>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                        <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                {task.assignees && task.assignees.length > 0 ? task.assignees[0].name.charAt(0) : 'U'}
                            </div>
                            <span className="text-xs font-medium text-slate-500 truncate max-w-[80px]">
                                {task.project.name}
                            </span>
                        </div>

                        <div className="flex items-center text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            <Calendar size={12} className="mr-1.5 text-slate-400" />
                            {task.due_date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KanbanBoard = ({ tasks, setTasks }) => {
    const columns = [
        {
            id: 'todo',
            title: 'To Do',
            icon: <Circle size={18} className="text-slate-500" />,
            headerColor: 'bg-slate-100 text-slate-700',
            badgeColor: 'bg-slate-200 text-slate-700'
        },
        {
            id: 'inprogress',
            title: 'In Progress',
            icon: <Clock size={18} className="text-blue-500" />,
            headerColor: 'bg-blue-50 text-blue-700',
            badgeColor: 'bg-blue-200 text-blue-800'
        },
        {
            id: 'done',
            title: 'Completed',
            icon: <CheckCircle2 size={18} className="text-emerald-500" />,
            headerColor: 'bg-emerald-50 text-emerald-700',
            badgeColor: 'bg-emerald-200 text-emerald-800'
        },
    ];

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const activeTask = tasks.find(task => task.id === active.id);

            if (columns.some(col => col.id === over.id)) {
                const overColumnId = over.id;
                if (activeTask.status !== overColumnId) {
                    apiClient.put(`/tasks/${active.id}`, { status: overColumnId })
                        .then(response => {
                            setTasks(prevTasks => prevTasks.map(task =>
                                task.id === active.id ? { ...task, status: overColumnId } : task
                            ));
                        })
                        .catch(error => {
                            console.error('Error updating task status', error);
                        });
                }
            } else {
                const overTask = tasks.find(task => task.id === over.id);
                if (overTask && activeTask.status === overTask.status) {
                    setTasks(items => {
                        const oldIndex = items.findIndex(item => item.id === active.id);
                        const newIndex = items.findIndex(item => item.id === over.id);
                        return arrayMove(items, oldIndex, newIndex);
                    });
                }
            }
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 snap-x">
                {columns.map(column => {
                    const columnTasks = Array.isArray(tasks) ? tasks.filter(task => task.status === column.id) : [];
                    return (
                        <Droppable key={column.id} id={column.id}>
                            <div className="flex-shrink-0 w-[340px] snap-center">
                                <div className={`flex items-center justify-between mb-4 p-3 rounded-xl ${column.headerColor} border border-transparent shadow-sm`}>
                                    <div className="flex items-center gap-2 font-bold">
                                        {column.icon}
                                        <span>{column.title}</span>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${column.badgeColor}`}>
                                        {columnTasks.length}
                                    </span>
                                </div>

                                <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-200/50 min-h-[500px]">
                                    <SortableContext items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                                        <div className="space-y-1">
                                            {columnTasks.map(task => (
                                                <Task key={task.id} task={task} />
                                            ))}
                                        </div>
                                    </SortableContext>
                                    {columnTasks.length === 0 && (
                                        <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg m-2">
                                            <span className="text-sm">No tasks</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Droppable>
                    );
                })}
            </div>
        </DndContext>
    );
};

export default KanbanBoard;