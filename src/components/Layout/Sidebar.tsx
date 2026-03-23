import {
  LayoutDashboard,
  BookOpen,
  Swords,
  FolderOpen,
  Calendar,
  ClipboardCheck,
  Megaphone,
  FileText,
  Library,
  LogOut,
  ChevronLeft,
  GraduationCap,
  Menu,
} from 'lucide-react';
import type { NavigationPage } from '../../types';
import { useStudent } from '../../context/StudentContext';

const navItems: { id: NavigationPage; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'quests', label: 'Quests', icon: Swords },
  { id: 'materials', label: 'Materials', icon: FolderOpen },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'requests', label: 'Requests', icon: FileText },
  { id: 'library', label: 'Library', icon: Library },
];

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const { currentStudent, logout } = useStudent();

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => (mobileOpen ? onCloseMobile() : onToggleCollapse())}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl bg-white border border-border shadow-lg flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-border-light z-50 flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-[280px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-[72px] border-b border-border-light flex-shrink-0 ${collapsed ? 'justify-center px-3' : 'px-6'}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div className="ml-3 min-w-0">
              <h1 className="text-base font-bold text-text-primary leading-tight">AUY Portal</h1>
              <p className="text-[11px] text-text-muted font-medium">Student Dashboard</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className={`${collapsed ? '' : 'px-1'} mb-2`}>
            {!collapsed && (
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 px-3">
                Menu
              </p>
            )}
          </div>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 group relative
                      ${collapsed ? 'justify-center px-3 py-2.5' : 'px-3 py-2.5'}
                      ${
                        isActive
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                      }
                    `}
                  >
                    <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-primary'}`} />
                    {!collapsed && (
                      <span className="text-[13px] font-medium truncate">{item.label}</span>
                    )}
                    {item.id === 'library' && !collapsed && (
                      <span className="ml-auto px-1.5 py-0.5 rounded-md bg-accent/15 text-accent text-[10px] font-bold uppercase">
                        New
                      </span>
                    )}
                    {/* Tooltip for collapsed */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-text-primary text-white text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] pointer-events-none shadow-xl">
                        {item.label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-text-primary" />
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle (Desktop) */}
        <div className="hidden lg:flex justify-center py-2 border-t border-border-light">
          <button
            onClick={onToggleCollapse}
            className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center text-text-muted hover:text-text-primary transition-all"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* User Section */}
        {currentStudent && (
          <div className={`border-t border-border-light p-3 flex-shrink-0 ${collapsed ? 'flex flex-col items-center gap-2' : ''}`}>
            <div className={`flex items-center ${collapsed ? 'flex-col gap-2' : 'gap-3'}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {currentStudent.Avatar ? (
                  <img src={currentStudent.Avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  currentStudent.Name?.charAt(0) || '?'
                )}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{currentStudent.Name}</p>
                  <p className="text-[11px] text-text-muted truncate">{currentStudent.Major}</p>
                </div>
              )}
              <button
                onClick={logout}
                title="Sign out"
                className={`flex-shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-muted hover:text-danger transition-all ${collapsed ? '' : ''}`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

