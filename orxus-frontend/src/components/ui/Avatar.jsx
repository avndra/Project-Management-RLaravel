import React from 'react';

const Avatar = ({ src, alt = "Avatar", className = "" }) => {
    return (
        <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="aspect-square h-full w-full" />
            ) : (
                <div className="bg-slate-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center">
                    <span className="text-slate-600 font-medium text-sm">?</span>
                </div>
            )}
        </div>
    );
};

export { Avatar };