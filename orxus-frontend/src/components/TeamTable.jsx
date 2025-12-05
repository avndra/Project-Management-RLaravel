import React from 'react';
import { Avatar } from './ui/Avatar';
import { Progress } from './ui/Progress';
import { Badge } from './ui/Badge';

const TeamTable = () => {
    const teamMembers = [
        {
            id: '1',
            name: 'Sarah Chen',
            email: 'sarah.chen@orxus.pm',
            role: 'Project Manager',
            status: 'Active',
            tasksCompleted: 24,
            tasksTotal: 30,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
        },
        {
            id: '2',
            name: 'Michael Rodriguez',
            email: 'michael.r@orxus.pm',
            role: 'Frontend Developer',
            status: 'Active',
            tasksCompleted: 18,
            tasksTotal: 25,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael'
        },
        {
            id: '3',
            name: 'Emily Johnson',
            email: 'emily.j@orxus.pm',
            role: 'UI/UX Designer',
            status: 'On Leave',
            tasksCompleted: 15,
            tasksTotal: 20,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
        },
        {
            id: '4',
            name: 'David Kim',
            email: 'david.k@orxus.pm',
            role: 'Backend Developer',
            status: 'Active',
            tasksCompleted: 22,
            tasksTotal: 28,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
        },
        {
            id: '5',
            name: 'Priya Patel',
            email: 'priya.p@orxus.pm',
            role: 'QA Engineer',
            status: 'Active',
            tasksCompleted: 30,
            tasksTotal: 32,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Team Members</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-3 text-slate-600 font-medium">Member</th>
                            <th className="text-left py-3 text-slate-600 font-medium">Role</th>
                            <th className="text-left py-3 text-slate-600 font-medium">Status</th>
                            <th className="text-left py-3 text-slate-600 font-medium">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map(member => (
                            <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                                            <span className="text-slate-600 text-sm font-medium">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">{member.name}</p>
                                            <p className="text-sm text-slate-500">{member.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-slate-600">{member.role}</td>
                                <td className="py-4">
                                    <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                                        {member.status}
                                    </Badge>
                                </td>
                                <td className="py-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-600">{member.tasksCompleted}/{member.tasksTotal}</span>
                                            <span className="text-slate-600">
                                                {Math.round((member.tasksCompleted / member.tasksTotal) * 100)}%
                                            </span>
                                        </div>
                                        <Progress 
                                            value={Math.round((member.tasksCompleted / member.tasksTotal) * 100)} 
                                            className="h-2" 
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { TeamTable };