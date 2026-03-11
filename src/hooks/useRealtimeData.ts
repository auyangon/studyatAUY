import { useCallback, useEffect, useRef, useState } from "react";
import {
  checkUpdates,
  getMyData,
  markRead,
  type DashboardData,
} from "../lib/googleSheets";

interface UseRealtimeDataOptions {
  email: string | null;
  selectedStudentEmail?: string;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to load data.";
}

export function useRealtimeData({ email, selectedStudentEmail }: UseRealtimeDataOptions) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<number | null>(null);
  const lastSyncRef = useRef(0);

  const fetchData = useCallback(
    async (mode: "initial" | "manual" | "background" = "manual") => {
      if (!email) {
        return;
      }

      if (mode === "initial") {
        setLoading(true);
      } else {
        setSyncing(true);
      }

      setError(null);

      try {
        const nextData = await getMyData({ email, studentEmail: selectedStudentEmail });
        setData(nextData);
        setLastSync(nextData.lastUpdatedAt);
        lastSyncRef.current = nextData.lastUpdatedAt;
      } catch (fetchError) {
        setError(getErrorMessage(fetchError));
      } finally {
        setLoading(false);
        setSyncing(false);
      }
    },
    [email, selectedStudentEmail],
  );

  useEffect(() => {
    if (!email) {
      setData(null);
      setError(null);
      setLoading(false);
      setSyncing(false);
      setLastSync(null);
      lastSyncRef.current = 0;
      return;
    }

    void fetchData("initial");
  }, [email, selectedStudentEmail, fetchData]);

  useEffect(() => {
    if (!email) {
      return;
    }

    const interval = window.setInterval(async () => {
      setSyncing(true);

      try {
        const status = await checkUpdates({ lastSync: lastSyncRef.current });

        if (status.needsUpdate) {
          await fetchData("background");
        }
      } catch (syncError) {
        setError(getErrorMessage(syncError));
      } finally {
        setSyncing(false);
      }
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [email, fetchData]);

  const refresh = useCallback(async () => {
    await fetchData("manual");
  }, [fetchData]);

  const markAnnouncementRead = useCallback(
    async (announcementId: string) => {
      if (!email) {
        return;
      }

      try {
        await markRead({ announcementId, email, studentEmail: selectedStudentEmail });

        setData((current) => {
          if (!current) {
            return current;
          }

          const announcements = current.announcements.map((announcement) =>
            announcement.id === announcementId ? { ...announcement, read: true } : announcement,
          );

          return {
            ...current,
            announcements,
            unreadAnnouncements: announcements.filter((announcement) => !announcement.read).length,
          };
        });
      } catch (markError) {
        setError(getErrorMessage(markError));
      }
    },
    [email, selectedStudentEmail],
  );

  return {
    data,
    error,
    lastSync,
    loading,
    markAnnouncementRead,
    refresh,
    syncing,
  };
}