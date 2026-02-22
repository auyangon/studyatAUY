import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard, SectionTitle } from '../components/Common';
import { FileText, Video, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const Materials: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">Study Materials</h2>
        <p className="text-white/60">Access course resources and downloads</p>
      </header>

      <GlassCard className="p-6">
        <p className="text-white/70">Materials will appear here once courses have uploaded files.</p>
      </GlassCard>
    </div>
  );
};