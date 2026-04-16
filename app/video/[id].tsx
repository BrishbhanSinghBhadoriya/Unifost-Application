import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useAuth, useAlert } from '@/template';
import { getCourseById } from '@/constants/courses';
import { useProgress } from '@/contexts/ProgressContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { ProgressBar } from '@/components/feature/ProgressBar';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

import { Video } from '@/constants/courses';

export default function VideoPlayerScreen() {
  const { id, courseId, moduleIndex, videoIndex } = useLocalSearchParams<{
    id: string;
    courseId: string;
    moduleIndex: string;
    videoIndex: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { saveVideoProgress, loadCourseProgress, getVideoProgress, getCourseCompletionRate } = useProgress();
  const { markCompleted, issueCertificate } = useEnrollments();

  const course = getCourseById(courseId ?? '');
  const modIdx = parseInt(moduleIndex ?? '0', 10);
  const vidIdx = parseInt(videoIndex ?? '0', 10);

  const allVideos = course?.modules.flatMap(m => m.videos) ?? [];
  const currentVideo = allVideos.find(v => v.id === id) || course?.modules[modIdx]?.videos[vidIdx];

  const player = useVideoPlayer(currentVideo?.videoUrl ?? '', p => {
    p.loop = false;
  });

  const saveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    if (courseId) loadCourseProgress(courseId);
  }, [courseId]);

  useEffect(() => {
    if (!course) return;
    const total = course.modules.reduce((acc, m) => acc + m.videos.length, 0);
    const rate = getCourseCompletionRate(courseId ?? '', total);
    setCourseProgress(rate);
  }, [course, courseId, getCourseCompletionRate]);

  useEffect(() => {
    if (!user || !currentVideo || !courseId) return;
    saveIntervalRef.current = setInterval(async () => {
      const position = player.currentTime ?? 0;
      const duration = player.duration ?? 0;
      if (duration > 0) {
        const completed = position / duration > 0.85;
        await saveVideoProgress(courseId, currentVideo.id, Math.round(position), Math.round(duration), completed);
        if (completed && course) {
          const total = course.modules.reduce((acc, m) => acc + m.videos.length, 0);
          const rate = getCourseCompletionRate(courseId, total);
          setCourseProgress(rate);
        }
      }
    }, 8000);
    return () => { if (saveIntervalRef.current) clearInterval(saveIntervalRef.current); };
  }, [player, currentVideo, courseId, user, course, getCourseCompletionRate, saveVideoProgress]);

  const handleVideoEnd = useCallback(async () => {
    if (!user || !currentVideo || !courseId || !course) return;
    await saveVideoProgress(courseId, currentVideo.id, Math.round(player.duration ?? 0), Math.round(player.duration ?? 0), true);
    const total = course.modules.reduce((acc, m) => acc + m.videos.length, 0);
    await loadCourseProgress(courseId);
    const rate = getCourseCompletionRate(courseId, total);
    setCourseProgress(rate);
    if (rate >= 0.9) {
      showAlert('Course Complete!', 'Congratulations! You have completed this course. Claim your certificate now!', [
        {
          text: 'Get Certificate',
          onPress: async () => {
            await markCompleted(courseId);
            const { error } = await issueCertificate(courseId);
            if (error && !error.includes('unique')) { showAlert('Error', error); return; }
            router.push(`/certificate/${courseId}` as any);
          },
        },
        { text: 'Later', style: 'cancel' },
      ]);
    }
  }, [user, currentVideo, courseId, course, player, loadCourseProgress, getCourseCompletionRate, showAlert, markCompleted, issueCertificate, router, saveVideoProgress]);

  useEffect(() => {
    const sub = player.addListener('playToEnd', handleVideoEnd);
    return () => sub.remove();
  }, [player, handleVideoEnd]);

  const navigateToVideo = (video: Video, mIdx: number, vIdx: number) => {
    router.replace(`/video/${video.id}?courseId=${courseId}&moduleIndex=${mIdx}&videoIndex=${vIdx}` as any);
  };

  if (!course || !currentVideo) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.errorText}>Video not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Video Player Section */}
      <View style={[styles.playerContainer, { paddingTop: insets.top }]}>
        <View style={styles.videoHeader}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <Feather name="chevron-left" size={24} color={Colors.white} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
          <Pressable style={styles.iconButton}>
            <Feather name="more-vertical" size={20} color={Colors.white} />
          </Pressable>
        </View>

        <View style={styles.playerWrapper}>
          <VideoView
            player={player}
            style={styles.player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        {/* Progress Bar Overlay */}
        <View style={styles.progressOverlay}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Course Completion</Text>
            <Text style={styles.progressPercent}>{Math.round(courseProgress * 100)}%</Text>
          </View>
          <ProgressBar progress={courseProgress} height={6} />
        </View>

        {/* Video Details */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.videoDetails}>
          <Text style={styles.videoTitle}>{currentVideo.title}</Text>
          <View style={styles.videoMeta}>
            <View style={styles.metaItem}>
              <Feather name="clock" size={14} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{currentVideo.duration}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Feather name="user" size={14} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{course.university || 'Partner University'}</Text>
            </View>
          </View>
          <Text style={styles.videoDescription}>{currentVideo.description || 'No description available for this lesson.'}</Text>
        </Animated.View>

        {/* Lesson List */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Curriculum</Text>
          {course.modules.map((mod, mIdx) => (
            <View key={mod.id} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Feather name="folder" size={18} color={Colors.primary} />
                <Text style={styles.moduleTitle}>{mod.title}</Text>
                <Text style={styles.moduleCount}>{mod.videos.length} lessons</Text>
              </View>
              <View style={styles.videoList}>
                {mod.videos.map((video, vIdx) => {
                  const vProgress = getVideoProgress(video.id);
                  const isCurrent = video.id === currentVideo.id;
                  const isCompleted = vProgress?.completed;
                  
                  return (
                    <Pressable
                      key={video.id}
                      onPress={() => navigateToVideo(video, mIdx, vIdx)}
                      style={[
                        styles.videoItem,
                        isCurrent && styles.activeVideoItem
                      ]}
                    >
                      <View style={[
                        styles.videoIconContainer,
                        isCurrent && styles.activeVideoIconContainer,
                        isCompleted && styles.completedVideoIconContainer
                      ]}>
                        {isCompleted ? (
                          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                        ) : isCurrent ? (
                          <Ionicons name="play" size={18} color={Colors.white} />
                        ) : (
                          <Ionicons name="play-outline" size={18} color={Colors.textSecondary} />
                        )}
                      </View>
                      <View style={styles.videoItemInfo}>
                        <Text style={[
                          styles.videoItemTitle,
                          isCurrent && styles.activeVideoItemTitle
                        ]} numberOfLines={1}>
                          {video.title}
                        </Text>
                        <Text style={styles.videoItemMeta}>{video.duration}</Text>
                      </View>
                      {!isCompleted && !isCurrent && (
                        <Feather name="lock" size={14} color={Colors.textLight} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  playerContainer: {
    backgroundColor: '#000',
    paddingBottom: 20,
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 10,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  player: {
    width: '100%',
    height: '100%',
  },
  progressOverlay: {
    padding: 24,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercent: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDetails: {
    padding: 24,
  },
  videoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.glassBorder,
    marginHorizontal: 12,
  },
  videoDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  contentSection: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
    gap: 12,
  },
  moduleTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.white,
  },
  moduleCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  videoList: {
    padding: 8,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: Radius.lg,
    gap: 12,
  },
  activeVideoItem: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
  },
  videoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeVideoIconContainer: {
    backgroundColor: Colors.primary,
  },
  completedVideoIconContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  videoItemInfo: {
    flex: 1,
  },
  videoItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  activeVideoItemTitle: {
    color: Colors.white,
  },
  videoItemMeta: {
    fontSize: 11,
    color: Colors.textLight,
  },
});
