interface QuickStatsCardProps {
  activeCourses: number;
  attendanceRate: number;
  completedCourses: number;
  creditsEnrolled: number;
  daysUntilFinals: number;
  gpa: number;
  semesterWeek: number;
  semesterWeeksTotal: number;
  unreadAnnouncements: number;
}

export function QuickStatsCard({
  activeCourses,
  attendanceRate,
  completedCourses,
  creditsEnrolled,
  daysUntilFinals,
  gpa,
  semesterWeek,
  semesterWeeksTotal,
  unreadAnnouncements,
}: QuickStatsCardProps) {
  const semesterProgress = semesterWeeksTotal > 0 ? Math.min((semesterWeek / semesterWeeksTotal) * 100, 100) : 0;
  const stats = [
    { label: "GPA", value: gpa.toFixed(2) },
    { label: "Attendance Rate", value: `${attendanceRate.toFixed(0)}%` },
    { label: "Completed Courses", value: completedCourses },
    { label: "Credits Enrolled", value: creditsEnrolled },
    { label: "Active Courses", value: activeCourses },
    { label: "Days Until Finals", value: daysUntilFinals },
    { label: "Unread Announcements", value: unreadAnnouncements },
  ];

  return (
    <section className="portal-card animate-fade-up p-6 lg:p-8">
      <p className="eyebrow">Quick Stats</p>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Semester snapshot</h3>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="widget-panel p-4">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="feature-panel mt-6 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#1d4336]/72">Semester Progress</p>
            <p className="mt-2 text-xl font-semibold text-[#173328]">
              Week {semesterWeek} of {semesterWeeksTotal}
            </p>
          </div>
          <span className="rounded-full border border-white/50 bg-white/28 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#173328]">
            {semesterProgress.toFixed(0)}%
          </span>
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/28">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ffffff_0%,#f6eadc_100%)] transition-all duration-700"
            style={{ width: `${semesterProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}