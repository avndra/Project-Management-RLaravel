import React from 'react';

export const StatsCard = ({ title, value, icon: Icon, progress, change, changeType }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                </div>
            </div>
            
            {(progress !== undefined || change) && (
                <div className="mt-4">
                    {progress !== undefined && (
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                    {change && (
                        <p className={`text-xs font-medium ${
                            changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                            {change}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};