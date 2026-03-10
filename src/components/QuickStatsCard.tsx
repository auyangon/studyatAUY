import type { StudentDashboardData } from "@/lib/googleSheets";

type QuickStatsCardProps = {
  data: StudentDashboardData;
};

export const QuickStatsCard = ({ data }: QuickStatsCardProps) => {
  const attendanceTotal = data.attendance.present + data.attendance.late + data.attendance.absent;
  const attendanceRate = Math.round((data.attendance.present / Math.max(attendanceTotal, 1)) * 100);
  const semesterProgress = Math.round((data.semesterWeek / Math.max(data.semesterWeeksTotal, 1)) * 100);

  const stats = [
    { icon: "📊", label: "GPA", value: data.gpa.toFixed(2) },
    { icon: "📈", label: "Attendance Rate", value: `${attendanceRate}%` },
    { icon: "✅", label: "Completed Courses", value: `${data.completedCourses}/${data.enrolledCoursesCount}` },
    { icon: "📚", label: "Credits Enrolled", value: `${data.creditsEnrolled}` },
    { icon: "🏆", label: "Active Courses", value: `${data.activeCourses}` },
    { icon: "📅", label: "Days Until Finals", value: `${data.daysUntilFinals}` },
    { icon: "📖", label: "Unread Announcements", value: `${data.unreadAnnouncements}` },
  ];

  return (
    <section className="rounded-[24px] bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <h2 className="mb-4 text-lg font-semibold text-[#111827]">Quick Stats</h2>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#eff2f5] px-3 py-2">
            <p className="text-xs text-[#6b7280]">
              {item.icon} {item.label}
            </p>
            <p className="text-lg font-semibold text-[#111827]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-1 flex items-center justify-between text-sm text-[#4b5563]">
          <span>Semester progress</span>
          <span>
            Week {data.semesterWeek} of {data.semesterWeeksTotal}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#1e3c2c] to-[#c5a572]" style={{ width: `${semesterProgress}%` }} />
        </div>
      </div>
    </section>
  );
};