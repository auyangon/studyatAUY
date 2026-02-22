import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { GlassCard, SectionTitle } from '../components/Common';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const Progress: React.FC = () => {
  const { user } = useAuth();
  const { gpa, totalCredits, attendance, courses } = useData();

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">Academic Progress</h2>
        <p className="text-white/60">Track your journey to graduation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl">
              <Target className="text-emerald-400" size={24} />
            </div>
            <div>
              <p className="text-white/40 text-sm">Credits Goal</p>
              <p className="text-2xl font-bold text-white">{totalCredits}/124</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(totalCredits / 124) * 100}%` }} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <TrendingUp className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-white/40 text-sm">Current GPA</p>
              <p className="text-2xl font-bold text-white">{gpa.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(gpa / 4) * 100}%` }} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <Calendar className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-white/40 text-sm">Attendance</p>
              <p className="text-2xl font-bold text-white">{attendance}%</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-400 rounded-full" style={{ width: `${attendance}%` }} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl">
              <Award className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-white/40 text-sm">Courses Done</p>
              <p className="text-2xl font-bold text-white">{courses.length}/40</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(courses.length / 40) * 100}%` }} />
          </div>
        </GlassCard>
      </div>
    </div>
  );
};