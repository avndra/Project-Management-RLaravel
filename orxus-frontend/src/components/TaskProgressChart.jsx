import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { date: 'Mon', completed: 10, inProgress: 8, notStarted: 5 },
    { date: 'Tue', completed: 15, inProgress: 12, notStarted: 7 },
    { date: 'Wed', completed: 22, inProgress: 10, notStarted: 6 },
    { date: 'Thu', completed: 28, inProgress: 14, notStarted: 8 },
    { date: 'Fri', completed: 35, inProgress: 11, notStarted: 5 },
    { date: 'Sat', completed: 42, inProgress: 9, notStarted: 4 },
    { date: 'Sun', completed: 48, inProgress: 8, notStarted: 3 },
];

const TaskProgressChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Task Progress</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem'
                            }} 
                        />
                        <Area 
                            type="monotone" 
                            dataKey="completed" 
                            stackId="1" 
                            stroke="#10b981" 
                            fill="#10b981" 
                            name="Completed"
                        />
                        <Area 
                            type="monotone" 
                            dataKey="inProgress" 
                            stackId="1" 
                            stroke="#f59e0b" 
                            fill="#f59e0b" 
                            name="In Progress"
                        />
                        <Area 
                            type="monotone" 
                            dataKey="notStarted" 
                            stackId="1" 
                            stroke="#ef4444" 
                            fill="#ef4444" 
                            name="Not Started"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export { TaskProgressChart };