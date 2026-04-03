import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  Platform,
} from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/template';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { CERTIFICATION_COURSES, CertificationCourse } from '@/constants/indianCourses';
import { CourseCard } from '@/components/feature/CourseCard';
import { useRouter } from 'expo-router';

// Premium design implementation leveraging native styling, expo-image, linear gradients

const CATEGORIES = [
  { id: 'all', label: 'All Programs', icon: 'grid-view' },
  { id: 'ai', label: 'AI & Data Science', icon: 'psychology' },
  { id: 'business', label: 'Business Analytics', icon: 'trending-up' },
  { id: 'dev', label: 'Development', icon: 'code' },
] as const;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const displayName = user?.email?.split('@')[0] || 'Learner';

  const filteredCourses = CERTIFICATION_COURSES.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === 'all' ? true
      : activeCategory === 'ai' ? ['Data Science', 'Artificial Intelligence', 'AI/ML'].includes(c.category)
      : activeCategory === 'business' ? ['Business Analytics', 'Business'].includes(c.category)
      : activeCategory === 'dev' ? ['Web Development', 'Cloud Computing', 'Cybersecurity'].includes(c.category)
      : true;
    return matchSearch && matchCat;
  });

  const featured = CERTIFICATION_COURSES.slice(0, 5);
  const trending = CERTIFICATION_COURSES.slice(6, 12);

  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.headerBackground}>
        <LinearGradient
          colors={['#1e1b4b', '#4338ca']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Dynamic Header Frame */}
        <View style={[styles.headerFrame, { paddingTop: insets.top + 20 }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good to see you,</Text>
              <Text style={styles.userName}>{displayName} 👋</Text>
            </View>
            <Pressable style={styles.profileAvatar} onPress={() => router.push('/(tabs)/profile')}>
              <LinearGradient colors={['#6366f1', '#4f46e5']} style={styles.avatarGradient}>
                <Text style={styles.avatarText}>{displayName.slice(0, 1).toUpperCase()}</Text>
              </LinearGradient>
            </Pressable>
          </View>

          {/* Premium Search Bar */}
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={22} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Indian University programs..."
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
               <Pressable onPress={() => setSearch('')}>
                 <Ionicons name="close-circle" size={20} color="#9ca3af" />
               </Pressable>
            )}
          </View>
        </View>

        {!search && (
          <View style={styles.heroBanner}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop' }} 
              style={StyleSheet.absoluteFill} 
              contentFit="cover" 
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.85)']}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.heroContent}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Top Universities</Text>
              </View>
              <Text style={styles.heroTitle}>Certifications  with India's Top University</Text>
              <Text style={styles.heroSubtitle}>Learn from IITs, IIMs & more</Text>
            </View>
          </View>
        )}

        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                  style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                >
                  <MaterialIcons name={cat.icon as any} size={18} color={isActive ? '#fff' : '#4f46e5'} />
                  <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>{cat.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {search ? (
           <View style={styles.contentSection}>
             <Text style={styles.sectionTitle}>Search Results</Text>
             {filteredCourses.length > 0 ? filteredCourses.map((c) => (
               <CourseCard key={c.id} course={c as any} variant="horizontal" onPress={() => router.push(`/course/${c.id}` as any)} />
             )) : (
               <View style={styles.emptyState}>
                  <Ionicons name="search-outline" size={48} color="#9ca3af" />
                  <Text style={styles.emptyStateText}>No certificates found matching your search.</Text>
               </View>
             )}
           </View>
        ) : (
          <>
            {activeCategory !== 'all' ? (
               <View style={styles.contentSection}>
                 <Text style={styles.sectionTitle}>{CATEGORIES.find(c => c.id === activeCategory)?.label}</Text>
                 {filteredCourses.map(c => (
                   <CourseCard key={c.id} course={c as any} variant="horizontal" onPress={() => router.push(`/course/${c.id}` as any)} />
                 ))}
               </View>
            ) : (
              <>
                <View style={[styles.contentSection, { paddingHorizontal: 0, paddingLeft: Spacing.xl }]}>
                  <Text style={[styles.sectionTitle, { paddingRight: Spacing.xl }]}>Top Featured</Text>
                  <FlatList
                    data={featured}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: Spacing.xl, gap: Spacing.md }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <CourseCard course={item as any} variant="featured" onPress={() => router.push(`/course/${item.id}` as any)} style={{ marginHorizontal: 0, marginRight: 0 }} />
                    )}
                  />
                </View>

                <View style={[styles.contentSection, { marginTop: 24 }]}>
                  <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
                  </View>
                  {trending.map((item) => (
                     <CourseCard key={item.id} course={item as any} variant="horizontal" onPress={() => router.push(`/course/${item.id}` as any)} />
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Subtle modern gray background
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  headerFrame: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  profileAvatar: {
    borderRadius: Radius.full,
    padding: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  avatarGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.text,
    height: '100%',
  },
  heroBanner: {
    marginHorizontal: Spacing.xl,
    marginTop: 8,
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    backgroundColor: '#ffffff',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.sm,
    marginTop: 4,
  },
  categoriesSection: {
    marginTop: Spacing.xl,
  },
  categoryList: {
    paddingHorizontal: Spacing.xl,
    paddingRight: Spacing.xl * 2,
    gap: 12,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryPillActive: {
    backgroundColor: '#4f46e5',
  },
  categoryLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#1f2937',
  },
  categoryLabelActive: {
    color: '#ffffff',
  },
  contentSection: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.md,
    letterSpacing: -0.3,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: '#6b7280',
    fontSize: FontSize.base,
    marginTop: 12,
  }
});
