import { useState } from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import Sidebar from './components/Layout/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Courses from './components/Courses/Courses';
import Quests from './components/Quests/Quests';
import Materials from './components/Materials/Materials';
import Schedule from './components/Schedule/Schedule';
import Attendance from './components/Attendance/Attendance';
import Announcements from './components/Announcements/Announcements';
import Requests from './components/Requests/Requests';
import Library from './components/Library/Library';
import type { NavigationPage } from './types';

function PortalContent() {
  const { currentStudent } = useStudent();
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!currentStudent) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'quests':
        return <Quests />;
      case 'materials':
        return <Materials />;
      case 'schedule':
        return <Schedule />;
      case 'attendance':
        return <Attendance />;
      case 'announcements':
        return <Announcements />;
      case 'requests':
        return <Requests />;
      case 'library':
        return <Library />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => {
          setSidebarCollapsed(!sidebarCollapsed);
          setMobileOpen(!mobileOpen);
        }}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <main
        className={`transition-all duration-300 ease-in-out min-h-screen ${
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[280px]'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-[1400px] mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <PortalContent />
    </StudentProvider>
  );
}


