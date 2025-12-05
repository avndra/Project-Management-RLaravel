import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { StaffDashboard } from './components/StaffDashboard';
import { TaskList } from './components/TaskList';
import { ProfilePopup } from './components/ProfilePopup';

type View = 'dashboard' | 'tasks' | 'staff-dashboard';
type UserRole = 'admin' | 'staff';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    if (userRole === 'staff') {
      return <StaffDashboard />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        userRole={userRole}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          onProfileClick={() => setIsProfileOpen(true)}
          onRoleSwitch={() => setUserRole(userRole === 'admin' ? 'staff' : 'admin')}
          userRole={userRole}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userRole={userRole}
      />
    </div>
  );
}
