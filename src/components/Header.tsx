import type { StudentSummary } from "../lib/googleSheets";

interface HeaderProps {
  activeSectionLabel: string;
  canViewAllStudents: boolean;
  clock: Date;
  firstName: string;
  onMenuToggle: () => void;
  onSearchChange: (value: string) => void;
  onStudentChange: (email: string) => void;
  search: string;
  selectedStudentEmail: string;
  students: StudentSummary[];
  syncing: boolean;
}

const clockFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  month: "short",
  weekday: "short",
});

export function Header({
  activeSectionLabel,
  canViewAllStudents,
  clock,
  firstName,
  onMenuToggle,
  onSearchChange,
  onStudentChange,
  search,
  selectedStudentEmail,
  students,
  syncing,
}: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6 lg:left-[20.5rem] lg:px-8">
      <div className="glass-panel mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-[30px] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open navigation menu"
            className="widget-panel inline-flex h-11 w-11 items-center justify-center rounded-[18px] text-lg lg:hidden"
            onClick={onMenuToggle}
            type="button"
          >
            ☰
          </button>
          <div>
            <p className="eyebrow">Welcome Back</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">
              {firstName}, you are viewing {activeSectionLabel}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{clockFormatter.format(clock)}</p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,18rem)_minmax(0,15rem)_auto] lg:items-center">
          <label className="widget-panel flex min-w-0 items-center gap-3 px-4 py-3">
            <span className="text-base">🔎</span>
            <input
              aria-label={`Search ${activeSectionLabel}`}
              className="w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={`Search ${activeSectionLabel.toLowerCase()}`}
              type="text"
              value={search}
            />
          </label>

          {canViewAllStudents ? (
            <label className="widget-panel flex min-w-0 items-center gap-3 px-4 py-3">
              <span className="text-base">🎓</span>
              <select
                aria-label="Select student"
                className="w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none"
                onChange={(event) => onStudentChange(event.target.value)}
                value={selectedStudentEmail}
              >
                {students.map((student) => (
                  <option key={student.email} value={student.email}>
                    {student.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="widget-panel flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Portal Status</p>
              <p className="mt-1 text-sm font-medium text-slate-900">Light mode, live sheet sync</p>
            </div>
            <div className="flex items-center gap-3">
              {syncing ? (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-[#2e6e59]">
                  <span className="sync-spinner" />
                  Syncing
                </span>
              ) : null}
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-white/70 text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                ☀️
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}