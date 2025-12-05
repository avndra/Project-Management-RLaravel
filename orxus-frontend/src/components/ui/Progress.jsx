import React from 'react';

const Progress = ({ value = 0, className = "", ...props }) => {
    return (
        <div className={`relative h-4 w-full overflow-hidden rounded-full bg-slate-200 ${className}`} {...props}>
            <div 
                className="h-full w-full flex-1 bg-primary-600 transition-all duration-300 rounded-full"
                style={{ transform: `translateX(-${100 - value}%)` }}
            />
        </div>
    );
};

export { Progress };