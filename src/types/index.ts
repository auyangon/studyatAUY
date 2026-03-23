export type NavigationPage = 
  | 'dashboard' 
  | 'courses' 
  | 'quests' 
  | 'materials' 
  | 'schedule' 
  | 'attendance' 
  | 'announcements' 
  | 'requests'
  | 'library';

export interface Student {
  email: string;
  studentId: string;
  studentName: string;
  major: string;
  studyMode: string;
  intake: string;
  status: string;
  gpa: string;
}

export interface Course {
  courseCode: string;
  courseName: string;
  credits: string;
  department: string;
  instructor: string;
  instructorEmail: string;
  googleClassroomLink: string;
  status: string;
}

export interface Enrollment {
  id: string;
  email: string;
  courseCode: string;
  semester: string;
  enrollmentStatus: string;
  grade: string;
  gpaPoints: string;
}

export interface Schedule {
  scheduleId: string;
  courseCode: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  zoomLink: string;
}

export interface Attendance {
  id: string;
  email: string;
  courseCode: string;
  date: string;
  status: string;
}

export interface Quest {
  questId: string;
  courseCode: string;
  title: string;
  description: string;
  type: string;
  dueDate: string;
  maxScore: string;
  status: string;
  createdAt: string;
}

export interface StudentQuest {
  id: string;
  email: string;
  questId: string;
  status: string;
  score: string;
  submissionLink: string;
  submittedAt: string;
  gradedAt: string;
  feedback: string;
}

export interface Announcement {
  announcementId: string;
  title: string;
  content: string;
  audience: string;
  courseCode: string;
  createdAt: string;
  createdBy: string;
}

export interface Request {
  requestId: string;
  email: string;
  type: string;
  status: string;
  submittedAt: string;
  resolvedAt: string;
  adminNote: string;
}

export interface Material {
  materialId: string;
  courseCode: string;
  title: string;
  type: string;
  fileUrl: string;
  week: string;
  uploadedBy: string;
  uploadDate: string;
}
