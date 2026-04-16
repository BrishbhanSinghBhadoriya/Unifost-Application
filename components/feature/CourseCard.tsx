import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { CertificationCourse } from '@/constants/indianCourses';
import { ProgressBar } from './ProgressBar';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CourseCardProps {
  course: CertificationCourse;
  onPress: () => void;
  isEnrolled?: boolean;
  progress?: number;
  variant?: 'default' | 'featured' | 'horizontal';
  style?: ViewStyle;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onPress,
  isEnrolled,
  progress,
  variant = 'default',
  style,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  const handlePressIn = () => (scale.value = 0.98);
  const handlePressOut = () => (scale.value = 1);

  if (variant === 'featured') {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.featuredContainer, animatedStyle, style]}
      >
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop' }} 
          style={styles.featuredImage} 
          contentFit="cover" 
          transition={300} 
        />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.featuredGradient}
        />
        <View style={styles.featuredContent}>
          <View style={styles.badgeRow}>
            <View style={[styles.categoryBadge, { backgroundColor: Colors.primary + '30' }]}>
              <Text style={styles.categoryText}>{course.category}</Text>
            </View>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={2}>
            {course.title}
          </Text>
          <View style={styles.featuredFooter}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.featuredRatingText}>4.8</Text>
              <Text style={styles.studentCount}> (1.2k)</Text>
            </View>
            <Text style={styles.featuredPrice}>{course.fees}</Text>
          </View>
        </View>
      </AnimatedPressable>
    );
  }

  if (variant === 'horizontal') {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.horizontalContainer, animatedStyle, style]}
      >
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop' }} 
          style={styles.horizontalImage} 
          contentFit="cover" 
          transition={300} 
        />
        <View style={styles.horizontalContent}>
          <Text style={styles.title} numberOfLines={1}>
            {course.title}
          </Text>
          <Text style={styles.instructorName} numberOfLines={1}>
            {course.university}
          </Text>
          <View style={styles.horizontalFooter}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>4.7</Text>
            </View>
            <Text style={styles.price}>{course.fees}</Text>
          </View>
        </View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle, style]}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop' }} 
          style={styles.image} 
          contentFit="cover" 
          transition={300} 
        />
        <View style={styles.imageOverlay}>
          <View style={styles.categoryBadgeSmall}>
            <Text style={styles.categoryTextSmall}>{course.category}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>
        
        <Text style={styles.universityText} numberOfLines={1}>
          {course.university}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.infoRow}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people" size={14} color={Colors.textSecondary} />
            <Text style={styles.infoText}>2.4k</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={14} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{course.duration.split(' ')[0]}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          {progress !== undefined ? (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
              </View>
              <ProgressBar progress={progress} height={6} />
            </View>
          ) : (
            <View style={styles.footerContent}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Course Fee</Text>
                <Text style={styles.priceText}>{course.fees}</Text>
              </View>
              
              {isEnrolled ? (
                <View style={styles.enrolledBadge}>
                  <Text style={styles.enrolledText}>Enrolled</Text>
                </View>
              ) : (
                <LinearGradient
                  colors={Colors.primaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.viewDetailsButton}
                >
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </LinearGradient>
              )}
            </View>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  imageWrapper: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  categoryBadgeSmall: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  categoryTextSmall: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 6,
  },
  universityText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewDetailsButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  enrolledBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  enrolledText: {
    color: Colors.success,
    fontSize: 13,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  progressPct: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  featuredContainer: {
    width: 280,
    height: 340,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#000',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  badgeRow: {
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    lineHeight: 28,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredRatingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  studentCount: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  featuredPrice: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  horizontalImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  horizontalContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  instructorName: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
