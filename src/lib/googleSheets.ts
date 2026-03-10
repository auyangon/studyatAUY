const GOOGLE_CLIENT_ID_FALLBACK =
  "316467644383-78ueu8svimuqvshpplpeg0vs3d5ro49r.apps.googleusercontent.com";
const APPS_SCRIPT_URL_FALLBACK =
  "https://script.google.com/macros/s/AKfycbwvBPGXMd5_HakndLKOS_zOClfAfTkOLVX8RfETT9beli9Hx4dBmF9KhS2h09R8__D-2A/exec";

export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? GOOGLE_CLIENT_ID_FALLBACK;
export const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL ?? APPS_SCRIPT_URL_FALLBACK;

export type Course = {
  code: string;
  name: string;
  teacher: string;
  grade: string;
  progress: number;
  attendance: number;
};

export type AttendanceCourseBreakdown = {
  code: string;
  percentage: number;
  present: number;
  late: number;
  absent: number;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  author: string;
  date: string;
  read: boolean;
};

export type Deadline = {
  id: string;
  icon: string;
  title: string;
  course: string;
  dueDate: string;
  daysLeft: number;
  progress: number;
};

export type StudentLite = {
  id: string;
  name: string;
  email: string;
};

export type StudentDashboardData = {
  studentId: string;
  fullName: string;
  firstName: string;
  email: string;
  major: string;
  status: string;
  gpa: number;
  enrolledCoursesCount: number;
  courses: Course[];
  attendance: {
    present: number;
    late: number;
    absent: number;
  };
  attendanceByCourse: AttendanceCourseBreakdown[];
  announcements: Announcement[];
  deadlines: Deadline[];
  students: StudentLite[];
  unreadAnnouncements: number;
  daysUntilFinals: number;
  semesterWeek: number;
  semesterWeeksTotal: number;
  creditsEnrolled: number;
  completedCourses: number;
  activeCourses: number;
  canViewAllStudents: boolean;
  lastUpdatedAt: number;
};

export type UpdateCheckResponse = {
  needsUpdate: boolean;
  timestamp?: number;
};

const defaultCourseCodes = ["BUS101", "ECO201", "MKT202", "ACC210", "ENG110", "STA205"];
const defaultStudents: StudentLite[] = Array.from({ length: 24 }, (_, index) => ({
  id: `S${String(index + 1).padStart(3, "0")}`,
  name: `ISP Student ${index + 1}`,
  email: `isp.student${index + 1}@auy.edu.mm`,
}));

const defaultDashboardData = (email: string): StudentDashboardData => {
  const firstName = email.split("@")[0]?.split(".")[0] ?? "Student";
  const prettyName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const courses: Course[] = defaultCourseCodes.map((code, index) => ({
    code,
    name: ["Business Fundamentals", "Microeconomics", "Marketing Strategy", "Financial Accounting", "Academic Writing", "Business Statistics"][index],
    teacher: ["Dr. Tin Win", "Prof. Kyi Mar", "Dr. Aung Naing", "Ms. Hnin Pwint", "Dr. Kay Thi", "Mr. Min Thu"][index],
    grade: ["A", "A", "B", "A", "B", "A"][index],
    progress: 75,
    attendance: [95, 90, 88, 92, 86, 91][index],
  }));

  return {
    studentId: "S001",
    fullName: `${prettyName} Student`,
    firstName: prettyName,
    email,
    major: "ISP program",
    status: "Active",
    gpa: 3.72,
    enrolledCoursesCount: 6,
    courses,
    attendance: {
      present: 108,
      late: 9,
      absent: 3,
    },
    attendanceByCourse: courses.map((course) => ({
      code: course.code,
      percentage: course.attendance,
      present: 18,
      late: 1,
      absent: 1,
    })),
    announcements: [
      {
        id: "1",
        title: "ðŸ“ Important: Midterm Schedule Released",
        content: "Please review the updated ISP midterm schedule and confirm your exam slots by Friday.",
        priority: "HIGH",
        author: "Academic Office",
        date: "2026-03-01",
        read: false,
      },
      {
        id: "2",
        title: "ðŸ“š Library Hours Extended",
        content: "The AUY library will remain open until 9:00 PM during midterm preparation week.",
        priority: "MEDIUM",
        author: "Campus Services",
        date: "2026-02-27",
        read: false,
      },
      {
        id: "3",
        title: "ðŸŽ¤ Career Talk with Industry Mentors",
        content: "Join this Thursday's mentorship talk for practical internship and networking advice.",
        priority: "LOW",
        author: "Student Affairs",
        date: "2026-02-25",
        read: true,
      },
      {
        id: "4",
        title: "ðŸ”” Tuition Reminder",
        content: "Semester payment confirmation closes this week. Please contact finance for support if needed.",
        priority: "HIGH",
        author: "Finance Office",
        date: "2026-02-22",
        read: true,
      },
      {
        id: "5",
        title: "ðŸ’¡ Innovation Lab Access",
        content: "Innovation Lab access is now available on Saturdays for ISP capstone teams.",
        priority: "MEDIUM",
        author: "Innovation Hub",
        date: "2026-02-20",
        read: true,
      },
      {
        id: "6",
        title: "ðŸŒ± Campus Green Week",
        content: "Join volunteer activities and earn participation points during AUY Green Week.",
        priority: "LOW",
        author: "Student Council",
        date: "2026-02-18",
        read: true,
      },
    ],
    deadlines: [
      { id: "d1", icon: "ðŸ“", title: "Case Study Report", course: "BUS101", dueDate: "2026-03-12", daysLeft: 3, progress: 85 },
      { id: "d2", icon: "âœï¸", title: "Essay Draft", course: "ENG110", dueDate: "2026-03-17", daysLeft: 8, progress: 65 },
      { id: "d3", icon: "ðŸŽ“", title: "Quiz 3", course: "ECO201", dueDate: "2026-03-20", daysLeft: 11, progress: 58 },
      { id: "d4", icon: "ðŸŽ‰", title: "Group Presentation", course: "MKT202", dueDate: "2026-03-23", daysLeft: 14, progress: 42 },
      { id: "d5", icon: "ðŸ“Š", title: "Problem Set", course: "STA205", dueDate: "2026-03-25", daysLeft: 16, progress: 35 },
      { id: "d6", icon: "ðŸ“‹", title: "Ledger Submission", course: "ACC210", dueDate: "2026-03-28", daysLeft: 19, progress: 25 },
    ],
    students: defaultStudents.map((student, index) =>
      index === 0 ? { ...student, name: `${prettyName} Student`, email } : student
    ),
    unreadAnnouncements: 2,
    daysUntilFinals: 38,
    semesterWeek: 8,
    semesterWeeksTotal: 16,
    creditsEnrolled: 18,
    completedCourses: 0,
    activeCourses: 6,
    canViewAllStudents: false,
    lastUpdatedAt: Date.now(),
  };
};

const toNumber = (value: unknown, fallback: number): number => {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
};

const requestAppsScript = async <T>(params: Record<string, string | number | undefined>): Promise<T> => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });

  const proxyUrl = `/api/proxy?${query.toString()}`;
  const directUrl = `${appsScriptUrl}?${query.toString()}`;

  let response: Response;
  try {
    response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error("Proxy failed");
    }
  } catch {
    response = await fetch(directUrl);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch data (${response.status})`);
  }

  return (await response.json()) as T;
};

const normalizeDashboardData = (raw: unknown, email: string): StudentDashboardData => {
  const fallback = defaultDashboardData(email);
  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  const data = raw as Record<string, unknown>;
  const profile = (data.student as Record<string, unknown> | undefined) ?? data;
  const coursesRaw = (data.courses as unknown[]) ?? (data.enrollments as unknown[]) ?? fallback.courses;
  const attendanceRaw = (data.attendance as Record<string, unknown> | undefined) ?? {};
  const announcementsRaw = (data.announcements as unknown[]) ?? fallback.announcements;
  const deadlinesRaw = (data.deadlines as unknown[]) ?? fallback.deadlines;
  const studentsRaw = (data.students as unknown[]) ?? fallback.students;

  const fullName = String(profile.fullName ?? profile.name ?? fallback.fullName);
  const firstName = fullName.split(" ")[0] ?? fallback.firstName;
  const courses: Course[] = coursesRaw.slice(0, 6).map((item, index) => {
    const course = item as Record<string, unknown>;
    return {
      code: String(course.code ?? course.courseCode ?? defaultCourseCodes[index] ?? `CRS${index + 1}`),
      name: String(course.name ?? course.courseName ?? `Course ${index + 1}`),
      teacher: String(course.teacher ?? course.instructor ?? "TBA"),
      grade: String(course.grade ?? "A"),
      progress: toNumber(course.progress, 75),
      attendance: toNumber(course.attendance ?? course.attendancePercentage, 90),
    };
  });

  const announcements: Announcement[] = announcementsRaw.slice(0, 6).map((item, index) => {
    const announcement = item as Record<string, unknown>;
    const priorityRaw = String(announcement.priority ?? "LOW").toUpperCase();
    const priority = priorityRaw === "HIGH" || priorityRaw === "MEDIUM" ? priorityRaw : "LOW";
    return {
      id: String(announcement.id ?? index + 1),
      title: String(announcement.title ?? `Announcement ${index + 1}`),
      content: String(announcement.content ?? announcement.body ?? "No details provided."),
      priority,
      author: String(announcement.author ?? "AUY Office"),
      date: String(announcement.date ?? new Date().toISOString().slice(0, 10)),
      read: Boolean(announcement.read ?? announcement.isRead ?? false),
    };
  });

  const deadlines: Deadline[] = deadlinesRaw.slice(0, 6).map((item, index) => {
    const deadline = item as Record<string, unknown>;
    return {
      id: String(deadline.id ?? `deadline-${index + 1}`),
      icon: String(deadline.icon ?? ["ðŸ“", "âœï¸", "ðŸŽ“", "ðŸŽ‰", "ðŸ“Š", "ðŸ“‹"][index]),
      title: String(deadline.title ?? `Deadline ${index + 1}`),
      course: String(deadline.course ?? courses[index % courses.length]?.code ?? "TBA"),
      dueDate: String(deadline.dueDate ?? deadline.date ?? new Date().toISOString().slice(0, 10)),
      daysLeft: toNumber(deadline.daysLeft, index + 3),
      progress: toNumber(deadline.progress, 60),
    };
  });

  const attendanceByCourse: AttendanceCourseBreakdown[] =
    ((data.attendanceByCourse as unknown[]) ?? courses).map((item, index) => {
      const attendanceItem = item as Record<string, unknown>;
      const percentage = toNumber(attendanceItem.percentage ?? attendanceItem.attendance, courses[index]?.attendance ?? 90);
      return {
        code: String(attendanceItem.code ?? attendanceItem.courseCode ?? courses[index]?.code ?? `CRS${index + 1}`),
        percentage,
        present: toNumber(attendanceItem.present, 18),
        late: toNumber(attendanceItem.late, 1),
        absent: toNumber(attendanceItem.absent, 1),
      };
    });

  const students: StudentLite[] = studentsRaw.map((item, index) => {
    const student = item as Record<string, unknown>;
    return {
      id: String(student.id ?? student.studentId ?? `S${index + 1}`),
      name: String(student.name ?? student.fullName ?? `Student ${index + 1}`),
      email: String(student.email ?? `student${index + 1}@au.edu.mm`),
    };
  });

  const unreadAnnouncements = announcements.filter((item) => !item.read).length;

  return {
    studentId: String(profile.studentId ?? profile.id ?? fallback.studentId),
    fullName,
    firstName,
    email: String(profile.email ?? email),
    major: String(profile.major ?? "ISP program"),
    status: String(profile.status ?? "Active"),
    gpa: toNumber(profile.gpa, fallback.gpa),
    enrolledCoursesCount: toNumber(profile.enrolledCoursesCount ?? courses.length, courses.length),
    courses,
    attendance: {
      present: toNumber(attendanceRaw.present, fallback.attendance.present),
      late: toNumber(attendanceRaw.late, fallback.attendance.late),
      absent: toNumber(attendanceRaw.absent, fallback.attendance.absent),
    },
    attendanceByCourse,
    announcements,
    deadlines,
    students,
    unreadAnnouncements,
    daysUntilFinals: toNumber(data.daysUntilFinals, fallback.daysUntilFinals),
    semesterWeek: toNumber(data.semesterWeek, fallback.semesterWeek),
    semesterWeeksTotal: toNumber(data.semesterWeeksTotal, fallback.semesterWeeksTotal),
    creditsEnrolled: toNumber(data.creditsEnrolled, fallback.creditsEnrolled),
    completedCourses: toNumber(data.completedCourses, fallback.completedCourses),
    activeCourses: toNumber(data.activeCourses, fallback.activeCourses),
    canViewAllStudents: Boolean(data.canViewAllStudents ?? data.isAdmin ?? false),
    lastUpdatedAt: toNumber(data.lastUpdatedAt ?? data.timestamp, Date.now()),
  };
};

export const fetchStudentData = async (email: string): Promise<StudentDashboardData> => {
  try {
    const response = await requestAppsScript<unknown>({
      action: "getMyData",
      email,
    });
    return normalizeDashboardData(response, email);
  } catch {
    return defaultDashboardData(email);
  }
};

export const checkForUpdates = async (lastSync: number): Promise<UpdateCheckResponse> => {
  try {
    return await requestAppsScript<UpdateCheckResponse>({
      action: "checkUpdates",
      lastSync,
    });
  } catch {
    return { needsUpdate: true, timestamp: Date.now() };
  }
};

export const markAnnouncementAsRead = async (studentId: string, announcementId: string): Promise<boolean> => {
  try {
    await requestAppsScript({
      action: "markRead",
      studentId,
      announcementId,
    });
    return true;
  } catch {
    return false;
  }
};
