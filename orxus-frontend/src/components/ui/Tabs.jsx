import React, { useState } from 'react';

const Tabs = ({ children, defaultValue, className = "" }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    
    const trigger = React.Children.toArray(children).find(child => child.type === TabsList);
    const content = React.Children.toArray(children).find(child => child.type === TabsContent && child.props.value === activeTab);

    return (
        <div className={className}>
            {React.cloneElement(trigger, { activeTab, setActiveTab })}
            {content}
        </div>
    );
};

const TabsList = ({ children, activeTab, setActiveTab, className = "" }) => {
    return (
        <div className={`flex border-b ${className}`}>
            {React.Children.map(children, (child) => 
                React.cloneElement(child, { 
                    isActive: activeTab === child.props.value,
                    onClick: () => setActiveTab(child.props.value)
                })
            )}
        </div>
    );
};

const TabsTrigger = ({ children, value, isActive, onClick, className = "" }) => {
    return (
        <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                isActive 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
            } ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const TabsContent = ({ children, value, className = "" }) => {
    return <div className={className}>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };