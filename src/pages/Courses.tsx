import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { GlassCard } from '../components/Common';
import { BookOpen, Clock, User, ExternalLink, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const Courses: React.FC = () => {
  const { user } = useAuth();
  const { courses, loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">My Courses</h2>
        <p className="text-white/60">Spring Semester 2026</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <motion.div
            key={course.courseId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="p-6 h-full flex flex-col hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-2xl">
                  <BookOpen className="text-emerald-400" size={24} />
                </div>
                <span className="text-white/40 text-sm">{course.courseId}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{course.name}</h3>
              
              <div className="space-y-2 text-white/60 text-sm mb-4 flex-1">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>{course.teacherName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{course.credits} credits</span>
                </div>
                {course.grade && (
                  <div className="flex items-center gap-2 mt-2">
                    <Award size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Current Grade: {course.grade}</span>
                  </div>
                )}
              </div>

              <a
                href={course.googleClassroomLink || `https://classroom.google.com/c/${course.courseId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white/90 transition"
              >
                Open Classroom <ExternalLink size={16} />
              </a>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};