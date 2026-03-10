import { useEffect, useMemo, useState } from "react";
import type { StudentLite } from "@/lib/googleSheets";

type HeaderProps = {
  firstName: string;
  studentOptions: StudentLite[];
  selectedEmail: string;
  onStudentChange: (email: string) => void;
  canViewAllStudents: boolean;
  onOpenMenu: () => void;
};

const formatClock = (date: Date) => {
  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${day} • ${time}`;
};

export const Header = ({
  firstName,
  studentOptions,
  selectedEmail,
  onStudentChange,
  canViewAllStudents,
  onOpenMenu,
}: HeaderProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const initials = useMemo(
    () =>
      firstName
        .split(" ")
        .slice(0, 2)
        .map((item) => item.charAt(0).toUpperCase())
        .join(""),
    [firstName]
  );

  return (
    <header className="sticky top-0 z-20 mb-6 rounded-3xl border border-white/70 bg-white/80 px-4 py-4 shadow-xl backdrop-blur-lg md:px-6">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          className="rounded-xl border border-[#d1d5db] px-3 py-2 text-[#1e3c2c] md:hidden"
        >
          ☰
        </button>
        <div className="min-w-[200px] flex-1">
          <p className="text-xl font-semibold text-[#111827]">Welcome back, {firstName} 👋</p>
          <p className="text-sm text-[#4b5563]">{formatClock(now)}</p>
        </div>

        <select
          value={selectedEmail}
          onChange={(event) => onStudentChange(event.target.value)}
          disabled={!canViewAllStudents}
          className="min-w-[220px] rounded-2xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#111827] outline-none focus:border-[#1e3c2c] disabled:cursor-not-allowed disabled:bg-[#f9fafb]"
        >
          {studentOptions.map((student) => (
            <option key={student.id} value={student.email}>
              {student.name}
            </option>
          ))}
        </select>

        <div className="min-w-[220px] flex-1 rounded-2xl border border-[#e5e7eb] bg-white px-3 py-2">
          <input
            className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
            placeholder="Search courses, announcements..."
            type="search"
          />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d1d5db] bg-white text-lg text-[#1e3c2c]"
          title="Light mode"
        >
          ☀️
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#c5a572] to-[#e5d2ac] text-sm font-semibold text-[#1e3c2c]">
          {initials || "AU"}
        </div>
      </div>
    </header>
  );
};