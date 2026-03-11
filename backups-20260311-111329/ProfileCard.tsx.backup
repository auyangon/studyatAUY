interface ProfileCardProps {
  email: string;
  enrolledCoursesCount: number;
  fullName: string;
  gpa: number;
  major: string;
  status: string;
  studentId: string;
  studyMode?: string;
}

function getGpaTone(gpa: number) {
  if (gpa >= 3.5) {
    return "bg-emerald-50/90 text-emerald-800";
  }

  if (gpa >= 2.5) {
    return "bg-amber-50/90 text-amber-800";
  }

  return "bg-rose-50/90 text-rose-800";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProfileCard({
  email,
  enrolledCoursesCount,
  fullName,
  gpa,
  major,
  status,
  studentId,
  studyMode,
}: ProfileCardProps) {
  return (
    <section className="portal-card animate-fade-up p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">Profile</p>
        <span className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#2e6e59] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          {status}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#88d8c0_0%,#56ab91_100%)] text-2xl font-semibold text-[#173328] shadow-[0_20px_40px_-18px_rgba(86,171,145,0.58)]">
            {getInitials(fullName)}
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{fullName}</h3>
            <p className="mt-1 text-sm text-slate-500">{studentId}</p>
            <p className="mt-3 text-sm font-medium text-slate-600">{email}</p>
          </div>
        </div>
      </div>

      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="widget-panel p-4">
          <dt className="text-sm font-medium text-slate-500">Major</dt>
          <dd className="mt-2 text-sm font-semibold text-slate-900">{major}</dd>
        </div>
        <div className="widget-panel p-4">
          <dt className="text-sm font-medium text-slate-500">Study Mode</dt>
          <dd className="mt-2 text-sm font-semibold text-slate-900">{studyMode ?? "OnCampus"}</dd>
        </div>
        <div className="widget-panel p-4">
          <dt className="text-sm font-medium text-slate-500">Email</dt>
          <dd className="mt-2 break-all text-sm font-semibold text-slate-900">{email}</dd>
        </div>
        <div className="widget-panel p-4">
          <dt className="text-sm font-medium text-slate-500">Enrolled Courses</dt>
          <dd className="mt-2 text-2xl font-semibold text-slate-900">{enrolledCoursesCount}</dd>
        </div>
      </dl>

      <div className="feature-panel mt-6 p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#1d4336]/72">Current GPA</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-[#173328]">{gpa.toFixed(2)}</p>
          </div>
          <span className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] ${getGpaTone(gpa)}`}>
            {gpa >= 3.5 ? "Excellent" : gpa >= 2.5 ? "Steady" : "Needs Focus"}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#1d4336]/74">
          Your academic standing stays visible at a glance in a softer, more polished AUY profile widget.
        </p>
      </div>
    </section>
  );
}