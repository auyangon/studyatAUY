import type { Announcement } from "@/lib/googleSheets";

type AnnouncementsCardProps = {
  announcements: Announcement[];
  onMarkRead: (id: string) => void;
};

const priorityLabel: Record<Announcement["priority"], string> = {
  HIGH: "🔴 HIGH",
  MEDIUM: "🟡 MEDIUM",
  LOW: "🟢 LOW",
};

export const AnnouncementsCard = ({ announcements, onMarkRead }: AnnouncementsCardProps) => {
  return (
    <section className="rounded-[24px] bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <h2 className="mb-4 text-lg font-semibold text-[#111827]">Announcements</h2>
      <div className="space-y-3">
        {announcements.slice(0, 6).map((announcement) => (
          <button
            key={announcement.id}
            type="button"
            onClick={() => onMarkRead(announcement.id)}
            className="w-full rounded-2xl border border-[#eff2f5] p-4 text-left transition hover:bg-[#fafafa]"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold text-[#4b5563]">{priorityLabel[announcement.priority]}</p>
              {!announcement.read ? (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 animate-pulse">NEW</span>
              ) : null}
            </div>
            <p className="font-medium text-[#111827]">{announcement.title}</p>
            <p className="line-clamp-2 text-sm text-[#4b5563]">{announcement.content}</p>
            <p className="mt-2 text-xs text-[#9ca3af]">
              {announcement.author} • {announcement.date}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};