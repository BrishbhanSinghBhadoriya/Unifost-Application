import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/template';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { CERTIFICATION_COURSES } from '@/constants/indianCourses';
import { UNIVERSITY_COURSES, TOP_UNIVERSITIES } from '@/constants/universityCourses';
import { CourseCard } from '@/components/feature/CourseCard';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInRight
} from 'react-native-reanimated';

const CATEGORIES = [
  { id: 'all', label: 'All Programs', icon: 'grid' },
  { id: 'degree', label: 'Degree Courses', icon: 'book' },
  { id: 'cert', label: 'Certification', icon: 'award' },
  { id: 'ai', label: 'AI & Data', icon: 'cpu' },
  { id: 'business', label: 'Business', icon: 'bar-chart-2' },
] as const;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [mainType, setMainType] = useState<'university' | 'certification'>('university');

  const displayName = user?.email?.split('@')[0] || 'Learner';

  // Combine both types of courses with a unified type for UI access
  const ALL_COURSES = [
    ...UNIVERSITY_COURSES.map(c => ({ ...c, type: 'university' })),
    ...CERTIFICATION_COURSES.map(c => ({ 
      ...c, 
      type: 'certification', 
      category: 'Certification' as const,
      image: c.image || undefined,
      discount: c.discount || undefined
    }))
  ];

  const filteredCourses = ALL_COURSES.filter(c => {
    const matchType = mainType === 'university' ? c.type === 'university' : c.type === 'certification';
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    
    // For certification, we might use categories. For university, we just show all for now in this filter.
    const matchCat =
      mainType === 'university' ? true :
      activeCategory === 'all' ? true
      : activeCategory === 'ai' ? c.title.toLowerCase().includes('ai') || c.title.toLowerCase().includes('data')
      : activeCategory === 'business' ? c.title.toLowerCase().includes('business')
      : true;

    return matchType && matchSearch && matchCat;
  });

  const featured = UNIVERSITY_COURSES.slice(0, 5);
  const topOffers = ALL_COURSES.filter(c => c.discount).slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header Section */}
        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC'] as const}
          style={[styles.header, { paddingTop: insets.top + 20 }]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>{displayName} ✨</Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable style={styles.iconButton} onPress={() => router.push('/notifications' as any)}>
                <Feather name="bell" size={22} color={Colors.text} />
                <View style={styles.badgeDot} />
              </Pressable>
              <Pressable 
                style={styles.profileAvatar} 
                onPress={() => router.push('/(tabs)/profile')}
              >
                <Image 
                  source={{ uri: `https://ui-avatars.com/api/?name=${displayName}&background=6C63FF&color=fff` }} 
                  style={styles.avatarImage} 
                />
              </Pressable>
            </View>
          </View>

          {/* Premium Search Bar */}
          <Animated.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.searchContainer}
          >
            <View style={styles.searchWrapper}>
              <Feather name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={mainType === 'university' ? "Search universities, degrees..." : "Search certification courses..."}
                placeholderTextColor={Colors.textLight}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </Animated.View>

          {/* Main Selection Buttons - Separated */}
          <View style={styles.mainToggleContainer}>
            <Pressable 
              style={[styles.mainToggle, mainType === 'university' && styles.mainToggleActive]}
              onPress={() => setMainType('university')}
            >
              <View style={[styles.toggleIconContainer, mainType === 'university' && styles.toggleIconContainerActive]}>
                <MaterialIcons name="school" size={22} color={mainType === 'university' ? Colors.primary : Colors.textSecondary} />
              </View>
              <Text style={[styles.mainToggleText, mainType === 'university' && styles.mainToggleTextActive]}>Universities</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.mainToggle, mainType === 'certification' && styles.mainToggleActive]}
              onPress={() => setMainType('certification')}
            >
              <View style={[styles.toggleIconContainer, mainType === 'certification' && styles.toggleIconContainerActive]}>
                <MaterialIcons name="workspace-premium" size={22} color={mainType === 'certification' ? Colors.primary : Colors.textSecondary} />
              </View>
              <Text style={[styles.mainToggleText, mainType === 'certification' && styles.mainToggleTextActive]}>Certifications</Text>
            </Pressable>
          </View>
        </LinearGradient>

        {!search && (
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            {mainType === 'certification' && (
              /* Category Chips for Certifications */
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.categoryList}
              >
                {CATEGORIES.filter(c => c.id !== 'degree').map((cat, index) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <Pressable
                      key={cat.id}
                      onPress={() => setActiveCategory(cat.id)}
                      style={[
                        styles.categoryPill, 
                        isActive && styles.categoryPillActive,
                        { marginLeft: index === 0 ? Spacing.xl : 10 }
                      ]}
                    >
                      <Feather 
                        name={cat.icon as any} 
                        size={16} 
                        color={isActive ? "#fff" : "#9ca3af"} 
                      />
                      <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                        {cat.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}

            {/* Featured Offers / Banner */}
            {topOffers.filter(o => mainType === 'university' ? o.type === 'university' : o.type === 'certification').length > 0 && (
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Exclusive Offers</Text>
                </View>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  contentContainerStyle={styles.offerBannerList}
                >
                  {topOffers.filter(o => mainType === 'university' ? o.type === 'university' : o.type === 'certification').map((offer, idx) => (
                    <View key={idx} style={styles.heroSection}>
                      <LinearGradient
                        colors={['#6C63FF', '#3B32FF'] as const}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.heroCard}
                      >
                        <View style={styles.heroContent}>
                          <View style={styles.heroBadge}>
                            <Text style={styles.heroBadgeText}>{offer.discount || 'Special Offer'}</Text>
                          </View>
                          <Text style={styles.heroTitle} numberOfLines={2}>{offer.title}</Text>
                          <Text style={styles.heroSubtitle} numberOfLines={1}>{offer.university}</Text>
                          <Pressable 
                            style={styles.heroCTA}
                            onPress={() => router.push(`/course/${offer.id}` as any)}
                          >
                            <Text style={styles.heroCTAText}>Enquire Now</Text>
                            <Feather name="arrow-right" size={16} color="#6C63FF" />
                          </Pressable>
                        </View>
                        <Image 
                          source={{ uri: offer.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop' }} 
                          style={styles.heroImage}
                        />
                      </LinearGradient>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </Animated.View>
        )}

        <View style={styles.contentBody}>
          {search ? (
            <View style={styles.resultsContainer}>
              <Text style={styles.sectionTitle}>Search Results ({filteredCourses.length})</Text>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((c, i) => (
                  <Animated.View key={c.id} entering={FadeInDown.delay(i * 100)}>
                    <CourseCard 
                      course={c as any} 
                      variant="horizontal" 
                      onPress={() => router.push(`/course/${c.id}` as any)} 
                    />
                  </Animated.View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Feather name="search" size={60} color="#9ca3af" />
                  <Text style={styles.emptyStateText}>No {mainType === 'university' ? 'universities or degrees' : 'certifications'} found matching "{search}"</Text>
                </View>
              )}
            </View>
          ) : (
            <>
              {mainType === 'university' ? (
                <>
                  {/* Top Universities Grid */}
                  <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Top Universities</Text>
                      <Pressable>
                        <Text style={styles.seeAll}>See All</Text>
                      </Pressable>
                    </View>
                    <View style={styles.universityGrid}>
                      {TOP_UNIVERSITIES.map((uni) => (
                        <Pressable 
                          key={uni.id} 
                          style={styles.universityCard}
                          onPress={() => router.push({ pathname: '/(tabs)/courses', params: { university: uni.name } } as any)}
                        >
                          <View style={styles.uniLogoContainer}>
                            <Image source={{ uri: uni.logo }} style={styles.uniLogo} contentFit="contain" />
                          </View>
                          <Text style={styles.uniName} numberOfLines={2}>{uni.name}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* Featured Degrees */}
                  <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Featured Degree Programs</Text>
                    </View>
                    <FlatList
                      data={featured}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.featuredList}
                      keyExtractor={item => item.id}
                      renderItem={({ item, index }) => (
                        <Animated.View entering={FadeInRight.delay(index * 150)}>
                          <CourseCard 
                            course={item as any} 
                            variant="featured" 
                            onPress={() => router.push(`/course/${item.id}` as any)} 
                          />
                        </Animated.View>
                      )}
                    />
                  </View>
                </>
              ) : (
                <>
                  {/* Certification Courses Section */}
                  <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        {activeCategory === 'all' ? '🔥 Top Certifications' : CATEGORIES.find(c => c.id === activeCategory)?.label}
                      </Text>
                    </View>
                    <View style={styles.verticalList}>
                      {filteredCourses.slice(0, 10).map((item, index) => (
                        <Animated.View key={item.id} entering={FadeInDown.delay(index * 100)}>
                          <CourseCard 
                            key={item.id}
                            course={item as any} 
                            onPress={() => router.push(`/course/${item.id}` as any)} 
                          />
                        </Animated.View>
                      ))}
                    </View>
                  </View>
                </>
              )}
            </>
          )}
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
  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    borderWidth: 1.5,
    borderColor: Colors.surface,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    marginTop: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: FontSize.base,
  },
  mainToggleContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  mainToggle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
    ...Shadows.sm,
  },
  mainToggleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    ...Shadows.md,
  },
  toggleIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleIconContainerActive: {
    backgroundColor: '#fff',
  },
  mainToggleText: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mainToggleTextActive: {
    color: '#fff',
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    paddingVertical: 20,
    paddingRight: Spacing.xl,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  categoryPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryLabelActive: {
    color: '#fff',
  },
  heroSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: 24,
  },
  heroCard: {
    height: 180,
    borderRadius: Radius.xl,
    padding: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  heroContent: {
    flex: 1,
    zIndex: 1,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    width: '80%',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 16,
    width: '70%',
  },
  heroCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 6,
  },
  heroCTAText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroImage: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 140,
    height: 140,
    opacity: 0.8,
  },
  contentBody: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  featuredList: {
    paddingLeft: Spacing.xl,
    paddingRight: Spacing.xl,
  },
  verticalList: {
    paddingHorizontal: Spacing.xl,
  },
  resultsContainer: {
    paddingHorizontal: Spacing.xl,
  },
  offerBannerList: {
    paddingRight: Spacing.xl,
  },
  universityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.xl,
    justifyContent: 'space-between',
    gap: 16,
  },
  universityList: {
    paddingLeft: Spacing.xl,
    paddingRight: Spacing.xl,
    gap: 16,
  },
  universityCard: {
    alignItems: 'center',
    width: (width - (Spacing.xl * 2) - 32) / 3, // 3 items per row with gap
    marginBottom: 8,
  },
  uniLogoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 8,
    ...Shadows.sm,
  },
  uniLogo: {
    width: '80%',
    height: '80%',
  },
  uniName: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 16,
  },
  emptyStateText: {
    color: '#9ca3af',
    fontSize: FontSize.base,
    textAlign: 'center',
  },
});
