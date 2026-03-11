import type { DeadlineRecord } from "../lib/googleSheets";

interface DeadlinesCardProps {
  deadlines: DeadlineRecord[];
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" }).format(date);
}

export function DeadlinesCard({ deadlines }: DeadlinesCardProps) {
  return (
    <section className="portal-card animate-fade-up p-6 lg:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Upcoming Deadlines</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Stay ahead of every submission</h3>
        </div>
        <p className="text-sm text-slate-500">Next 6 items</p>
      </div>

      <div className="mt-8 space-y-4">
        {deadlines.length === 0 ? (
          <div className="widget-panel px-5 py-8 text-sm text-slate-500">
            No deadlines match the current search.
          </div>
        ) : null}

        {deadlines.slice(0, 6).map((deadline) => (
          <article
            key={deadline.id}
            className="widget-panel rounded-[24px] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#d4b28c]/38"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(136,216,192,0.32),rgba(86,171,145,0.18))] text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
                  {deadline.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{deadline.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {deadline.course} • Due {formatDate(deadline.dueDate)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold text-slate-900">{deadline.daysLeft}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Days Left</p>
                {deadline.daysLeft <= 7 ? (
                  <span className="mt-2 inline-flex rounded-full bg-rose-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-700">
                    Urgent
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                <span>Timeline Pressure</span>
                <span>{deadline.progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200/60">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#88d8c0_0%,#d4b28c_100%)] transition-all duration-700"
                  style={{ width: `${deadline.progress}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}