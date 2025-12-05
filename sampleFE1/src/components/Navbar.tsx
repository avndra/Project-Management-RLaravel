import { Bell, Plus, User } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface NavbarProps {
  onProfileClick: () => void;
  onRoleSwitch: () => void;
  userRole: 'admin' | 'staff';
}

export function Navbar({ onProfileClick, onRoleSwitch, userRole }: NavbarProps) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 6);
  
  const dateRange = `${startDate.getDate()}–${currentDate.getDate()} ${currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-gray-900">{userRole === 'admin' ? 'Dashboard' : 'My Tasks'}</h1>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-600">{dateRange}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Demo: Role Switcher */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRoleSwitch}
          className="hidden md:flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Switch to {userRole === 'admin' ? 'Staff' : 'Admin'}
        </Button>

        {userRole === 'admin' && (
          <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>
        )}

        <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
            3
          </Badge>
        </button>

        <button onClick={onProfileClick} className="hover:opacity-80 transition-opacity">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
            <AvatarFallback>{userRole === 'admin' ? 'AD' : 'ST'}</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </nav>
  );
}
