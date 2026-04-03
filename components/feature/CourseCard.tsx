import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { CertificationCourse } from '@/constants/indianCourses';
import { ProgressBar } from './ProgressBar';

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
  if (variant === 'featured') {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.featuredContainer,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          style,
        ]}
      >
        <Image source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop' }} style={styles.featuredImage} contentFit="cover" transition={300} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.featuredGradient}
        />
        <View style={styles.featuredContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{course.category}</Text>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={2}>
            {course.title}
          </Text>
          <View style={styles.featuredFooter}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={Colors.accent} />
              <Text style={styles.featuredRatingText}>4.8</Text>
            </View>
            <Text style={styles.featuredPrice} numberOfLines={1}>{course.fees}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.horizontalContainer,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          style,
        ]}
      >
        <Image source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop' }} style={styles.horizontalImage} contentFit="cover" transition={300} />
        <View style={styles.horizontalContent}>
          <Text style={styles.title} numberOfLines={1}>
            {course.title}
          </Text>
          <Text style={styles.instructorName} numberOfLines={1}>
            {course.university}
          </Text>
          <View style={styles.horizontalFooter}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={Colors.accent} />
              <Text style={styles.ratingText}>4.7</Text>
            </View>
            <Text style={styles.price} numberOfLines={1}>{course.fees}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      <Image source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop' }} style={styles.image} contentFit="cover" transition={300} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{course.category}</Text>
          </View>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={Colors.accent} />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>

        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={14} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{course.duration}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="people-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.infoText}>2,400+ Students</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          {progress !== undefined ? (
            <View style={{ flex: 1 }}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
              </View>
              <ProgressBar progress={progress} height={4} />
            </View>
          ) : (
            <>
              <Text style={styles.price} numberOfLines={1}>{course.fees}</Text>
              {isEnrolled ? (
                <View style={styles.enrolledBadge}>
                  <Text style={styles.enrolledText}>Enrolled</Text>
                </View>
              ) : (
                <View style={styles.enrollButton}>
                  <Text style={styles.enrollButtonText}>Enroll Now</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    ...Shadows.md,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  featuredContainer: {
    width: 260,
    height: 180,
    borderRadius: Radius.lg,
    marginRight: Spacing.md,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    ...Shadows.md,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    marginTop: 8,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  featuredRatingText: {
    color: '#fff',
    fontSize: FontSize.xs,
    marginLeft: 4,
  },
  featuredPrice: {
    color: '#fff',
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
    alignItems: 'center',
  },
  horizontalImage: {
    width: 80,
    height: 80,
    borderRadius: Radius.md,
  },
  horizontalContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  image: {
    width: 120,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  instructorName: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  progressPct: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.base,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  enrolledBadge: {
    backgroundColor: Colors.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.base,
  },
  enrolledText: {
    color: Colors.success,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
});
