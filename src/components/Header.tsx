import { useEffect, useMemo, useState } from "react";

interface HeaderProps {
  firstName: string;
  clock: Date;
  search: string;
  onSearchChange: (value: string) => void;
  onMenuToggle: () => void;
  syncing: boolean;
  canViewAllStudents: boolean;
  students: Array<{ id: string; name: string; email: string }>;
  selectedEmail: string;
  onStudentChange: (email: string) => void;
}

export const Header = ({
  firstName = "",
  clock,
  search,
  onSearchChange,
  onMenuToggle,
  syncing,
  canViewAllStudents,
  students = [],
  selectedEmail,
  onStudentChange,
}: HeaderProps) => {
  const safeFirstName = firstName || "Student";
  const initials = useMemo(() => {
    return safeFirstName
      .split(" ")
      .slice(0, 2)
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  }, [safeFirstName]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuToggle} className="lg:hidden text-2xl">☰</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome back, {safeFirstName} 👋
            </h1>
            <p className="text-sm text-gray-500">{formatTime(clock)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {canViewAllStudents && students.length > 0 && (
            <select
              value={selectedEmail}
              onChange={(e) => onStudentChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl text-sm"
            >
              {students.map((s) => (
                <option key={s.id} value={s.email}>{s.name}</option>
              ))}
            </select>
          )}

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-xl text-sm w-64"
            />
            {syncing && (
              <div className="absolute right-3 top-2.5">
                <div className="w-4 h-4 border-2 border-[#c5a572] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a572] to-[#d4b583] flex items-center justify-center text-white font-bold">
            {initials || "AU"}
          </div>
        </div>
      </div>
    </header>
  );
};
