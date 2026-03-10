import type { StudentDashboardData } from "@/lib/googleSheets";

type ProfileCardProps = {
  data: StudentDashboardData;
};

const gpaColor = (gpa: number) => {
  if (gpa >= 3.5) {
    return "text-emerald-600";
  }
  if (gpa >= 2.5) {
    return "text-amber-500";
  }
  return "text-rose-500";
};

export const ProfileCard = ({ data }: ProfileCardProps) => {
  return (
    <section className="rounded-[24px] bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#111827]">Student Profile</h2>
          <p className="text-sm text-[#4b5563]">ID: {data.studentId}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">{data.status}</span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-[#6b7280]">Full Name</p>
          <p className="font-medium text-[#111827]">{data.fullName}</p>
        </div>
        <div>
          <p className="text-[#6b7280]">Major</p>
          <p className="font-medium text-[#111827]">{data.major}</p>
        </div>
        <div>
          <p className="text-[#6b7280]">Email</p>
          <p className="truncate font-medium text-[#111827]">{data.email}</p>
        </div>
        <div>
          <p className="text-[#6b7280]">Courses</p>
          <p className="font-medium text-[#111827]">{data.enrolledCoursesCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#f9fafb] p-4">
        <div>
          <p className="text-xs text-[#6b7280]">GPA</p>
          <p className={`text-xl font-semibold ${gpaColor(data.gpa)}`}>{data.gpa.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-[#6b7280]">Student QR</p>
          <p className="text-2xl">📱</p>
        </div>
      </div>
    </section>
  );
};