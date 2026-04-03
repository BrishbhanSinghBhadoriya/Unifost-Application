import React, { useState, useEffect } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { courseService } from '@/services/courseService';
import { Course } from '@/constants/courses';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Shadows, Spacing, FontSize, FontWeight } from '@/constants/theme';
import { Badge } from '@/components/ui/Badge';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AdminCoursesScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await courseService.getAllCourses();
      if (data) {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Courses</Text>
          <Text style={styles.headerSub}>{courses.length} total programs</Text>
        </View>
        <Pressable onPress={() => router.push('/admin/course/new' as any)} style={styles.addBtn}>
          <MaterialIcons name="add" size={22} color={Colors.primary} />
        </Pressable>
      </LinearGradient>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={c => c.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 50).duration(350)}>
              <Pressable
                onPress={() => router.push(`/admin/course/${item.id}` as any)}
                style={({ pressed }) => [styles.card, Shadows.sm, { opacity: pressed ? 0.9 : 1 }]}
              >
                <Image source={{ uri: item.thumbnail }} style={styles.thumb} contentFit="cover" transition={200} />
                <View style={{ flex: 1, padding: 12 }}>
                  <View style={{ flexDirection: 'row', gap: 6, marginBottom: 6 }}>
                    <Badge label={item.duration} variant="primary" size="sm" />
                    <Badge label={item.level} variant="default" size="sm" />
                  </View>
                  <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.courseCat}>{item.category}</Text>
                  <View style={styles.courseMeta}>
                    <MaterialIcons name="star" size={13} color={Colors.warning} />
                    <Text style={styles.courseRating}>{item.rating}</Text>
                    <Text style={styles.courseStudents}> · {item.totalStudents.toLocaleString()}</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.coursePrice}>₹{item.price.toLocaleString()}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
                    {item.isFeatured && <Badge label="Featured" variant="info" size="sm" />}
                    {item.isTrending && <Badge label="Trending" variant="promo" size="sm" />}
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          )}
          contentContainerStyle={{ padding: Spacing.md, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default AdminCoursesScreen;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  backBtn: { width: 38, height: 38, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  addBtn: { width: 38, height: 38, borderRadius: Radius.full, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)', includeFontPadding: false },
  card: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: Radius.lg, marginBottom: Spacing.sm, overflow: 'hidden' },
  thumb: { width: 110, height: 110 },
  courseTitle: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 4, includeFontPadding: false },
  courseCat: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 6, includeFontPadding: false },
  courseMeta: { flexDirection: 'row', alignItems: 'center' },
  courseRating: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text, marginLeft: 2, includeFontPadding: false },
  courseStudents: { fontSize: FontSize.xs, color: Colors.textSecondary, includeFontPadding: false },
  coursePrice: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary, includeFontPadding: false },
});
