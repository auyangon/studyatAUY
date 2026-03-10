import { cn } from "@/utils/cn";

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
  userName: string;
  onLogout: () => void;
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
  coursesBadge?: number;
  messagesBadge?: number;
};

export type SidebarSection =
  | "dashboard"
  | "courses"
  | "calendar"
  | "messages"
  | "assignments"
  | "analytics"
  | "settings";

const menuItems: Array<{ icon: string; label: string; id: SidebarSection; badgeKey?: "courses" | "messages" }> = [
  { icon: "🏠", label: "Dashboard", id: "dashboard" },
  { icon: "📚", label: "My Courses", id: "courses", badgeKey: "courses" },
  { icon: "📅", label: "Calendar", id: "calendar" },
  { icon: "💬", label: "Messages", id: "messages", badgeKey: "messages" },
  { icon: "📝", label: "Assignments", id: "assignments" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "AU";

export const Sidebar = ({
  mobileOpen,
  onClose,
  userName,
  onLogout,
  activeSection,
  onSectionChange,
  coursesBadge = 6,
  messagesBadge = 3,
}: SidebarProps) => {
  const initials = initialsFromName(userName);
  const badges = {
    courses: String(coursesBadge),
    messages: String(messagesBadge),
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-[#111827]/20 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-[#e5e7eb] bg-white px-4 py-6 transition-transform duration-300 md:w-[92px] xl:w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3c2c] text-lg font-bold text-[#c5a572]">AUY</div>
          <div className="md:hidden xl:block">
            <p className="text-sm font-semibold text-[#111827]">American University</p>
            <p className="text-sm text-[#4b5563]">of Yangon</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 hover:scale-105",
                activeSection === item.id ? "bg-[#1e3c2c] text-white" : "text-[#4b5563] hover:bg-[#f3f4f6]"
              )}
            >
              <span className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span className="md:hidden xl:inline">{item.label}</span>
              </span>
              {item.badgeKey ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs md:hidden xl:inline",
                    activeSection === item.id ? "bg-white/20 text-white" : "bg-[#eef2ff] text-[#1e3c2c]"
                  )}
                >
                  {badges[item.badgeKey]}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#f9fafb] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#c5a572] to-[#e2cc9d] font-semibold text-[#1e3c2c]">
              {initials}
            </div>
            <div className="md:hidden xl:block">
              <p className="text-sm font-medium text-[#111827]">{userName}</p>
              <p className="text-xs text-[#6b7280]">ISP Student</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="mt-3 w-full rounded-2xl bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] px-3 py-2 text-sm font-medium text-white md:text-xs xl:text-sm"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};