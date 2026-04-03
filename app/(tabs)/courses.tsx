import React, { useState, useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { CERTIFICATION_COURSES } from '@/constants/indianCourses';
import { CourseCard } from '@/components/feature/CourseCard';

import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEnrollments } from '@/contexts/EnrollmentContext';

export default function CoursesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isEnrolled } = useEnrollments();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('All');

  // Compute distinct universities dynamically
  const universities = useMemo(() => {
    const uniqueNames = Array.from(new Set(CERTIFICATION_COURSES.map(c => c.university)));
    return ['All', ...uniqueNames];
  }, []);

  // Compute counts for each university tab
  const counts = useMemo(() => {
    const countsMap: Record<string, number> = { All: CERTIFICATION_COURSES.length };
    CERTIFICATION_COURSES.forEach(c => {
      countsMap[c.university] = (countsMap[c.university] || 0) + 1;
    });
    return countsMap;
  }, []);

  const filteredCourses = useMemo(() => {
    return CERTIFICATION_COURSES.filter(c =>
      selectedUniversity === 'All' ? true : c.university === selectedUniversity
    );
  }, [selectedUniversity]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <Text style={styles.headerTitle}>Explore Courses</Text>
        <Text style={styles.headerSub}>{filteredCourses.length} programs available</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginTop: 16 }} 
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
        >
          {universities.map(uni => (
            <View key={uni} style={[styles.filterChip, selectedUniversity === uni && styles.filterChipActive]}>
              <Text
                style={[styles.filterText, selectedUniversity === uni && styles.filterTextActive]}
                onPress={() => setSelectedUniversity(uni)}
              >
                {uni} ({counts[uni]})
              </Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>

      <FlatList
        data={filteredCourses}
        keyExtractor={c => c.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => router.push(`/course/${item.id}` as any)}
            isEnrolled={isEnrolled(item.id)}
          />
        )}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="menu-book" size={56} color={Colors.textLight} />
            <Text style={styles.emptyText}>No courses found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  headerSub: { fontSize: FontSize.base, color: 'rgba(255,255,255,0.8)', marginTop: 4, includeFontPadding: false },
  filterChip: { 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: Radius.full, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    minHeight: 36, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterChipActive: { backgroundColor: '#fff' },
  filterText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: 'rgba(255,255,255,0.9)', includeFontPadding: false },
  filterTextActive: { color: Colors.primary },
  empty: { flex: 1, alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary, includeFontPadding: false },
});
