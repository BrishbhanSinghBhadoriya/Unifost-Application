import React, { useState, useEffect } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useAuth, useAlert } from '@/template';
import { CertificationCourse } from '@/constants/indianCourses';
import { courseService } from '@/services/courseService';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/feature/ProgressBar';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CourseTab = 'overview' | 'topics' | 'university';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { isEnrolled, enroll } = useEnrollments();
  const [activeTab, setActiveTab] = useState<CourseTab>('overview');
  const [enrolling, setEnrolling] = useState(false);
  const [course, setCourse] = useState<CertificationCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await courseService.getCourseById(id);
      if (data) {
        setCourse(data);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 12, color: Colors.textSecondary }}>Loading certification details...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
        <Text style={{ color: Colors.textSecondary }}>Certification not found.</Text>
      </View>
    );
  }

  const enrolled = isEnrolled(course.id);

  const handleEnroll = async () => {
    if (!user) { router.push('/auth/login'); return; }
    
    // Redirect to the new application and checkout flow
    router.push(`/checkout/${course.id}` as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop' }} style={styles.heroImg} contentFit="cover" transition={200} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={StyleSheet.absoluteFillObject} />
          <View style={[styles.heroTop, { paddingTop: insets.top + 8 }]}>
            <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </Pressable>
            <Badge label={course.certificate_type} variant="promo" />
          </View>
          {enrolled && (
            <Pressable
              onPress={() => router.push('/(tabs)/my-learning')}
              style={styles.playBtn}
            >
              <MaterialIcons name="done-all" size={56} color="#fff" />
            </Pressable>
          )}
        </View>

        <View style={styles.body}>
          {/* Title & Meta */}
          <View style={styles.metaRow}>
            <Badge label={course.duration} variant="primary" />
            <Badge label={course.category} />
          </View>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.shortDesc}>An exclusive {course.certificate_type.toLowerCase()} offered by {course.university}</Text>
          <View style={styles.ratingRow}>
            {[1,2,3,4,5].map(s => (
              <MaterialIcons key={s} name="star" size={16} color={Colors.warning} />
            ))}
            <Text style={styles.ratingVal}>4.8</Text>
            <Text style={styles.ratingCount}>({(2450).toLocaleString()} ratings)</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.students}>12,000+ students</Text>
          </View>
          <View style={styles.instructorRow}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop' }} style={styles.instructorAvatar} contentFit="cover" transition={200} />
            <View>
              <Text style={styles.instructorName}>{course.university}</Text>
              <Text style={styles.instructorTitle}>Verified Partner Institution</Text>
            </View>
          </View>

          {/* Highlights */}
          <View style={[styles.highlightsCard, Shadows.sm]}>
            <Text style={styles.sectionTitle}>What you will get</Text>
            <View style={styles.highlights}>
              {[
                'Official Institute Curriculum',
                `Full ${course.certificate_type}`,
                'Lifetime access to resources'
              ].map((h: string, i: number) => (
                <View key={i} style={styles.highlightItem}>
                  <MaterialIcons name="check-circle" size={18} color={Colors.success} />
                  <Text style={styles.highlightText}>{h}</Text>
                </View>
              ))}
              <View style={styles.highlightItem}>
                <MaterialIcons name="workspace-premium" size={18} color={Colors.warning} />
                <Text style={styles.highlightText}>Recognized {course.certificate_type} attached</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {(['overview', 'topics', 'university'] as CourseTab[]).map(t => (
              <Pressable
                key={t}
                onPress={() => setActiveTab(t)}
                style={[styles.tab, activeTab === t && styles.tabActive]}
              >
                <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Overview */}
          {activeTab === 'overview' && (
            <View>
              <Text style={styles.sectionTitle}>About this certification</Text>
              <Text style={styles.description}>Eligibility requirements: {course.eligibility}. Apply today to elevate your skillsets with India's best learning framework.</Text>
              <View style={styles.statsGrid}>
                {[
                  { icon: 'schedule' as const, label: 'Duration', value: course.duration },
                  { icon: 'view-list' as const, label: 'Topics', value: `${course.topics.length} subjects` },
                  { icon: 'workspace-premium' as const, label: 'Type', value: course.certificate_type },
                  { icon: 'domain' as const, label: 'Institution', value: "University" },
                ].map((s, i) => (
                  <View key={s.label} style={styles.statCard}>
                    <MaterialIcons name={s.icon} size={24} color={Colors.primary} />
                    <Text style={styles.statCardVal}>{s.value}</Text>
                    <Text style={styles.statCardLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.tagsRow}>
                {['Online', course.certificate_type, 'Verified'].map((tag: string) => (
                  <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                ))}
              </View>
            </View>
          )}

          {/* Curriculum / Topics */}
          {activeTab === 'topics' && (
            <View>
              <Text style={styles.sectionTitle}>Curriculum ({course.topics.length} topics)</Text>
              <View style={[styles.moduleCard, Shadows.sm]}>
                {course.topics.map((topic, index) => (
                   <View key={index} style={[styles.videoItem, index < course.topics.length - 1 && styles.videoItemBorder]}>
                     <View style={styles.videoIcon}>
                       <MaterialIcons name="menu-book" size={20} color={Colors.textSecondary} />
                     </View>
                     <View style={{ flex: 1 }}>
                       <Text style={styles.videoTitle}>{topic}</Text>
                     </View>
                   </View>
                ))}
              </View>
            </View>
          )}

          {/* University */}
          {activeTab === 'university' && (
            <View style={[styles.instructorCard, Shadows.sm]}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop' }} style={styles.instructorBigAvatar} contentFit="cover" transition={200} />
              <Text style={styles.instructorCardName}>{course.university}</Text>
              <Text style={styles.instructorCardTitle}>Verified Educational Institution</Text>
              <View style={styles.instructorStats}>
                <View style={styles.iStat}>
                  <MaterialIcons name="star" size={18} color={Colors.warning} />
                  <Text style={styles.iStatVal}>4.8 Rating</Text>
                </View>
                <View style={styles.iStat}>
                  <MaterialIcons name="people" size={18} color={Colors.primary} />
                  <Text style={styles.iStatVal}>Active Partners</Text>
                </View>
                <View style={styles.iStat}>
                  <MaterialIcons name="verified" size={18} color={Colors.success} />
                  <Text style={styles.iStatVal}>UGC Recognized</Text>
                </View>
              </View>
              <Text style={styles.instructorBio}>India's top {course.category} educational board providing highly valuable valid certifications via Unifost platform connections.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Enroll CTA */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.ctaLeft}>
          <Text style={styles.ctaPrice} numberOfLines={1}>{course.fees}</Text>
          <Text style={styles.ctaOriginal}>Authorized Fees</Text>
        </View>
        {enrolled ? (
          <Button
            title="Go to Dashboard"
            onPress={() => router.push('/(tabs)/my-learning')}
            icon={<MaterialIcons name="arrow-forward" size={18} color="#fff" />}
            style={{ flex: 1 }}
          />
        ) : (
          <Button
            title="Apply Now"
            onPress={handleEnroll}
            loading={enrolling}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 260, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  heroImg: { ...StyleSheet.absoluteFillObject },
  heroTop: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: Radius.full, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  playBtn: { opacity: 0.9 },
  body: { padding: Spacing.md },
  metaRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 12 },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 8, lineHeight: 32, includeFontPadding: false },
  shortDesc: { fontSize: FontSize.base, color: Colors.textSecondary, lineHeight: 22, marginBottom: 12, includeFontPadding: false },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 14, flexWrap: 'wrap' },
  ratingVal: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  ratingCount: { fontSize: FontSize.sm, color: Colors.textSecondary, includeFontPadding: false },
  dot: { color: Colors.textLight, includeFontPadding: false },
  students: { fontSize: FontSize.sm, color: Colors.textSecondary, includeFontPadding: false },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: Spacing.md },
  instructorAvatar: { width: 40, height: 40, borderRadius: 20 },
  instructorName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text, includeFontPadding: false },
  instructorTitle: { fontSize: FontSize.sm, color: Colors.textSecondary, includeFontPadding: false },
  highlightsCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 12, includeFontPadding: false },
  highlights: { gap: 10 },
  highlightItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  highlightText: { fontSize: FontSize.base, color: Colors.text, flex: 1, includeFontPadding: false },
  tabs: { flexDirection: 'row', backgroundColor: Colors.borderLight, borderRadius: Radius.md, padding: 4, marginBottom: Spacing.md },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: Radius.sm },
  tabActive: { backgroundColor: Colors.surface, ...Shadows.sm },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textSecondary, includeFontPadding: false },
  tabTextActive: { color: Colors.primary },
  description: { fontSize: FontSize.base, color: Colors.text, lineHeight: 24, marginBottom: Spacing.md, includeFontPadding: false },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.md },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 6, ...Shadows.sm },
  statCardVal: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  statCardLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, includeFontPadding: false },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: Colors.primary + '14', paddingVertical: 6, paddingHorizontal: 12, borderRadius: Radius.full },
  tagText: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.medium, includeFontPadding: false },
  moduleCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, marginBottom: Spacing.sm, overflow: 'hidden' },
  moduleHeader: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  moduleName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  moduleMeta: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2, includeFontPadding: false },
  videoList: { borderTopWidth: 1, borderTopColor: Colors.borderLight },
  videoItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: Spacing.md, gap: 12 },
  videoItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  videoIcon: { width: 32, alignItems: 'center' },
  videoTitle: { fontSize: FontSize.base, color: Colors.text, fontWeight: FontWeight.medium, includeFontPadding: false },
  videoDuration: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2, includeFontPadding: false },
  instructorCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', gap: 8 },
  instructorBigAvatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 8 },
  instructorCardName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  instructorCardTitle: { fontSize: FontSize.base, color: Colors.primary, textAlign: 'center', includeFontPadding: false },
  instructorStats: { flexDirection: 'row', gap: 20, marginVertical: 12 },
  iStat: { alignItems: 'center', gap: 4 },
  iStatVal: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text, includeFontPadding: false },
  instructorBio: { fontSize: FontSize.base, color: Colors.textSecondary, lineHeight: 22, textAlign: 'center', includeFontPadding: false },
  ctaContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingTop: 12, flexDirection: 'row', alignItems: 'center', gap: 16, borderTopWidth: 1, borderTopColor: Colors.border, ...Shadows.lg },
  ctaLeft: { alignItems: 'center' },
  ctaPrice: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary, includeFontPadding: false },
  ctaOriginal: { fontSize: FontSize.sm, color: Colors.textLight, textDecorationLine: 'line-through', includeFontPadding: false },
});
