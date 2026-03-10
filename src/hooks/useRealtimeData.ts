import { useCallback, useEffect, useMemo, useState } from "react";
import {
  checkForUpdates,
  fetchStudentData,
  markAnnouncementAsRead,
  type StudentDashboardData,
} from "@/lib/googleSheets";

type RealtimeState = {
  data: StudentDashboardData | null;
  loading: boolean;
  syncing: boolean;
  error: string | null;
  lastSync: number;
};

export const useRealtimeData = (email: string | null) => {
  const [state, setState] = useState<RealtimeState>({
    data: null,
    loading: true,
    syncing: false,
    error: null,
    lastSync: 0,
  });

  const loadData = useCallback(
    async (targetEmail: string, isSync = false) => {
      setState((prev) => ({
        ...prev,
        loading: isSync ? prev.loading : true,
        syncing: isSync,
        error: null,
      }));

      try {
        const data = await fetchStudentData(targetEmail);
        setState((prev) => ({
          ...prev,
          data,
          loading: false,
          syncing: false,
          lastSync: Date.now(),
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          syncing: false,
          error: error instanceof Error ? error.message : "Failed to load student data",
        }));
      }
    },
    []
  );

  useEffect(() => {
    if (!email) {
      setState({
        data: null,
        loading: false,
        syncing: false,
        error: null,
        lastSync: 0,
      });
      return;
    }

    void loadData(email);
  }, [email, loadData]);

  useEffect(() => {
    if (!email) {
      return;
    }

    const timer = window.setInterval(async () => {
      const currentLastSync = state.lastSync || Date.now() - 30000;
      const update = await checkForUpdates(currentLastSync);
      if (update.needsUpdate) {
        await loadData(email, true);
      }
    }, 30000);

    return () => window.clearInterval(timer);
  }, [email, state.lastSync, loadData]);

  const refresh = useCallback(async () => {
    if (!email) {
      return;
    }
    await loadData(email, true);
  }, [email, loadData]);

  const markRead = useCallback(
    async (announcementId: string) => {
      if (!state.data) {
        return;
      }

      const success = await markAnnouncementAsRead(state.data.studentId, announcementId);
      if (!success) {
        return;
      }

      setState((prev) => {
        if (!prev.data) {
          return prev;
        }

        const announcements = prev.data.announcements.map((item) =>
          item.id === announcementId ? { ...item, read: true } : item
        );

        return {
          ...prev,
          data: {
            ...prev.data,
            announcements,
            unreadAnnouncements: announcements.filter((item) => !item.read).length,
          },
        };
      });
    },
    [state.data]
  );

  return useMemo(
    () => ({
      ...state,
      refresh,
      markRead,
    }),
    [state, refresh, markRead]
  );
};