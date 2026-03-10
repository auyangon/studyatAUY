import type { AttendanceCourseBreakdown, StudentDashboardData } from "@/lib/googleSheets";

type AttendanceSummaryCardProps = {
  attendance: StudentDashboardData["attendance"];
  courseBreakdown: AttendanceCourseBreakdown[];
};

const ringData = [
  { key: "present", color: "#16a34a", label: "Present" },
  { key: "late", color: "#eab308", label: "Late" },
  { key: "absent", color: "#dc2626", label: "Absent" },
] as const;

const percentageColor = (value: number) => {
  if (value >= 90) {
    return "text-emerald-600";
  }
  if (value >= 75) {
    return "text-amber-500";
  }
  return "text-rose-500";
};

export const AttendanceSummaryCard = ({ attendance, courseBreakdown }: AttendanceSummaryCardProps) => {
  const total = Math.max(attendance.present + attendance.late + attendance.absent, 1);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <section className="rounded-[24px] bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <h2 className="mb-4 text-lg font-semibold text-[#111827]">Attendance Summary</h2>

      <div className="mb-4 flex flex-wrap items-center gap-6">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth="14" fill="none" />
          {ringData.map((segment) => {
            const value = attendance[segment.key];
            const segmentLength = (value / total) * circumference;
            const dashOffset = circumference - segmentLength - offset;
            offset += segmentLength;

            return (
              <circle
                key={segment.key}
                cx="60"
                cy="60"
                r={radius}
                stroke={segment.color}
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 60 60)"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        <div className="space-y-2 text-sm">
          {ringData.map((segment) => {
            const value = attendance[segment.key];
            const pct = Math.round((value / total) * 100);
            return (
              <p key={segment.key} className="flex items-center gap-2 text-[#4b5563]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: segment.color }} />
                {segment.label}: {pct}%
              </p>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        {courseBreakdown.slice(0, 6).map((course) => (
          <div key={course.code} className="flex items-center justify-between rounded-2xl bg-[#f9fafb] px-3 py-2 text-sm">
            <p className="font-medium text-[#111827]">{course.code}</p>
            <p className={`font-medium ${percentageColor(course.percentage)}`}>{course.percentage}%</p>
            <p className="text-xs text-[#6b7280]">
              P:{course.present} L:{course.late} A:{course.absent}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};