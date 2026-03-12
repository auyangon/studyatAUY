// Complete student portal data based on the database structure

export interface Student {
  studentId: string;
  email: string;
  studentName: string;
  major: string;
  studyMode: string;
  status: string;
  softrRecordId: string;
}

export interface User {
  email: string;
  password: string;
  role: string;
}

export interface Enrollment {
  enrollmentId: string;
  studentId: string;
  studentName: string;
  email: string;
  studyMode: string;
  major: string;
  courseId: string;
  courseName: string;
  teacherName: string;
  credits: number;
  grade: string;
  googleClassroomLink: string;
  attendance: string;
  lastUpdated: string;
}

export interface Course {
  courseCode: string;
  courseName: string;
  credits: number;
  teacher: string;
  googleClassroomLink: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'high' | 'medium';
  category: 'Academic' | 'Holiday' | 'Facility' | 'Assignment';
  targetCourses: string;
}

export interface AttendanceSummary {
  studentId: string;
  courseId: string;
  totalClasses: number;
  present: number;
  late: number;
  absent: number;
  percentage: number;
  lastUpdated: string;
}

export interface StudentNotification {
  studentId: string;
  email: string;
  announcementId: number;
  read: boolean;
  readAt: string;
}

// Learning Materials Types
export interface LearningMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'ppt' | 'video' | 'image' | 'link' | 'folder';
  category: 'Lecture Notes' | 'Assignments' | 'Study Materials' | 'Past Papers' | 'Videos' | 'Resources';
  courseId: string;
  courseName: string;
  fileSize?: string;
  duration?: string;
  uploadedAt: string;
  url?: string;
  parentId?: string;
  description?: string;
}

// Timetable Types
export interface ClassSchedule {
  id: string;
  courseId: string;
  courseName: string;
  teacherName: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "09:00"
  endTime: string;   // "10:30"
  room: string;
  building: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  status: 'pending' | 'submitted' | 'overdue';
  maxScore: number;
}

// Student Data
export const students: Student[] = [
  { studentId: 'S001', email: 'aung.khant.phyo@student.au.edu.mm', studentName: 'Aung Khant Phyo', major: 'ISP program', studyMode: 'OnCampus', status: 'Active', softrRecordId: 'rec001' },
  { studentId: 'S002', email: 'hsu.eain.htet@student.au.edu.mm', studentName: 'Hsu Eain Htet', major: 'ISP program', studyMode: 'OnCampus', status: 'Active', softrRecordId: 'rec002' },
  { studentId: 'S003', email: 'kaung.sat@student.au.edu.mm', studentName: 'Kaung Sat', major: 'ISP program', studyMode: 'OnCampus', status: 'Active', softrRecordId: 'rec003' },
  { studentId: 'S004', email: 'myo.min@student.au.edu.mm', studentName: 'Myo Min', major: 'ISP program', studyMode: 'OnCampus', status: 'Active', softrRecordId: 'rec004' },
  { studentId: 'S024', email: 'chanmyae.au.edu.mm@gmail.com', studentName: 'Chan Myae', major: 'ISc program', studyMode: 'OnCampus', status: 'Active', softrRecordId: 'rec024' },
];

// User Credentials
export const users: User[] = [
  { email: 'aung.khant.phyo@student.au.edu.mm', password: 'student123', role: 'ISP program' },
  { email: 'hsu.eain.htet@student.au.edu.mm', password: 'student123', role: 'ISP program' },
  { email: 'kaung.sat@student.au.edu.mm', password: 'student123', role: 'ISP program' },
  { email: 'myo.min@student.au.edu.mm', password: 'student123', role: 'ISP program' },
  { email: 'chanmyae.au.edu.mm@gmail.com', password: 'student123', role: 'student' },
  { email: 'admin@au.edu.mm', password: 'admin123', role: 'admin' },
];

// Course Catalog
export const courses: Course[] = [
  { courseCode: 'BUS101', courseName: 'Introduction to Business', credits: 3.0, teacher: 'Prof. Johnson', googleClassroomLink: 'https://classroom.google.com/c/example1' },
  { courseCode: 'ENG101', courseName: 'English Composition', credits: 3.0, teacher: 'Dr. Smith', googleClassroomLink: 'https://classroom.google.com/c/example2' },
  { courseCode: 'HUM11', courseName: 'Humanities', credits: 3.0, teacher: 'Prof. Williams', googleClassroomLink: 'https://classroom.google.com/c/example3' },
  { courseCode: 'IT101', courseName: 'Introduction to IT', credits: 3.0, teacher: 'Dr. Brown', googleClassroomLink: 'https://classroom.google.com/c/example4' },
  { courseCode: 'MATH101', courseName: 'Mathematics', credits: 3.0, teacher: 'Prof. Davis', googleClassroomLink: 'https://classroom.google.com/c/example5' },
  { courseCode: 'STAT100', courseName: 'Statistics', credits: 3.0, teacher: 'Dr. Wilson', googleClassroomLink: 'https://classroom.google.com/c/example6' },
];

// Enrollments
export const enrollments: Enrollment[] = [
  // S001 - Aung Khant Phyo (All B grades)
  { enrollmentId: 'ENR00001', studentId: 'S001', studentName: 'Aung Khant Phyo', email: 'aung.khant.phyo@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'BUS101', courseName: 'Introduction to Business', teacherName: 'Prof. Johnson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example1', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00002', studentId: 'S001', studentName: 'Aung Khant Phyo', email: 'aung.khant.phyo@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'ENG101', courseName: 'English Composition', teacherName: 'Dr. Smith', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example2', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00003', studentId: 'S001', studentName: 'Aung Khant Phyo', email: 'aung.khant.phyo@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'HUM11', courseName: 'Humanities', teacherName: 'Prof. Williams', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example3', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00004', studentId: 'S001', studentName: 'Aung Khant Phyo', email: 'aung.khant.phyo@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example4', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00005', studentId: 'S001', studentName: 'Aung Khant Phyo', email: 'aung.khant.phyo@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example5', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00006', studentId: 'S001', studentName: 'Aung Khant Phyo', email: 'aung.khant.phyo@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example6', attendance: '', lastUpdated: '2026-02-22' },
  
  // S002 - Hsu Eain Htet (All B grades)
  { enrollmentId: 'ENR00007', studentId: 'S002', studentName: 'Hsu Eain Htet', email: 'hsu.eain.htet@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'BUS101', courseName: 'Introduction to Business', teacherName: 'Prof. Johnson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example1', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00008', studentId: 'S002', studentName: 'Hsu Eain Htet', email: 'hsu.eain.htet@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'ENG101', courseName: 'English Composition', teacherName: 'Dr. Smith', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example2', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00009', studentId: 'S002', studentName: 'Hsu Eain Htet', email: 'hsu.eain.htet@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'HUM11', courseName: 'Humanities', teacherName: 'Prof. Williams', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example3', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00010', studentId: 'S002', studentName: 'Hsu Eain Htet', email: 'hsu.eain.htet@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example4', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00011', studentId: 'S002', studentName: 'Hsu Eain Htet', email: 'hsu.eain.htet@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example5', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00012', studentId: 'S002', studentName: 'Hsu Eain Htet', email: 'hsu.eain.htet@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example6', attendance: '', lastUpdated: '2026-02-22' },

  // S003 - Kaung Sat (All B grades)
  { enrollmentId: 'ENR00013', studentId: 'S003', studentName: 'Kaung Sat', email: 'kaung.sat@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'BUS101', courseName: 'Introduction to Business', teacherName: 'Prof. Johnson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example1', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00014', studentId: 'S003', studentName: 'Kaung Sat', email: 'kaung.sat@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'ENG101', courseName: 'English Composition', teacherName: 'Dr. Smith', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example2', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00015', studentId: 'S003', studentName: 'Kaung Sat', email: 'kaung.sat@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'HUM11', courseName: 'Humanities', teacherName: 'Prof. Williams', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example3', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00016', studentId: 'S003', studentName: 'Kaung Sat', email: 'kaung.sat@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example4', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00017', studentId: 'S003', studentName: 'Kaung Sat', email: 'kaung.sat@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example5', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00018', studentId: 'S003', studentName: 'Kaung Sat', email: 'kaung.sat@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example6', attendance: '', lastUpdated: '2026-02-22' },

  // S004 - Myo Min (All B grades)
  { enrollmentId: 'ENR00019', studentId: 'S004', studentName: 'Myo Min', email: 'myo.min@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'BUS101', courseName: 'Introduction to Business', teacherName: 'Prof. Johnson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example1', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00020', studentId: 'S004', studentName: 'Myo Min', email: 'myo.min@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'ENG101', courseName: 'English Composition', teacherName: 'Dr. Smith', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example2', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00021', studentId: 'S004', studentName: 'Myo Min', email: 'myo.min@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'HUM11', courseName: 'Humanities', teacherName: 'Prof. Williams', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example3', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00022', studentId: 'S004', studentName: 'Myo Min', email: 'myo.min@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example4', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00023', studentId: 'S004', studentName: 'Myo Min', email: 'myo.min@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example5', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00024', studentId: 'S004', studentName: 'Myo Min', email: 'myo.min@student.au.edu.mm', studyMode: 'OnCampus', major: 'ISP program', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', credits: 3.0, grade: 'B', googleClassroomLink: 'https://classroom.google.com/c/example6', attendance: '', lastUpdated: '2026-02-22' },

  // S024 - Chan Myae (ISc program - C grades)
  { enrollmentId: 'ENR00073', studentId: 'S024', studentName: 'Chan Myae', email: 'chanmyae.au.edu.mm@gmail.com', studyMode: 'OnCampus', major: 'ISc program', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', credits: 3.0, grade: 'C', googleClassroomLink: 'https://classroom.google.com/c/example4', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00074', studentId: 'S024', studentName: 'Chan Myae', email: 'chanmyae.au.edu.mm@gmail.com', studyMode: 'OnCampus', major: 'ISc program', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', credits: 3.0, grade: 'C', googleClassroomLink: 'https://classroom.google.com/c/example5', attendance: '', lastUpdated: '2026-02-22' },
  { enrollmentId: 'ENR00075', studentId: 'S024', studentName: 'Chan Myae', email: 'chanmyae.au.edu.mm@gmail.com', studyMode: 'OnCampus', major: 'ISc program', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', credits: 3.0, grade: 'C', googleClassroomLink: 'https://classroom.google.com/c/example6', attendance: '', lastUpdated: '2026-02-22' },
];

// Announcements
export const announcements: Announcement[] = [
  { id: 1, title: '🎓 Final Exam Schedule', content: 'Dear students, the final examination schedule has been released. Please check your student portal for your individual exam timetable. All exams will be conducted on campus as per the scheduled dates.', date: '2026-03-15T10:30:00', author: 'Academic Office', priority: 'high', category: 'Academic', targetCourses: 'ALL' },
  { id: 2, title: '🎉 Thingyan Holiday Notice', content: 'University will be closed for Thingyan Holiday from April 13-16, 2026. Classes will resume on April 17. Have a safe and happy Water Festival!', date: '2026-03-10T08:00:00', author: 'Administration', priority: 'high', category: 'Holiday', targetCourses: 'ALL' },
  { id: 3, title: '📚 Library Hours Update', content: 'The main library will extend its operating hours during the exam period. Opening hours: 7:00 AM - 10:00 PM starting from March 20.', date: '2026-03-08T14:00:00', author: 'Library Services', priority: 'medium', category: 'Facility', targetCourses: 'ALL' },
  { id: 4, title: '📝 BUS101 Assignment Due', content: 'Reminder: The Group Project for BUS101 is due next Friday. Please submit your presentations via Google Classroom before the deadline.', date: '2026-03-12T09:00:00', author: 'Prof. Johnson', priority: 'high', category: 'Assignment', targetCourses: 'BUS101' },
  { id: 5, title: '🔬 ENG101 Essay Guidelines', content: 'Please find attached the detailed guidelines for your mid-term essay. Word count: 1500-2000 words. Due date: March 25, 2026.', date: '2026-03-11T11:30:00', author: 'Dr. Smith', priority: 'medium', category: 'Academic', targetCourses: 'ENG101' },
  { id: 6, title: '💻 IT101 Lab Session', content: 'New lab exercises have been uploaded. Please complete exercises 5-7 before next week\'s lab session.', date: '2026-03-09T16:00:00', author: 'Dr. Brown', priority: 'medium', category: 'Assignment', targetCourses: 'IT101' },
];

// Attendance Summary
export const attendanceSummary: AttendanceSummary[] = [
  // S001 - Aung Khant Phyo
  { studentId: 'S001', courseId: 'BUS101', totalClasses: 30, present: 26, late: 2, absent: 2, percentage: 0.8667, lastUpdated: '2026-03-10' },
  { studentId: 'S001', courseId: 'ENG101', totalClasses: 28, present: 27, late: 1, absent: 0, percentage: 0.9643, lastUpdated: '2026-03-10' },
  { studentId: 'S001', courseId: 'HUM11', totalClasses: 25, present: 23, late: 1, absent: 1, percentage: 0.9200, lastUpdated: '2026-03-10' },
  { studentId: 'S001', courseId: 'IT101', totalClasses: 30, present: 28, late: 1, absent: 1, percentage: 0.9333, lastUpdated: '2026-03-10' },
  { studentId: 'S001', courseId: 'MATH101', totalClasses: 28, present: 26, late: 1, absent: 1, percentage: 0.9286, lastUpdated: '2026-03-10' },
  { studentId: 'S001', courseId: 'STAT100', totalClasses: 26, present: 24, late: 1, absent: 1, percentage: 0.9231, lastUpdated: '2026-03-10' },

  // S002 - Hsu Eain Htet
  { studentId: 'S002', courseId: 'BUS101', totalClasses: 30, present: 28, late: 1, absent: 1, percentage: 0.9333, lastUpdated: '2026-03-10' },
  { studentId: 'S002', courseId: 'ENG101', totalClasses: 28, present: 26, late: 1, absent: 1, percentage: 0.9286, lastUpdated: '2026-03-10' },
  { studentId: 'S002', courseId: 'HUM11', totalClasses: 25, present: 23, late: 1, absent: 1, percentage: 0.9200, lastUpdated: '2026-03-10' },
  { studentId: 'S002', courseId: 'IT101', totalClasses: 30, present: 27, late: 2, absent: 1, percentage: 0.9000, lastUpdated: '2026-03-10' },
  { studentId: 'S002', courseId: 'MATH101', totalClasses: 28, present: 25, late: 2, absent: 1, percentage: 0.8929, lastUpdated: '2026-03-10' },
  { studentId: 'S002', courseId: 'STAT100', totalClasses: 26, present: 24, late: 1, absent: 1, percentage: 0.9231, lastUpdated: '2026-03-10' },

  // S003 - Kaung Sat
  { studentId: 'S003', courseId: 'BUS101', totalClasses: 30, present: 25, late: 2, absent: 3, percentage: 0.8333, lastUpdated: '2026-03-10' },
  { studentId: 'S003', courseId: 'ENG101', totalClasses: 28, present: 24, late: 2, absent: 2, percentage: 0.8571, lastUpdated: '2026-03-10' },
  { studentId: 'S003', courseId: 'HUM11', totalClasses: 25, present: 22, late: 1, absent: 2, percentage: 0.8800, lastUpdated: '2026-03-10' },
  { studentId: 'S003', courseId: 'IT101', totalClasses: 30, present: 26, late: 2, absent: 2, percentage: 0.8667, lastUpdated: '2026-03-10' },
  { studentId: 'S003', courseId: 'MATH101', totalClasses: 28, present: 23, late: 3, absent: 2, percentage: 0.8214, lastUpdated: '2026-03-10' },
  { studentId: 'S003', courseId: 'STAT100', totalClasses: 26, present: 21, late: 2, absent: 3, percentage: 0.8077, lastUpdated: '2026-03-10' },

  // S004 - Myo Min
  { studentId: 'S004', courseId: 'BUS101', totalClasses: 30, present: 27, late: 2, absent: 1, percentage: 0.9000, lastUpdated: '2026-03-10' },
  { studentId: 'S004', courseId: 'ENG101', totalClasses: 28, present: 25, late: 2, absent: 1, percentage: 0.8929, lastUpdated: '2026-03-10' },
  { studentId: 'S004', courseId: 'HUM11', totalClasses: 25, present: 23, late: 1, absent: 1, percentage: 0.9200, lastUpdated: '2026-03-10' },
  { studentId: 'S004', courseId: 'IT101', totalClasses: 30, present: 28, late: 1, absent: 1, percentage: 0.9333, lastUpdated: '2026-03-10' },
  { studentId: 'S004', courseId: 'MATH101', totalClasses: 28, present: 26, late: 1, absent: 1, percentage: 0.9286, lastUpdated: '2026-03-10' },
  { studentId: 'S004', courseId: 'STAT100', totalClasses: 26, present: 24, late: 1, absent: 1, percentage: 0.9231, lastUpdated: '2026-03-10' },

  // S024 - Chan Myae
  { studentId: 'S024', courseId: 'IT101', totalClasses: 30, present: 18, late: 4, absent: 8, percentage: 0.6000, lastUpdated: '2026-03-10' },
  { studentId: 'S024', courseId: 'MATH101', totalClasses: 28, present: 17, late: 3, absent: 8, percentage: 0.6071, lastUpdated: '2026-03-10' },
  { studentId: 'S024', courseId: 'STAT100', totalClasses: 26, present: 16, late: 3, absent: 7, percentage: 0.6154, lastUpdated: '2026-03-10' },
];

// Learning Materials Data
export const learningMaterials: LearningMaterial[] = [
  // BUS101 Materials
  { id: 'LM001', title: 'Introduction to Business', type: 'folder', category: 'Lecture Notes', courseId: 'BUS101', courseName: 'Introduction to Business', uploadedAt: '2026-01-15' },
  { id: 'LM002', title: 'Chapter 1 - Business Environment', type: 'pdf', category: 'Lecture Notes', courseId: 'BUS101', courseName: 'Introduction to Business', fileSize: '2.4 MB', uploadedAt: '2026-01-16', parentId: 'LM001' },
  { id: 'LM003', title: 'Chapter 2 - Management Principles', type: 'pdf', category: 'Lecture Notes', courseId: 'BUS101', courseName: 'Introduction to Business', fileSize: '3.1 MB', uploadedAt: '2026-01-23', parentId: 'LM001' },
  { id: 'LM004', title: 'Chapter 3 - Marketing Basics', type: 'pdf', category: 'Lecture Notes', courseId: 'BUS101', courseName: 'Introduction to Business', fileSize: '2.8 MB', uploadedAt: '2026-01-30', parentId: 'LM001' },
  { id: 'LM005', title: 'Group Project Guidelines', type: 'pdf', category: 'Assignments', courseId: 'BUS101', courseName: 'Introduction to Business', fileSize: '1.2 MB', uploadedAt: '2026-02-10' },
  { id: 'LM006', title: 'Business Case Studies', type: 'pdf', category: 'Study Materials', courseId: 'BUS101', courseName: 'Introduction to Business', fileSize: '5.6 MB', uploadedAt: '2026-02-15' },
  { id: 'LM007', title: 'Midterm Exam Past Paper', type: 'pdf', category: 'Past Papers', courseId: 'BUS101', courseName: 'Introduction to Business', fileSize: '890 KB', uploadedAt: '2026-02-20' },
  { id: 'LM008', title: 'Lecture Recording - Week 1', type: 'video', category: 'Videos', courseId: 'BUS101', courseName: 'Introduction to Business', duration: '1:23:45', uploadedAt: '2026-01-17' },

  // ENG101 Materials
  { id: 'LM009', title: 'English Composition', type: 'folder', category: 'Lecture Notes', courseId: 'ENG101', courseName: 'English Composition', uploadedAt: '2026-01-15' },
  { id: 'LM010', title: 'Essay Writing Guide', type: 'pdf', category: 'Lecture Notes', courseId: 'ENG101', courseName: 'English Composition', fileSize: '1.8 MB', uploadedAt: '2026-01-18', parentId: 'LM009' },
  { id: 'LM011', title: 'Grammar Review', type: 'pdf', category: 'Study Materials', courseId: 'ENG101', courseName: 'English Composition', fileSize: '2.1 MB', uploadedAt: '2026-01-25' },
  { id: 'LM012', title: 'Mid-term Essay Guidelines', type: 'pdf', category: 'Assignments', courseId: 'ENG101', courseName: 'English Composition', fileSize: '950 KB', uploadedAt: '2026-02-05' },
  { id: 'LM013', title: 'Sample Essays Collection', type: 'pdf', category: 'Study Materials', courseId: 'ENG101', courseName: 'English Composition', fileSize: '3.4 MB', uploadedAt: '2026-02-12' },
  { id: 'LM014', title: 'Vocabulary List', type: 'pdf', category: 'Resources', courseId: 'ENG101', courseName: 'English Composition', fileSize: '450 KB', uploadedAt: '2026-01-20' },

  // HUM11 Materials
  { id: 'LM015', title: 'Humanities Course Materials', type: 'folder', category: 'Lecture Notes', courseId: 'HUM11', courseName: 'Humanities', uploadedAt: '2026-01-15' },
  { id: 'LM016', title: 'World History Overview', type: 'pdf', category: 'Lecture Notes', courseId: 'HUM11', courseName: 'Humanities', fileSize: '4.2 MB', uploadedAt: '2026-01-19', parentId: 'LM015' },
  { id: 'LM017', title: 'Philosophy Basics', type: 'pdf', category: 'Lecture Notes', courseId: 'HUM11', courseName: 'Humanities', fileSize: '2.9 MB', uploadedAt: '2026-01-26', parentId: 'LM015' },
  { id: 'LM018', title: 'Research Project', type: 'pdf', category: 'Assignments', courseId: 'HUM11', courseName: 'Humanities', fileSize: '1.1 MB', uploadedAt: '2026-02-08' },

  // IT101 Materials
  { id: 'LM019', title: 'IT Fundamentals', type: 'folder', category: 'Lecture Notes', courseId: 'IT101', courseName: 'Introduction to IT', uploadedAt: '2026-01-15' },
  { id: 'LM020', title: 'Computer Basics', type: 'pdf', category: 'Lecture Notes', courseId: 'IT101', courseName: 'Introduction to IT', fileSize: '3.5 MB', uploadedAt: '2026-01-17', parentId: 'LM019' },
  { id: 'LM021', title: 'Programming Introduction', type: 'pdf', category: 'Lecture Notes', courseId: 'IT101', courseName: 'Introduction to IT', fileSize: '4.1 MB', uploadedAt: '2026-01-24', parentId: 'LM019' },
  { id: 'LM022', title: 'Lab Exercises 1-4', type: 'pdf', category: 'Assignments', courseId: 'IT101', courseName: 'Introduction to IT', fileSize: '1.8 MB', uploadedAt: '2026-02-01' },
  { id: 'LM023', title: 'Lab Exercises 5-7', type: 'pdf', category: 'Assignments', courseId: 'IT101', courseName: 'Introduction to IT', fileSize: '2.2 MB', uploadedAt: '2026-02-15' },
  { id: 'LM024', title: 'Python Tutorial Video', type: 'video', category: 'Videos', courseId: 'IT101', courseName: 'Introduction to IT', duration: '45:30', uploadedAt: '2026-02-10' },
  { id: 'LM025', title: 'Previous Midterm Exam', type: 'pdf', category: 'Past Papers', courseId: 'IT101', courseName: 'Introduction to IT', fileSize: '1.5 MB', uploadedAt: '2026-02-18' },

  // MATH101 Materials
  { id: 'LM026', title: 'Mathematics Lectures', type: 'folder', category: 'Lecture Notes', courseId: 'MATH101', courseName: 'Mathematics', uploadedAt: '2026-01-15' },
  { id: 'LM027', title: 'Algebra Basics', type: 'pdf', category: 'Lecture Notes', courseId: 'MATH101', courseName: 'Mathematics', fileSize: '2.7 MB', uploadedAt: '2026-01-18', parentId: 'LM026' },
  { id: 'LM028', title: 'Calculus Introduction', type: 'pdf', category: 'Lecture Notes', courseId: 'MATH101', courseName: 'Mathematics', fileSize: '3.8 MB', uploadedAt: '2026-01-25', parentId: 'LM026' },
  { id: 'LM029', title: 'Problem Set 1', type: 'pdf', category: 'Assignments', courseId: 'MATH101', courseName: 'Mathematics', fileSize: '980 KB', uploadedAt: '2026-02-02' },
  { id: 'LM030', title: 'Problem Set 2', type: 'pdf', category: 'Assignments', courseId: 'MATH101', courseName: 'Mathematics', fileSize: '1.1 MB', uploadedAt: '2026-02-16' },
  { id: 'LM031', title: 'Formula Sheet', type: 'pdf', category: 'Resources', courseId: 'MATH101', courseName: 'Mathematics', fileSize: '320 KB', uploadedAt: '2026-02-20' },

  // STAT100 Materials
  { id: 'LM032', title: 'Statistics Materials', type: 'folder', category: 'Lecture Notes', courseId: 'STAT100', courseName: 'Statistics', uploadedAt: '2026-01-15' },
  { id: 'LM033', title: 'Descriptive Statistics', type: 'pdf', category: 'Lecture Notes', courseId: 'STAT100', courseName: 'Statistics', fileSize: '2.5 MB', uploadedAt: '2026-01-19', parentId: 'LM032' },
  { id: 'LM034', title: 'Probability Basics', type: 'pdf', category: 'Lecture Notes', courseId: 'STAT100', courseName: 'Statistics', fileSize: '3.2 MB', uploadedAt: '2026-01-26', parentId: 'LM032' },
  { id: 'LM035', title: 'Data Analysis Lab', type: 'pdf', category: 'Assignments', courseId: 'STAT100', courseName: 'Statistics', fileSize: '1.4 MB', uploadedAt: '2026-02-05' },
  { id: 'LM036', title: 'SPSS Tutorial', type: 'video', category: 'Videos', courseId: 'STAT100', courseName: 'Statistics', duration: '1:05:00', uploadedAt: '2026-02-12' },
];

// Class Schedule Data
export const classSchedules: ClassSchedule[] = [
  // S001 - Aung Khant Phyo
  { id: 'SCH001', courseId: 'BUS101', courseName: 'Introduction to Business', teacherName: 'Prof. Johnson', dayOfWeek: 1, startTime: '09:00', endTime: '10:30', room: 'Room 101', building: 'Business Building', type: 'Lecture' },
  { id: 'SCH002', courseId: 'ENG101', courseName: 'English Composition', teacherName: 'Dr. Smith', dayOfWeek: 1, startTime: '11:00', endTime: '12:30', room: 'Room 205', building: 'Liberal Arts Building', type: 'Lecture' },
  { id: 'SCH003', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', dayOfWeek: 2, startTime: '09:00', endTime: '10:30', room: 'Room 301', building: 'Science Building', type: 'Lecture' },
  { id: 'SCH004', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', dayOfWeek: 2, startTime: '14:00', endTime: '15:30', room: 'Lab 102', building: 'IT Center', type: 'Lab' },
  { id: 'SCH005', courseId: 'HUM11', courseName: 'Humanities', teacherName: 'Prof. Williams', dayOfWeek: 3, startTime: '10:00', endTime: '11:30', room: 'Room 110', building: 'Liberal Arts Building', type: 'Lecture' },
  { id: 'SCH006', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', dayOfWeek: 3, startTime: '13:00', endTime: '14:30', room: 'Room 302', building: 'Science Building', type: 'Lecture' },
  { id: 'SCH007', courseId: 'BUS101', courseName: 'Introduction to Business', teacherName: 'Prof. Johnson', dayOfWeek: 4, startTime: '09:00', endTime: '10:30', room: 'Room 101', building: 'Business Building', type: 'Tutorial' },
  { id: 'SCH008', courseId: 'ENG101', courseName: 'English Composition', teacherName: 'Dr. Smith', dayOfWeek: 4, startTime: '11:00', endTime: '12:30', room: 'Room 205', building: 'Liberal Arts Building', type: 'Tutorial' },
  { id: 'SCH009', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', dayOfWeek: 5, startTime: '09:00', endTime: '10:30', room: 'Lab 102', building: 'IT Center', type: 'Lab' },

  // S002 - Hsu Eain Htet (same schedule as S001)
  { id: 'SCH010', courseId: 'BUS101', courseName: 'Introduction to Business', teacherName: 'Prof. Johnson', dayOfWeek: 1, startTime: '09:00', endTime: '10:30', room: 'Room 101', building: 'Business Building', type: 'Lecture' },
  { id: 'SCH011', courseId: 'ENG101', courseName: 'English Composition', teacherName: 'Dr. Smith', dayOfWeek: 1, startTime: '11:00', endTime: '12:30', room: 'Room 205', building: 'Liberal Arts Building', type: 'Lecture' },
  { id: 'SCH012', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', dayOfWeek: 2, startTime: '09:00', endTime: '10:30', room: 'Room 301', building: 'Science Building', type: 'Lecture' },
  { id: 'SCH013', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', dayOfWeek: 2, startTime: '14:00', endTime: '15:30', room: 'Lab 102', building: 'IT Center', type: 'Lab' },
  { id: 'SCH014', courseId: 'HUM11', courseName: 'Humanities', teacherName: 'Prof. Williams', dayOfWeek: 3, startTime: '10:00', endTime: '11:30', room: 'Room 110', building: 'Liberal Arts Building', type: 'Lecture' },
  { id: 'SCH015', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', dayOfWeek: 3, startTime: '13:00', endTime: '14:30', room: 'Room 302', building: 'Science Building', type: 'Lecture' },

  // S024 - Chan Myae (ISc program - different schedule)
  { id: 'SCH016', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', dayOfWeek: 1, startTime: '14:00', endTime: '15:30', room: 'Lab 102', building: 'IT Center', type: 'Lab' },
  { id: 'SCH017', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', dayOfWeek: 2, startTime: '10:00', endTime: '11:30', room: 'Room 301', building: 'Science Building', type: 'Lecture' },
  { id: 'SCH018', courseId: 'STAT100', courseName: 'Statistics', teacherName: 'Dr. Wilson', dayOfWeek: 3, startTime: '09:00', endTime: '10:30', room: 'Room 302', building: 'Science Building', type: 'Lecture' },
  { id: 'SCH019', courseId: 'IT101', courseName: 'Introduction to IT', teacherName: 'Dr. Brown', dayOfWeek: 4, startTime: '14:00', endTime: '15:30', room: 'Lab 102', building: 'IT Center', type: 'Lab' },
  { id: 'SCH020', courseId: 'MATH101', courseName: 'Mathematics', teacherName: 'Prof. Davis', dayOfWeek: 5, startTime: '10:00', endTime: '11:30', room: 'Room 301', building: 'Science Building', type: 'Tutorial' },
];

// Assignments Data
export const assignments: Assignment[] = [
  { id: 'ASG001', courseId: 'BUS101', courseName: 'Introduction to Business', title: 'Group Project', description: 'Create a comprehensive business plan for a startup company', dueDate: '2026-03-20', dueTime: '23:59', status: 'pending', maxScore: 100 },
  { id: 'ASG002', courseId: 'ENG101', courseName: 'English Composition', title: 'Mid-term Essay', description: 'Write a 1500-2000 word argumentative essay on a chosen topic', dueDate: '2026-03-25', dueTime: '23:59', status: 'pending', maxScore: 100 },
  { id: 'ASG003', courseId: 'IT101', courseName: 'Introduction to IT', title: 'Programming Assignment', description: 'Complete exercises 5-7 from the lab manual', dueDate: '2026-03-18', dueTime: '17:00', status: 'pending', maxScore: 50 },
  { id: 'ASG004', courseId: 'MATH101', courseName: 'Mathematics', title: 'Problem Set 2', description: 'Complete all problems from Chapter 3', dueDate: '2026-03-22', dueTime: '23:59', status: 'pending', maxScore: 30 },
  { id: 'ASG005', courseId: 'HUM11', courseName: 'Humanities', title: 'Research Project', description: 'Research paper on a historical event of your choice', dueDate: '2026-04-01', dueTime: '23:59', status: 'pending', maxScore: 100 },
  { id: 'ASG006', courseId: 'STAT100', courseName: 'Statistics', title: 'Data Analysis Lab', description: 'Analyze the provided dataset using SPSS', dueDate: '2026-03-15', dueTime: '23:59', status: 'submitted', maxScore: 50 },
  { id: 'ASG007', courseId: 'BUS101', courseName: 'Introduction to Business', title: 'Case Study', description: 'Analyze the case study provided in class', dueDate: '2026-03-28', dueTime: '23:59', status: 'pending', maxScore: 30 },
  { id: 'ASG008', courseId: 'ENG101', courseName: 'English Composition', title: 'Presentation', description: 'Prepare a 10-minute oral presentation', dueDate: '2026-04-05', dueTime: '14:00', status: 'pending', maxScore: 50 },
];

// Student Notifications (initially all unread)
export const studentNotifications: StudentNotification[] = [
  // S001 - Aung Khant Phyo
  { studentId: 'S001', email: 'aung.khant.phyo@student.au.edu.mm', announcementId: 1, read: false, readAt: '' },
  { studentId: 'S001', email: 'aung.khant.phyo@student.au.edu.mm', announcementId: 2, read: false, readAt: '' },
  { studentId: 'S001', email: 'aung.khant.phyo@student.au.edu.mm', announcementId: 3, read: true, readAt: '2026-03-12' },
  { studentId: 'S001', email: 'aung.khant.phyo@student.au.edu.mm', announcementId: 4, read: false, readAt: '' },
  { studentId: 'S001', email: 'aung.khant.phyo@student.au.edu.mm', announcementId: 5, read: true, readAt: '2026-03-11' },
  { studentId: 'S001', email: 'aung.khant.phyo@student.au.edu.mm', announcementId: 6, read: true, readAt: '2026-03-10' },

  // S002 - Hsu Eain Htet
  { studentId: 'S002', email: 'hsu.eain.htet@student.au.edu.mm', announcementId: 1, read: false, readAt: '' },
  { studentId: 'S002', email: 'hsu.eain.htet@student.au.edu.mm', announcementId: 2, read: false, readAt: '' },
  { studentId: 'S002', email: 'hsu.eain.htet@student.au.edu.mm', announcementId: 4, read: false, readAt: '' },
  { studentId: 'S002', email: 'hsu.eain.htet@student.au.edu.mm', announcementId: 5, read: false, readAt: '' },

  // S024 - Chan Myae
  { studentId: 'S024', email: 'chanmyae.au.edu.mm@gmail.com', announcementId: 1, read: false, readAt: '' },
  { studentId: 'S024', email: 'chanmyae.au.edu.mm@gmail.com', announcementId: 2, read: false, readAt: '' },
  { studentId: 'S024', email: 'chanmyae.au.edu.mm@gmail.com', announcementId: 3, read: true, readAt: '2026-03-12' },
];

// Helper functions
export const getGradePoints = (grade: string): number => {
  const gradeMap: { [key: string]: number } = {
    'A': 4.0, 'A+': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0
  };
  return gradeMap[grade] || 0;
};

export const calculateGPA = (studentEnrollments: Enrollment[]): number => {
  if (studentEnrollments.length === 0) return 0;
  let totalPoints = 0;
  let totalCredits = 0;
  studentEnrollments.forEach(enrollment => {
    totalPoints += getGradePoints(enrollment.grade) * enrollment.credits;
    totalCredits += enrollment.credits;
  });
  return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
};

// Validation and lookup functions
export const validateUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getStudentProfile = (email: string): Student | undefined => {
  return students.find(student => student.email === email);
};

export const getStudentEnrollments = (email: string): Enrollment[] => {
  return enrollments.filter(enrollment => enrollment.email === email);
};

export const getStudentAttendance = (studentId: string): AttendanceSummary[] => {
  return attendanceSummary.filter(attendance => attendance.studentId === studentId);
};

export const getStudentAnnouncements = (email: string): { announcement: Announcement; isRead: boolean; notificationId: number }[] => {
  const studentEnrollments = getStudentEnrollments(email);
  const studentCourseIds = studentEnrollments.map(e => e.courseId);
  const studentNotifs = studentNotifications.filter(n => n.email === email);

  return announcements
    .filter(announcement => {
      if (announcement.targetCourses === 'ALL') return true;
      return studentCourseIds.includes(announcement.targetCourses);
    })
    .map(announcement => {
      const notification = studentNotifs.find(n => n.announcementId === announcement.id);
      return {
        announcement,
        isRead: notification?.read || false,
        notificationId: notification?.announcementId || announcement.id
      };
    })
    .sort((a, b) => new Date(b.announcement.date).getTime() - new Date(a.announcement.date).getTime());
};

export const getUnreadAnnouncementCount = (email: string): number => {
  const studentNotifs = studentNotifications.filter(n => n.email === email);
  const studentEnrollments = getStudentEnrollments(email);
  const studentCourseIds = studentEnrollments.map(e => e.courseId);
  
  return announcements
    .filter(announcement => {
      if (announcement.targetCourses === 'ALL') return true;
      return studentCourseIds.includes(announcement.targetCourses);
    })
    .filter(announcement => {
      const notification = studentNotifs.find(n => n.announcementId === announcement.id);
      return !notification?.read;
    }).length;
};

export const getStudentNotifications = (email: string): StudentNotification[] => {
  return studentNotifications.filter(n => n.email === email);
};

export const markAnnouncementAsRead = (email: string, announcementId: number): void => {
  const notification = studentNotifications.find(n => n.email === email && n.announcementId === announcementId);
  if (notification) {
    notification.read = true;
    notification.readAt = new Date().toISOString().split('T')[0];
  }
};

// Learning Materials helper functions
export const getStudentMaterials = (email: string): LearningMaterial[] => {
  const studentEnrollments = getStudentEnrollments(email);
  const studentCourseIds = studentEnrollments.map(e => e.courseId);
  return learningMaterials.filter(m => studentCourseIds.includes(m.courseId));
};

export const getMaterialsByCategory = (email: string, category: string): LearningMaterial[] => {
  const studentMaterials = getStudentMaterials(email);
  return studentMaterials.filter(m => m.category === category);
};

export const getMaterialsByCourse = (email: string, courseId: string): LearningMaterial[] => {
  const studentMaterials = getStudentMaterials(email);
  return studentMaterials.filter(m => m.courseId === courseId);
};

// Timetable helper functions
export const getStudentSchedule = (email: string): ClassSchedule[] => {
  const studentEnrollments = getStudentEnrollments(email);
  const studentCourseIds = studentEnrollments.map(e => e.courseId);
  return classSchedules.filter(s => studentCourseIds.includes(s.courseId));
};

export const getTodayClasses = (email: string): ClassSchedule[] => {
  const schedule = getStudentSchedule(email);
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  return schedule.filter(s => s.dayOfWeek === today).sort((a, b) => a.startTime.localeCompare(b.startTime));
};

export const getWeekSchedule = (email: string): { [key: number]: ClassSchedule[] } => {
  const schedule = getStudentSchedule(email);
  const weekSchedule: { [key: number]: ClassSchedule[] } = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  };
  schedule.forEach(s => {
    weekSchedule[s.dayOfWeek].push(s);
  });
  // Sort each day's classes by start time
  Object.keys(weekSchedule).forEach(day => {
    weekSchedule[parseInt(day)].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });
  return weekSchedule;
};

export const getStudentAssignments = (email: string): Assignment[] => {
  const studentEnrollments = getStudentEnrollments(email);
  const studentCourseIds = studentEnrollments.map(e => e.courseId);
  return assignments
    .filter(a => studentCourseIds.includes(a.courseId))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

export const getUpcomingAssignments = (email: string, days: number = 7): Assignment[] => {
  const studentAssignments = getStudentAssignments(email);
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return studentAssignments
    .filter(a => {
      const dueDate = new Date(a.dueDate);
      return dueDate >= now && dueDate <= futureDate && a.status !== 'submitted';
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};
