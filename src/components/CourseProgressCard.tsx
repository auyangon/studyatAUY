import type { Course } from "@/lib/googleSheets";

type CourseProgressCardProps = {
  courses: Course[];
};

const gradeStyles: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700",
  B: "bg-blue-100 text-blue-700",
  C: "bg-amber-100 text-amber-700",
};

const attendanceColor = (attendance: number) => {
  if (attendance >= 90) {
    return "text-emerald-600";
  }
  if (attendance >= 75) {
    return "text-amber-500";
  }
  return "text-rose-500";
};

export const CourseProgressCard = ({ courses }: CourseProgressCardProps) => {
  return (
    <section className="rounded-[24px] bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <h2 className="mb-4 text-lg font-semibold text-[#111827]">Course Progress</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.code} className="rounded-2xl border border-[#f0f2f5] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-[#1e3c2c]">{course.code}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${gradeStyles[course.grade] ?? "bg-slate-100 text-slate-700"}`}>
                {course.grade}
              </span>
            </div>
            <p className="text-sm font-medium text-[#111827]">{course.name}</p>
            <p className="mb-2 text-xs text-[#6b7280]">{course.teacher}</p>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1e3c2c] to-[#c5a572]"
                style={{ width: `${Math.max(0, Math.min(course.progress, 100))}%` }}
              />
            </div>
            <p className={`text-xs font-medium ${attendanceColor(course.attendance)}`}>Attendance {course.attendance}%</p>
          </div>
        ))}
      </div>

      <a
        href="https://classroom.google.com/"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] px-4 py-2 text-sm font-medium text-white"
      >
        Open Google Classroom
      </a>
    </section>
  );
};