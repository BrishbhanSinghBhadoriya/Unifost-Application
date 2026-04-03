import React, { createContext, useContext, useState } from 'react';

interface VideoProgress {
  videoId: string;
  courseId: string;
  position: number;
  duration: number;
  completed: boolean;
  updated_at: string;
}

interface ProgressContextType {
  videoProgress: Record<string, VideoProgress>;
  saveVideoProgress: (courseId: string, videoId: string, position: number, duration: number, completed: boolean) => Promise<void>;
  loadCourseProgress: (courseId: string) => Promise<void>;
  getVideoProgress: (videoId: string) => VideoProgress | null;
  getCourseCompletionRate: (courseId: string, totalVideos: number) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoProgress, setVideoProgress] = useState<Record<string, VideoProgress>>({});

  const saveVideoProgress = async (courseId: string, videoId: string, position: number, duration: number, completed: boolean) => {
    setVideoProgress(prev => ({
      ...prev,
      [videoId]: {
        videoId,
        courseId,
        position,
        duration,
        completed,
        updated_at: new Date().toISOString(),
      },
    }));
  };

  const loadCourseProgress = async (courseId: string) => {
    // In a real app, this would fetch from an API
  };

  const getVideoProgress = (videoId: string) => {
    return videoProgress[videoId] || null;
  };

  const getCourseCompletionRate = (courseId: string, totalVideos: number) => {
    const courseVideos = Object.values(videoProgress).filter((v: VideoProgress) => v.courseId === courseId && v.completed);
    return totalVideos > 0 ? courseVideos.length / totalVideos : 0;
  };

  return (
    <ProgressContext.Provider value={{ videoProgress, saveVideoProgress, loadCourseProgress, getVideoProgress, getCourseCompletionRate }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
