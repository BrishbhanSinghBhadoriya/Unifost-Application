import React, { useState, useEffect } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useAuth } from '@/template';
import { CertificationCourse } from '@/constants/indianCourses';
import { Course as UniversityCourse } from '@/constants/universityCourses';
import { courseService } from '@/services/courseService';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/Button';
import { Colors, FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type CourseTab = 'overview' | 'curriculum' | 'reviews';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { isEnrolled } = useEnrollments();
  const [activeTab, setActiveTab] = useState<CourseTab>('overview');
  const [course, setCourse] = useState<(CertificationCourse | UniversityCourse) & { type?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      const { data } = await courseService.getCourseById(id);
      if (data) setCourse(data);
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  const handleCall = () => {
    Linking.openURL('tel:+916393313030'); // Mock support number
  };

  const handleApply = () => {
    router.push(`/enquiry?courseId=${id}` as any);
  };

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 200], [0, 1]),
      backgroundColor: Colors.background,
    };
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Preparing your learning journey...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Feather name="alert-circle" size={48} color={Colors.textSecondary} />
        <Text style={styles.errorText}>Course not found.</Text>
        <Button label="Go Back" onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  const enrolled = isEnrolled(course.id);
  const isUniversityCourse = course.id.startsWith('univ-');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Animated Sticky Header */}
      <Animated.View style={[styles.stickyHeader, headerStyle, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.headerIconBtn}>
            <Feather name="chevron-left" size={24} color={Colors.text} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
          <Pressable style={styles.headerIconBtn}>
            <Feather name="share-2" size={20} color={Colors.text} />
          </Pressable>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: (course as any).image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop' }} 
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 1)'] as const}
            style={styles.heroGradient}
          />
          
          <View style={[styles.heroOverlay, { paddingTop: insets.top + 10 }]}>
            <View style={styles.heroTopActions}>
              <Pressable onPress={() => router.back()} style={styles.glassButton}>
                <Feather name="chevron-left" size={24} color={Colors.text} />
              </Pressable>
              <Pressable style={styles.glassButton}>
                <Feather name="heart" size={20} color={Colors.text} />
              </Pressable>
            </View>

            <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.heroInfo}>
              <View style={styles.badgeRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{course.category}</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{(course as any).rating || 4.9} ({(course as any).students || '2.4k+'})</Text>
                </View>
              </View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <View style={styles.instructorRow}>
                <Image 
                  source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(course.university)}&background=6C63FF&color=fff` }} 
                  style={styles.instructorAvatar}
                />
                <Text style={styles.instructorName}>{course.university}</Text>
                <Feather name="check-circle" size={14} color={Colors.primary} />
              </View>
            </Animated.View>
          </View>
        </View>

        <View style={styles.contentBody}>
          {/* Stats Bar */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <Feather name="clock" size={18} color={Colors.primary} />
              <Text style={styles.statValue}>{course.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Feather name="book-open" size={18} color={Colors.primary} />
              <Text style={styles.statValue}>{(course as any).topics?.length || (course as any).specialization?.length || 0}</Text>
              <Text style={styles.statLabel}>{isUniversityCourse ? 'Specializations' : 'Modules'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Feather name="award" size={18} color={Colors.primary} />
              <Text style={styles.statValue}>Verified</Text>
              <Text style={styles.statLabel}>Certificate</Text>
            </View>
          </View>

          {/* Custom Tabs */}
          <View style={styles.tabsContainer}>
            {(['overview', 'curriculum', 'reviews'] as CourseTab[]).map((tab) => (
              <Pressable 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>
                  {tab === 'curriculum' && isUniversityCourse ? 'Specializations' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
                {activeTab === tab && (
                  <Animated.View entering={FadeIn} style={styles.tabIndicator} />
                )}
              </Pressable>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'overview' && (
              <Animated.View entering={FadeInDown.duration(400)}>
                <Text style={styles.sectionTitle}>About this Program</Text>
                <Text style={styles.description}>
                  This comprehensive {course.category.toLowerCase()} program is offered by {course.university}. 
                  It is designed to provide you with in-depth knowledge and practical skills in {course.category}.
                  {'\n\n'}
                  <Text style={{ fontWeight: 'bold', color: Colors.text }}>Eligibility:</Text> {course.eligibility}
                </Text>

                {isUniversityCourse && (course as any).placement_benefits && (
                  <>
                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Placement & Benefits</Text>
                    <View style={styles.benefitsList}>
                      {(course as any).placement_benefits.map((benefit: string, i: number) => (
                        <View key={i} style={styles.benefitItem}>
                          <Feather name="check" size={18} color={Colors.success} />
                          <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}

                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Program Highlights</Text>
                <View style={styles.highlightsGrid}>
                  {[
                    { icon: 'target', text: 'Industry Relevant Projects' },
                    { icon: 'users', text: 'Peer Learning Group' },
                    { icon: 'shield', text: isUniversityCourse ? 'UGC Recognized Degree' : 'Verified Certificate' },
                    { icon: 'zap', text: 'Lifetime Access' },
                  ].map((item, i) => (
                    <View key={i} style={styles.highlightCard}>
                      <View style={styles.highlightIcon}>
                        <Feather name={item.icon as any} size={20} color={Colors.secondary} />
                      </View>
                      <Text style={styles.highlightText}>{item.text}</Text>
                    </View>
                  ))}
                </View>
              </Animated.View>
            )}

            {activeTab === 'curriculum' && (
              <Animated.View entering={FadeInDown.duration(400)}>
                <Text style={styles.sectionTitle}>{isUniversityCourse ? 'Specializations Available' : 'Course Curriculum'}</Text>
                {(isUniversityCourse ? (course as any).specialization : course.topics) && (isUniversityCourse ? (course as any).specialization.length > 0 : course.topics!.length > 0) ? (
                  (isUniversityCourse ? (course as any).specialization : course.topics!).map((topic: string, i: number) => (
                    <View key={i} style={styles.topicCard}>
                      <View style={styles.topicNumber}>
                        <Text style={styles.topicNumberText}>{i + 1}</Text>
                      </View>
                      <View style={styles.topicInfo}>
                        <Text style={styles.topicTitle}>{topic}</Text>
                        {!isUniversityCourse && (
                          <View style={styles.topicMeta}>
                            <Feather name="play-circle" size={12} color={Colors.textSecondary} />
                            <Text style={styles.topicMetaText}>3 Lessons • 45 mins</Text>
                          </View>
                        )}
                      </View>
                      <Feather name={isUniversityCourse ? "chevron-right" : "lock"} size={18} color={Colors.textSecondary} />
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Feather name="book" size={48} color={Colors.textSecondary} />
                    <Text style={styles.emptyText}>No data available for this program.</Text>
                  </View>
                )}
              </Animated.View>
            )}

            {activeTab === 'reviews' && (
              <Animated.View entering={FadeInDown.duration(400)} style={styles.emptyState}>
                <Feather name="message-square" size={48} color={Colors.textSecondary} />
                <Text style={styles.emptyText}>No reviews yet. Be the first to enquire!</Text>
              </Animated.View>
            )}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.actionButtons}>
          <Pressable style={styles.callButton} onPress={handleCall}>
            <Feather name="phone" size={20} color={Colors.primary} />
            <Text style={styles.callButtonText}>Call Now</Text>
          </Pressable>
          
          <Button 
            label={isUniversityCourse ? "Apply Now" : (enrolled ? "Continue Learning" : "Enroll Now")} 
            onPress={() => {
              if (isUniversityCourse) {
                handleApply();
              } else if (enrolled) {
                router.push('/(tabs)/my-learning');
              } else {
                router.push(`/checkout/${course.id}` as any);
              }
            }}
            style={styles.enrollBtn}
            icon={<Feather name={enrolled ? "arrow-right" : "zap"} size={18} color="#fff" />}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 100,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 24,
    justifyContent: 'space-between',
  },
  heroTopActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  glassButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  heroInfo: {
    marginBottom: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.2)',
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  ratingText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseTitle: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 16,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  instructorName: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  contentBody: {
    flex: 1,
    marginTop: -30,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.border,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 24,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    position: 'relative',
  },
  activeTab: {},
  tabLabel: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabLabel: {
    color: Colors.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  tabContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  benefitsList: {
    marginTop: 8,
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 15,
    color: Colors.text,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  highlightCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  highlightIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: Radius.lg,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topicNumberText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  topicMetaText: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  callButton: {
    flex: 1,
    height: 56,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  enrollBtn: {
    flex: 2,
    height: 56,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 16,
    fontSize: FontSize.base,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: Colors.text,
    fontSize: 18,
    marginVertical: 16,
  },
});
