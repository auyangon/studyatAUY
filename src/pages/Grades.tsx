import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { GlassCard, SectionTitle } from '../components/Common';
import { Award, TrendingUp, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const Grades: React.FC = () => {
  const { user } = useAuth();
  const { courses, gpa, totalCredits, loading } = useData();

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-400';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    if (grade.startsWith('D')) return 'text-orange-400';
    if (grade === 'F') return 'text-red-400';
    return 'text-white/60';
  };

  const gradePoints: Record<string, number> = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const coursesWithGrades = courses.filter(c => c.grade);

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">Academic Progress</h2>
        <p className="text-white/60">Your grades and performance metrics</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl">
              <Award className="text-emerald-400" size={24} />
            </div>
            <div>
              <p className="text-white/40 text-sm">Current GPA</p>
              <p className="text-3xl font-bold text-white">{gpa.toFixed(2)}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <TrendingUp className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-white/40 text-sm">Total Credits</p>
              <p className="text-3xl font-bold text-white">{totalCredits}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <BookOpen className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-white/40 text-sm">Courses Completed</p>
              <p className="text-3xl font-bold text-white">{coursesWithGrades.length}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <GlassCard className="overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <SectionTitle>Grade Details</SectionTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/70 font-medium">Course</th>
                <th className="text-left p-4 text-white/70 font-medium">Code</th>
                <th className="text-left p-4 text-white/70 font-medium">Credits</th>
                <th className="text-left p-4 text-white/70 font-medium">Grade</th>
                <th className="text-left p-4 text-white/70 font-medium">Grade Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {coursesWithGrades.map((course, idx) => {
                const points = gradePoints[course.grade as keyof typeof gradePoints] || 0;
                
                return (
                  <motion.tr 
                    key={course.courseId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/5"
                  >
                    <td className="p-4 text-white">{course.name}</td>
                    <td className="p-4 text-white/60">{course.courseId}</td>
                    <td className="p-4 text-white/60">{course.credits}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 ${getGradeColor(course.grade)}`}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="p-4 text-white/60">{points.toFixed(1)}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};