import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { CERTIFICATION_COURSES } from '@/constants/indianCourses';
import { CourseCard } from '@/components/feature/CourseCard';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import { useEnrollments } from '@/contexts/EnrollmentContext';

type Tab = 'active' | 'completed';

export default function MyLearningScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const { enrollments, loading } = useEnrollments();

  // Filter courses based on enrollment status
  const enrolledCourses = enrollments
    .filter(e => !e.completed)
    .map(e => {
      const course = CERTIFICATION_COURSES.find(c => c.id === e.course_id);
      return course ? { ...course, progress: e.progress || 0 } : null;
    })
    .filter(Boolean);

  const completedCourses = enrollments
    .filter(e => e.completed)
    .map(e => CERTIFICATION_COURSES.find(c => c.id === e.course_id))
    .filter(Boolean);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading your courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={styles.headerBackground}>
        <LinearGradient
          colors={['#1e1b4b', '#4338ca']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={[styles.headerContent, { paddingTop: insets.top + 20 }]}>
          <Text style={styles.headerTitle}>My Learning</Text>
          <Text style={styles.headerSubtitle}>Keep pushing forward!</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>In Progress ({enrolledCourses.length})</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed ({completedCourses.length})</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'active' ? (
          enrolledCourses.length > 0 ? (
            enrolledCourses.map(course => (
              <View key={course?.id} style={styles.courseWrapper}>
                <CourseCard 
                  course={course as any} 
                  variant="default" 
                  onPress={() => router.push(`/course/${course?.id}` as any)} 
                  progress={course?.progress} 
                />
              </View>
            ))
          ) : (
             <Pressable style={styles.emptyState} onPress={() => router.push('/(tabs)/courses')}>
                <MaterialIcons name="menu-book" size={64} color="#d1d5db" />
                <Text style={styles.emptyStateTitle}>No Active Courses</Text>
                <Text style={styles.emptyStateSubtitle}>Start exploring and enroll in a course! (Tap to Browse)</Text>
             </Pressable>
          )
        ) : (
           completedCourses.length > 0 ? (
             completedCourses.map(course => (
                <Pressable key={course?.id} style={styles.certificateCard} onPress={() => Alert.alert('Certificate Download', `Your high resolution verified certificate for "${course?.title}" is being generated...\nCheck your email shortly.`)}>
                  <LinearGradient colors={['#ffffff', '#f8fafc']} style={StyleSheet.absoluteFillObject} />
                  <View style={styles.certIconBg}>
                    <MaterialIcons name="workspace-premium" size={32} color="#4f46e5" />
                  </View>
                  <View style={styles.certInfo}>
                    <Text style={styles.certTitle}>{course?.title}</Text>
                    <Text style={styles.certUniversity}>{course?.university}</Text>
                    <Text style={styles.certLink}>Tap to Download</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#4f46e5" />
                </Pressable>
             ))
           ) : (
             <Pressable style={styles.emptyState} onPress={() => router.push('/(tabs)/courses')}>
               <MaterialIcons name="workspace-premium" size={64} color="#d1d5db" />
               <Text style={styles.emptyStateTitle}>No Certificates Yet</Text>
               <Text style={styles.emptyStateSubtitle}>Complete a course to see your certificates here. (Tap to Browse)</Text>
             </Pressable>
           )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBackground: {
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  headerContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: Spacing.xl,
    padding: 6,
    borderRadius: 20,
    marginTop: -28,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
  },
  activeTab: {
    backgroundColor: '#4f46e5',
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: 100,
  },
  courseWrapper: {
    marginBottom: Spacing.md,
    marginHorizontal: -8, // CourseCard has horizontal margin that offsets this
  },
  certificateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  certIconBg: {
    backgroundColor: '#eef2ff',
    padding: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  certInfo: {
    flex: 1,
  },
  certTitle: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  certUniversity: {
    fontSize: FontSize.sm,
    color: '#6b7280',
    marginTop: 4,
  },
  certLink: {
    fontSize: FontSize.sm,
    color: '#4f46e5',
    fontWeight: '600',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
  },
  emptyStateSubtitle: {
    fontSize: FontSize.base,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  }
});
