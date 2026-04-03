import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth, useAlert } from '@/template';
import { getCourseById } from '@/constants/courses';
import { useProgress } from '@/contexts/ProgressContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/feature/ProgressBar';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const { markCompleted, issueCertificate, enrollments } = useEnrollments();

  const course = getCourseById(courseId ?? '');
  const modIdx = parseInt(moduleIndex ?? '0', 10);
  const vidIdx = parseInt(videoIndex ?? '0', 10);

  // Find current video
  const allVideos = course?.modules.flatMap(m => m.videos) ?? [];
  const currentVideo = allVideos.find(v => v.id === id) ?? course?.modules[modIdx]?.videos[vidIdx];

  const player = useVideoPlayer(currentVideo?.videoUrl ?? '', p => {
    p.loop = false;
  });

  const saveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    if (courseId) loadCourseProgress(courseId);
  }, [courseId]);

  useEffect(() => {
    if (!course) return;
    const total = course.modules.reduce((acc, m) => acc + m.videos.length, 0);
    const rate = getCourseCompletionRate(courseId ?? '', total);
    setCourseProgress(rate);
  }, []);

  // Auto-save progress every 8 seconds
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
  }, [player, currentVideo, courseId, user]);

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
            setIsCompleting(true);
            await markCompleted(courseId);
            const { data, error } = await issueCertificate(courseId);
            setIsCompleting(false);
            if (error && !error.includes('unique')) { showAlert('Error', error); return; }
            router.push(`/certificate/${courseId}` as any);
          },
        },
        { text: 'Later', style: 'cancel' },
      ]);
    }
  }, [user, currentVideo, courseId, course, player]);

  useEffect(() => {
    const sub = player.addListener('playToEnd', handleVideoEnd);
    return () => sub.remove();
  }, [player, handleVideoEnd]);

  const navigateToVideo = (video: Video, mIdx: number, vIdx: number) => {
    router.replace(`/video/${video.id}?courseId=${courseId}&moduleIndex=${mIdx}&videoIndex=${vIdx}` as any);
  };

  const existingProgress = currentVideo ? getVideoProgress(currentVideo.id) : null;

  if (!course || !currentVideo) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
        <Text style={{ color: '#fff' }}>Video not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Video Player */}
      <View style={styles.playerWrap}>
        <VideoView
          player={player}
          style={styles.player}
          allowsFullscreen
          allowsPictureInPicture
        />
        {/* Top overlay */}
        <View style={[styles.playerTop, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={() => router.back()} style={styles.playerBack} hitSlop={8}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Course Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Course Progress</Text>
          <Text style={styles.progressPct}>{Math.round(courseProgress * 100)}%</Text>
        </View>
        <ProgressBar progress={courseProgress} height={5} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{currentVideo.title}</Text>
          <Text style={styles.videoDuration}>
            <MaterialIcons name="schedule" size={14} color={Colors.textSecondary} /> {currentVideo.duration}
          </Text>
          <Text style={styles.videoDesc}>{currentVideo.description}</Text>
          {existingProgress?.completed && (
            <View style={styles.completedBadge}>
              <MaterialIcons name="check-circle" size={16} color={Colors.success} />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
        </View>

        {/* Video List */}
        <View style={styles.playlistSection}>
          <Text style={styles.playlistTitle}>Course Content</Text>
          {course.modules.map((mod, mIdx) => (
            <View key={mod.id} style={[styles.moduleGroup, Shadows.sm]}>
              <View style={styles.moduleHeader}>
                <MaterialIcons name="folder" size={18} color={Colors.primary} />
                <Text style={styles.moduleName}>{mod.title}</Text>
              </View>
              {mod.videos.map((video, vIdx) => {
                const vProgress = getVideoProgress(video.id);
                const isCurrent = video.id === currentVideo.id;
                return (
                  <Pressable
                    key={video.id}
                    onPress={() => navigateToVideo(video, mIdx, vIdx)}
                    style={({ pressed }) => [
                      styles.videoItem,
                      isCurrent && styles.videoItemActive,
                      vIdx < mod.videos.length - 1 && styles.videoItemBorder,
                      { opacity: pressed ? 0.8 : 1 },
                    ]}
                  >
                    <View style={styles.videoItemIcon}>
                      {vProgress?.completed ? (
                        <MaterialIcons name="check-circle" size={22} color={Colors.success} />
                      ) : isCurrent ? (
                        <MaterialIcons name="play-circle-filled" size={22} color={Colors.primary} />
                      ) : (
                        <MaterialIcons name="play-circle-outline" size={22} color={Colors.textSecondary} />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.videoItemTitle, isCurrent && styles.videoItemTitleActive]} numberOfLines={2}>
                        {video.title}
                      </Text>
                      <Text style={styles.videoItemDuration}>{video.duration}</Text>
                      {vProgress && !vProgress.completed && vProgress.watched_seconds > 0 && (
                        <ProgressBar progress={vProgress.watched_seconds / Math.max(1, vProgress.duration_seconds)} height={2} />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  playerWrap: { backgroundColor: '#000', height: 240, position: 'relative' },
  player: { width: '100%', height: '100%' },
  playerTop: { position: 'absolute', left: 0, right: 0, top: 0, paddingHorizontal: 12 },
  playerBack: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
  progressSection: { padding: Spacing.md, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text, includeFontPadding: false },
  progressPct: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary, includeFontPadding: false },
  videoInfo: { padding: Spacing.md, backgroundColor: Colors.surface, marginBottom: 8 },
  videoTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 6, includeFontPadding: false },
  videoDuration: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 8, includeFontPadding: false },
  videoDesc: { fontSize: FontSize.base, color: Colors.textSecondary, lineHeight: 22, includeFontPadding: false },
  completedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10, backgroundColor: Colors.successLight, padding: 8, borderRadius: Radius.md },
  completedText: { fontSize: FontSize.sm, color: Colors.success, fontWeight: FontWeight.semibold, includeFontPadding: false },
  playlistSection: { paddingHorizontal: Spacing.md },
  playlistTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md, includeFontPadding: false },
  moduleGroup: { backgroundColor: Colors.surface, borderRadius: Radius.lg, marginBottom: Spacing.md, overflow: 'hidden' },
  moduleHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: Spacing.md, backgroundColor: Colors.borderLight },
  moduleName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  videoItem: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: 12 },
  videoItemActive: { backgroundColor: Colors.primary + '08' },
  videoItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  videoItemIcon: { width: 30, alignItems: 'center' },
  videoItemTitle: { fontSize: FontSize.base, color: Colors.text, fontWeight: FontWeight.medium, includeFontPadding: false },
  videoItemTitleActive: { color: Colors.primary, fontWeight: FontWeight.bold },
  videoItemDuration: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2, includeFontPadding: false },
});
