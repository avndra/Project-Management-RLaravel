import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Search,
  ChevronLeft,
} from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { cn } from '../lib/utils';

type View = 'dashboard' | 'tasks' | 'staff-dashboard';
type UserRole = 'admin' | 'staff';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  userRole: UserRole;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ currentView, onViewChange, userRole, collapsed, onToggleCollapse }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks' as View, label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const teamItems = [
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
              <span className="text-white">O</span>
            </div>
            <span className="text-gray-900">OrxusPM</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className={cn('w-5 h-5 text-gray-500 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-gray-50 border-gray-200 rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Main Menu */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {!collapsed && (
          <div className="px-3 mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Main</span>
          </div>
        )}
        
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-700 hover:bg-gray-50',
                  collapsed && 'justify-center'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Team Section */}
        <Separator className="my-4" />
        
        {!collapsed && (
          <div className="px-3 mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Team</span>
          </div>
        )}
        
        <div className="space-y-1">
          {teamItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50',
                  collapsed && 'justify-center'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Settings */}
        <Separator className="my-4" />
        
        <button
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50',
            collapsed && 'justify-center'
          )}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
            <AvatarFallback>{userRole === 'admin' ? 'AD' : 'ST'}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 truncate">{userRole === 'admin' ? 'Admin User' : 'Staff User'}</p>
              <p className="text-xs text-gray-500 truncate">
                {userRole === 'admin' ? 'admin@orxus.pm' : 'staff@orxus.pm'}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
