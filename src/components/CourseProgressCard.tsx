import type { CourseRecord } from "../lib/googleSheets";

interface CourseProgressCardProps {
  courses: CourseRecord[];
}

export function CourseProgressCard({ courses }: CourseProgressCardProps) {
  const visibleCourses = courses.slice(0, 6);

  return (
    <section className="portal-card animate-fade-up p-6 lg:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Course Progress</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Your enrolled classroom view</h3>
        </div>
        <p className="text-sm text-slate-500">{visibleCourses.length} courses shown</p>
      </div>

      <div className="mt-8 space-y-4">
        {visibleCourses.length === 0 ? (
          <div className="widget-panel px-5 py-8 text-sm text-slate-500">
            No courses match the current search.
          </div>
        ) : null}

        {visibleCourses.map((course) => (
          <article
            key={course.code}
            className="widget-panel rounded-[26px] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#d4b28c]/35"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/70 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#2e6e59] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    {course.code}
                  </span>
                  <span className="text-sm text-slate-500">{course.teacher}</span>
                </div>
                <h4 className="mt-3 text-lg font-semibold text-slate-900">{course.name}</h4>
              </div>

              <div className="flex items-center gap-3">
                <div className="widget-panel rounded-[20px] px-4 py-3 text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Grade</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{course.grade || "In Progress"}</p>
                </div>
                {course.googleClassroomLink ? (
                  <a
                    className="primary-button inline-flex items-center justify-center whitespace-nowrap px-5 py-3 text-sm"
                    href={course.googleClassroomLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open Google Classroom
                  </a>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-center">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  <span>Semester Progress</span>
                  <span>{Math.round(course.progress)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200/60">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#88d8c0_0%,#56ab91_100%)] transition-all duration-700"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="widget-panel rounded-[20px] px-4 py-3 text-sm text-slate-600">
                <p className="font-medium text-slate-500">Attendance</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{course.attendance.toFixed(0)}%</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}