import type { AnnouncementRecord } from "../lib/googleSheets";

interface AnnouncementsCardProps {
  announcements: AnnouncementRecord[];
  disabled?: boolean;
  onMarkRead: (announcementId: string) => Promise<void>;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function priorityLabel(priority: string) {
  switch (priority.toUpperCase()) {
    case "HIGH":
      return "HIGH";
    case "MEDIUM":
      return "MEDIUM";
    default:
      return "LOW";
  }
}

function priorityTone(priority: string) {
  switch (priority.toUpperCase()) {
    case "HIGH":
      return "bg-rose-100 text-rose-700";
    case "MEDIUM":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-emerald-100 text-emerald-700";
  }
}

function preview(content: string) {
  if (content.length <= 110) {
    return content;
  }

  return `${content.slice(0, 107)}...`;
}

export function AnnouncementsCard({ announcements, disabled, onMarkRead }: AnnouncementsCardProps) {
  return (
    <section className="portal-card animate-fade-up p-6 lg:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Announcements</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Latest academic notices</h3>
        </div>
        <p className="text-sm text-slate-500">Tap an unread item to mark it read</p>
      </div>

      <div className="mt-8 space-y-4">
        {announcements.length === 0 ? (
          <div className="widget-panel px-5 py-8 text-sm text-slate-500">
            No announcements match the current search.
          </div>
        ) : null}

        {announcements.slice(0, 6).map((announcement) => {
          const content = (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${priorityTone(announcement.priority)}`}>
                  {priorityLabel(announcement.priority)}
                </span>
                {!announcement.read ? (
                  <span className="rounded-full bg-[linear-gradient(135deg,#88d8c0_0%,#56ab91_100%)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#173328]">
                    NEW
                  </span>
                ) : null}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-slate-900">{announcement.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">{preview(announcement.content)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>{announcement.author}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{formatDate(announcement.date)}</span>
              </div>
            </>
          );

          return announcement.read ? (
            <article key={announcement.id} className="widget-panel rounded-[24px] px-5 py-5 opacity-90">
              {content}
            </article>
          ) : (
            <button
              key={announcement.id}
              className="widget-panel w-full rounded-[24px] border-[#d4b28c]/20 px-5 py-5 text-left transition duration-200 hover:-translate-y-1 hover:border-[#d4b28c]/45 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={disabled}
              onClick={() => void onMarkRead(announcement.id)}
              type="button"
            >
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}