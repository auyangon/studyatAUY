import { cn } from "../utils/cn";

interface SidebarItem {
  id: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  activeItem: string;
  isOpen: boolean;
  items: SidebarItem[];
  onClose: () => void;
  onSelect: (sectionId: string) => void;
}

export function Sidebar({ activeItem, isOpen, items, onClose, onSelect }: SidebarProps) {
  return (
    <>
      <button
        aria-label="Close sidebar"
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        type="button"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[19.5rem] flex-col px-4 py-4 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="glass-panel flex h-full flex-col rounded-[34px] p-4">
          <nav className="flex-1 space-y-1.5">
            {items.map((item) => {
              const isActive = item.id === activeItem;

              return (
                <button
                  key={item.id}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-[22px] px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 hover:scale-[1.01]",
                    isActive
                      ? "bg-[linear-gradient(135deg,#88d8c0_0%,#56ab91_100%)] text-[#173328] shadow-[0_18px_36px_-18px_rgba(86,171,145,0.58)]"
                      : "text-slate-600 hover:bg-white/72 hover:text-slate-900",
                  )}
                  onClick={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                  type="button"
                >
                  {isActive ? <span className="absolute inset-y-3 left-2 w-1 rounded-full bg-white/88" /> : null}
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="widget-panel px-4 py-4 text-sm text-slate-500">
            <p className="eyebrow">Live Sync</p>
            <p className="mt-3 font-medium text-slate-900">Google Sheets checks every 30 seconds.</p>
            <p className="mt-2 leading-6">
              Announcements, attendance, and academic updates stay current without leaving the portal.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}