import type { Deadline } from "@/lib/googleSheets";

type DeadlinesCardProps = {
  deadlines: Deadline[];
};

const dayColor = (daysLeft: number) => {
  if (daysLeft <= 7) {
    return "text-rose-500";
  }
  if (daysLeft <= 14) {
    return "text-amber-500";
  }
  return "text-emerald-600";
};

export const DeadlinesCard = ({ deadlines }: DeadlinesCardProps) => {
  return (
    <section className="rounded-[24px] bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <h2 className="mb-4 text-lg font-semibold text-[#111827]">Upcoming Deadlines</h2>
      <div className="space-y-3">
        {deadlines.slice(0, 6).map((deadline) => (
          <div key={deadline.id} className="rounded-2xl border border-[#f0f2f5] p-4">
            <div className="mb-1 flex items-center justify-between gap-3">
              <p className="font-medium text-[#111827]">
                {deadline.icon} {deadline.title}
              </p>
              <p className={`text-sm font-semibold ${dayColor(deadline.daysLeft)}`}>{deadline.daysLeft} days</p>
            </div>
            <p className="mb-2 text-xs text-[#6b7280]">{deadline.course}</p>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
              <div className="h-full rounded-full bg-gradient-to-r from-[#1e3c2c] to-[#c5a572]" style={{ width: `${deadline.progress}%` }} />
            </div>
            {deadline.daysLeft <= 7 ? (
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">URGENT</span>
            ) : null}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 rounded-2xl bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] px-4 py-2 text-sm font-medium text-white"
      >
        Add to Calendar
      </button>
    </section>
  );
};