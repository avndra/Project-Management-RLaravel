import React from 'react';

const Badge = ({ children, variant = "default", className = "" }) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    
    const variantClasses = {
        default: "bg-primary-100 text-primary-800 border border-primary-200",
        secondary: "bg-slate-100 text-slate-800 border border-slate-200",
        destructive: "bg-red-100 text-red-800 border border-red-200",
        outline: "text-foreground"
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export { Badge };