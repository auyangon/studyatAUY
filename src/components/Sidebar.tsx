import { cn } from "../utils/cn";

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
  courseCount: number;
  unreadCount: number;
  userName: string;
  onLogout: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "courses", label: "My Courses", icon: "📚", badge: "courseCount" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "messages", label: "Messages", icon: "💬", badge: "unreadCount" },
  { id: "assignments", label: "Assignments", icon: "📝" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export const Sidebar = ({
  activePage,
  onPageChange,
  isOpen,
  onClose,
  courseCount = 0,
  unreadCount = 0,
  userName = "Student",
  onLogout,
}: SidebarProps) => {
  const safeUserName = userName || "Student";
  const initials = safeUserName
    .split(" ")
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-30 lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e3c2c] to-[#2d5a42] rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-[#c5a572]">AU</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">AUY Portal</h1>
              <p className="text-xs text-[#c5a572]">American University</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            let badgeValue: number | null = null;
            if (item.badge === "courseCount") badgeValue = courseCount;
            if (item.badge === "unreadCount") badgeValue = unreadCount;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all",
                  isActive
                    ? "bg-[#1e3c2c] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {badgeValue ? (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-bold",
                      isActive ? "bg-white/20 text-white" : "bg-red-500 text-white"
                    )}
                  >
                    {badgeValue}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a572] to-[#d4b583] flex items-center justify-center text-white font-bold">
              {initials || "AU"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{safeUserName}</p>
              <p className="text-xs text-gray-500">ISP Student</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-2 px-4 bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] text-white rounded-xl text-sm font-medium hover:shadow-lg transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
