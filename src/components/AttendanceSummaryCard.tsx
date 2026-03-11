import type { AttendanceByCourseRecord, AttendanceTotals } from "../lib/googleSheets";

interface AttendanceSummaryCardProps {
  attendance: AttendanceTotals;
  attendanceByCourse: AttendanceByCourseRecord[];
}

function percentage(value: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

export function AttendanceSummaryCard({ attendance, attendanceByCourse }: AttendanceSummaryCardProps) {
  const total = attendance.present + attendance.late + attendance.absent;
  const present = percentage(attendance.present, total);
  const late = percentage(attendance.late, total);
  const absent = percentage(attendance.absent, total);
  const donutStyle = {
    background: `conic-gradient(#56ab91 0 ${present}%, #d4b28c ${present}% ${present + late}%, #df8b7d ${present + late}% 100%)`,
  };

  return (
    <section className="portal-card animate-fade-up p-6 lg:p-8">
      <p className="eyebrow">Attendance Summary</p>
      <div className="mt-6 grid gap-8 xl:grid-cols-[15rem_minmax(0,1fr)] xl:items-start">
        <div>
          <div className="relative mx-auto h-52 w-52 rounded-full shadow-[0_24px_55px_rgba(15,23,42,0.08)]" style={donutStyle}>
            <div className="absolute inset-[18px] flex items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.9))] text-center shadow-[inset_0_0_0_1px_rgba(226,232,240,0.9)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Overall</p>
                <p className="mt-3 text-4xl font-semibold text-slate-900">{present}%</p>
                <p className="mt-1 text-sm text-slate-500">Present rate</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            {[
              { color: "bg-[#56ab91]", label: "Present", value: `${attendance.present} classes`, rate: `${present}%` },
              { color: "bg-[#d4b28c]", label: "Late", value: `${attendance.late} classes`, rate: `${late}%` },
              { color: "bg-[#df8b7d]", label: "Absent", value: `${attendance.absent} classes`, rate: `${absent}%` },
            ].map((item) => (
              <div key={item.label} className="widget-panel flex items-center justify-between gap-3 rounded-[20px] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="font-medium text-slate-900">{item.label}</span>
                </div>
                <span>{item.value} • {item.rate}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Course-wise breakdown</h3>
          <div className="mt-6 space-y-4">
            {attendanceByCourse.length === 0 ? (
              <div className="widget-panel px-5 py-8 text-sm text-slate-500">
                No attendance records match the current search.
              </div>
            ) : null}

            {attendanceByCourse.slice(0, 6).map((course) => (
              <div key={course.code} className="widget-panel rounded-[24px] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{course.code}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {course.present} present, {course.late} late, {course.absent} absent
                    </p>
                  </div>
                  <span className="rounded-full bg-[#edf3ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1e3c2c]">
                    {course.percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200/60">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#88d8c0_0%,#56ab91_100%)] transition-all duration-700"
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}