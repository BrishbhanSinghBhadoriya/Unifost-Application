import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, StatusBar, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { CERTIFICATION_COURSES } from '@/constants/indianCourses';
import { UNIVERSITY_COURSES } from '@/constants/universityCourses';
import { CourseCard } from '@/components/feature/CourseCard';

import { Colors, FontSize, FontWeight, Radius, Spacing, Shadows } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEnrollments } from '@/contexts/EnrollmentContext';

export default function CoursesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ university?: string }>();
  const insets = useSafeAreaInsets();
  const { isEnrolled } = useEnrollments();
  const [activeTab, setActiveTab] = useState<'all' | 'degree' | 'certification'>('all');
  const [selectedUniversity, setSelectedUniversity] = useState<string>(params.university || 'All');

  // Update selected university when params change
  useEffect(() => {
    if (params.university) {
      setSelectedUniversity(params.university);
      // If a university is selected, it's likely a degree program
      setActiveTab('degree');
    }
  }, [params.university]);

  const ALL_COURSES = useMemo(() => [
    ...UNIVERSITY_COURSES.map(c => ({ ...c, type: 'university' })),
    ...CERTIFICATION_COURSES.map(c => ({ ...c, type: 'certification', category: 'Certification' as const }))
  ], []);

  const tabFilteredCourses = useMemo(() => {
    if (activeTab === 'all') return ALL_COURSES;
    if (activeTab === 'degree') return ALL_COURSES.filter(c => c.category === 'Degree');
    return ALL_COURSES.filter(c => c.category === 'Certification');
  }, [activeTab, ALL_COURSES]);

  // Compute distinct universities dynamically based on tab
  const universities = useMemo(() => {
    const uniqueNames = Array.from(new Set(tabFilteredCourses.map(c => c.university)));
    return ['All', ...uniqueNames];
  }, [tabFilteredCourses]);

  // Compute counts for each university tab
  const counts = useMemo(() => {
    const countsMap: Record<string, number> = { All: tabFilteredCourses.length };
    tabFilteredCourses.forEach(c => {
      countsMap[c.university] = (countsMap[c.university] || 0) + 1;
    });
    return countsMap;
  }, [tabFilteredCourses]);

  const filteredCourses = useMemo(() => {
    return tabFilteredCourses.filter(c =>
      selectedUniversity === 'All' ? true : c.university === selectedUniversity
    );
  }, [selectedUniversity, tabFilteredCourses]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <Text style={styles.headerTitle}>Explore Programs</Text>
        
        {/* Main Tabs */}
        <View style={styles.tabContainer}>
          <Pressable 
            style={[styles.mainTab, activeTab === 'all' && styles.mainTabActive]}
            onPress={() => { setActiveTab('all'); setSelectedUniversity('All'); }}
          >
            <Text style={[styles.mainTabText, activeTab === 'all' && styles.mainTabTextActive]}>All</Text>
          </Pressable>
          <Pressable 
            style={[styles.mainTab, activeTab === 'degree' && styles.mainTabActive]}
            onPress={() => { setActiveTab('degree'); setSelectedUniversity('All'); }}
          >
            <Text style={[styles.mainTabText, activeTab === 'degree' && styles.mainTabTextActive]}>Degrees</Text>
          </Pressable>
          <Pressable 
            style={[styles.mainTab, activeTab === 'certification' && styles.mainTabActive]}
            onPress={() => { setActiveTab('certification'); setSelectedUniversity('All'); }}
          >
            <Text style={[styles.mainTabText, activeTab === 'certification' && styles.mainTabTextActive]}>Certifications</Text>
          </Pressable>
        </View>

        <Text style={styles.headerSub}>{filteredCourses.length} programs available</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginTop: 12 }} 
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
        >
          {universities.map(uni => (
            <Pressable 
              key={uni} 
              style={[styles.filterChip, selectedUniversity === uni && styles.filterChipActive]}
              onPress={() => setSelectedUniversity(uni)}
            >
              <Text style={[styles.filterText, selectedUniversity === uni && styles.filterTextActive]}>
                {uni} ({counts[uni]})
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </LinearGradient>

      <FlatList
        data={filteredCourses}
        keyExtractor={c => c.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item as any}
            onPress={() => router.push(`/course/${item.id}` as any)}
            isEnrolled={isEnrolled(item.id)}
          />
        )}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="menu-book" size={56} color={Colors.textLight} />
            <Text style={styles.emptyText}>No programs found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  headerSub: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 12, includeFontPadding: false },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 4,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  mainTabActive: {
    backgroundColor: '#fff',
    ...Shadows.sm,
  },
  mainTabText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  mainTabTextActive: {
    color: Colors.primary,
  },
  filterChip: { 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: Radius.full, 
    backgroundColor: Colors.surface, 
    minHeight: 36, 
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: FontSize.xs, color: Colors.textSecondary, fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: FontSize.base, color: Colors.textLight, marginTop: 12 },
});
