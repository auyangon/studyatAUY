import { useEffect, useMemo, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar, type SidebarSection } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import { CourseProgressCard } from "@/components/CourseProgressCard";
import { AttendanceSummaryCard } from "@/components/AttendanceSummaryCard";
import { AnnouncementsCard } from "@/components/AnnouncementsCard";
import { DeadlinesCard } from "@/components/DeadlinesCard";
import { QuickStatsCard } from "@/components/QuickStatsCard";
import { SyncStatus } from "@/components/SyncStatus";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeData } from "@/hooks/useRealtimeData";

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export function App() {
  const { user, isAuthenticated, login, loginWithEmail, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SidebarSection>("dashboard");
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const targetEmail = selectedEmail || user?.email || null;
  const { data, loading, syncing, error, lastSync, refresh, markRead } = useRealtimeData(targetEmail);

  useEffect(() => {
    if (user?.email) {
      setSelectedEmail(user.email);
    }
  }, [user?.email]);

  const studentOptions = useMemo(() => {
    if (data?.students?.length) {
      return data.students;
    }
    if (!user) {
      return [];
    }
    return [{ id: "self", name: user.name, email: user.email }];
  }, [data?.students, user]);

  if (!isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-6 py-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-xl text-center"
        >
          <div className="mb-7 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#1e3c2c] text-2xl font-extrabold tracking-wide text-[#c5a572]">
            AUY
          </div>
          <h1 className="text-4xl font-extrabold text-[#1e3c2c] md:text-5xl">American University of Yangon</h1>
          <p className="mx-auto mt-3 max-w-md text-base text-[#4b5563]">
            Student Portal Dashboard for ISP program. Sign in with your AUY Google account to continue.
          </p>
          <div className="mt-8 flex justify-center">
            <GoogleLogin
              onSuccess={(response) => {
                const ok = login(response);
                if (!ok) {
                  window.alert("Google login failed. Please try again.");
                }
              }}
              onError={() => window.alert("Google login failed. Please try again.")}
              theme="outline"
              size="large"
              text="signin_with"
              shape="pill"
            />
          </div>
          <button
            type="button"
            onClick={() => loginWithEmail("chanmyae.au.edu.mm@gmail.com", "Chanmyae")}
            className="mx-auto mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] px-6 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Option B: Continue with test account
          </button>
          <p className="mt-5 text-xs text-[#6b7280]">Test account: chanmyae.au.edu.mm@gmail.com</p>
        </motion.section>
      </main>
    );
  }

  const sectionTitle: Record<SidebarSection, string> = {
    dashboard: "Dashboard",
    courses: "My Courses",
    calendar: "Calendar",
    messages: "Messages",
    assignments: "Assignments",
    analytics: "Analytics",
    settings: "Settings",
  };

  const renderSection = () => {
    if (!data) {
      return null;
    }

    if (activeSection === "dashboard") {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...cardMotion}>
            <ProfileCard data={data} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.04 }}>
            <QuickStatsCard data={data} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.08 }}>
            <CourseProgressCard courses={data.courses} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.12 }}>
            <AttendanceSummaryCard attendance={data.attendance} courseBreakdown={data.attendanceByCourse} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.16 }}>
            <AnnouncementsCard announcements={data.announcements} onMarkRead={markRead} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.2 }}>
            <DeadlinesCard deadlines={data.deadlines} />
          </motion.div>
        </div>
      );
    }

    if (activeSection === "courses") {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...cardMotion}>
            <CourseProgressCard courses={data.courses} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.06 }}>
            <ProfileCard data={data} />
          </motion.div>
        </div>
      );
    }

    if (activeSection === "calendar" || activeSection === "assignments") {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...cardMotion}>
            <DeadlinesCard deadlines={data.deadlines} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.06 }}>
            <CourseProgressCard courses={data.courses} />
          </motion.div>
        </div>
      );
    }

    if (activeSection === "messages") {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...cardMotion}>
            <AnnouncementsCard announcements={data.announcements} onMarkRead={markRead} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.06 }}>
            <QuickStatsCard data={data} />
          </motion.div>
        </div>
      );
    }

    if (activeSection === "analytics") {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...cardMotion}>
            <AttendanceSummaryCard attendance={data.attendance} courseBreakdown={data.attendanceByCourse} />
          </motion.div>
          <motion.div {...cardMotion} transition={{ duration: 0.35, delay: 0.06 }}>
            <QuickStatsCard data={data} />
          </motion.div>
        </div>
      );
    }

    return (
      <motion.section {...cardMotion} className="rounded-[24px] bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-[#111827]">Settings</h2>
        <p className="mt-2 text-sm text-[#4b5563]">Manage your account and data sync preferences for the AUY portal.</p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-[#eff2f5] p-4">
            <p className="text-xs text-[#6b7280]">Signed in as</p>
            <p className="text-sm font-medium text-[#111827]">{user.email}</p>
          </div>
          <div className="rounded-2xl border border-[#eff2f5] p-4">
            <p className="text-xs text-[#6b7280]">Current student</p>
            <p className="text-sm font-medium text-[#111827]">{data.fullName}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-2xl bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] px-4 py-2 text-sm font-medium text-white"
          >
            Sync now
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-2xl border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#111827]"
          >
            Logout
          </button>
        </div>
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#111827]">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        userName={data?.fullName ?? user.name}
        onLogout={logout}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        coursesBadge={data?.courses.length ?? 6}
        messagesBadge={data?.unreadAnnouncements ?? 3}
      />

      <main className="px-4 py-5 md:ml-[92px] md:px-6 xl:ml-[260px]">
        <Header
          firstName={data?.firstName ?? user.givenName}
          studentOptions={studentOptions}
          selectedEmail={targetEmail ?? user.email}
          onStudentChange={setSelectedEmail}
          canViewAllStudents={Boolean(data?.canViewAllStudents)}
          onOpenMenu={() => setMobileOpen(true)}
        />

        <div className="mb-4 px-1">
          <h2 className="text-xl font-semibold text-[#1e3c2c]">{sectionTitle[activeSection]}</h2>
        </div>

        <SyncStatus syncing={syncing} error={error} lastSync={lastSync} onRefresh={refresh} visible={Boolean(data?.canViewAllStudents)} />

        {loading && !data ? (
          <div className="flex h-[55vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#c5a572] border-t-transparent" />
          </div>
        ) : null}

        {data ? (
          <AnimatePresence mode="wait">
            <motion.section key={data.lastUpdatedAt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderSection()}
            </motion.section>
          </AnimatePresence>
        ) : null}
      </main>
    </div>
  );
}
