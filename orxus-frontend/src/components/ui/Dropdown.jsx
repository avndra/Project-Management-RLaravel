import React, { useState, useRef, useEffect } from 'react';

const DropdownMenu = ({ children, className = "" }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={className} ref={dropdownRef}>
            {React.Children.map(children, (child) =>
                child.type === DropdownMenuTrigger
                    ? React.cloneElement(child, { setOpen, open })
                    : child.type === DropdownMenuContent
                    ? React.cloneElement(child, { open })
                    : child
            )}
        </div>
    );
};

const DropdownMenuTrigger = ({ children, setOpen, open }) => {
    return React.cloneElement(children, {
        onClick: () => setOpen(!open),
    });
};

const DropdownMenuContent = ({ children, open, className = "" }) => {
    if (!open) return null;

    return (
        <div 
            className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${className}`}
        >
            <div className="py-1">{children}</div>
        </div>
    );
};

const DropdownMenuItem = ({ children, className = "", onClick }) => {
    return (
        <div 
            className={`block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };