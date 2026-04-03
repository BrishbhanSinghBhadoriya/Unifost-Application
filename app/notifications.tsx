import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'promo' | 'success' | 'alert';
  created_at: string;
  is_read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Course Added!',
    body: 'Master modern web development with our new Full Stack course.',
    type: 'promo',
    created_at: new Date().toISOString(),
    is_read: false,
  },
  {
    id: '2',
    title: 'Certificate Earned',
    body: 'Congratulations! You have completed the UI/UX Design Masterclass.',
    type: 'success',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    is_read: true,
  },
  {
    id: '3',
    title: 'System Update',
    body: 'We have improved the video player for a smoother learning experience.',
    type: 'info',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    is_read: true,
  },
];

const NotificationsScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const getIcon = (type: string) => {
    switch (type) {
      case 'promo': return { name: 'megaphone-outline', color: Colors.primary };
      case 'success': return { name: 'checkmark-circle-outline', color: Colors.success };
      case 'alert': return { name: 'alert-circle-outline', color: Colors.error };
      default: return { name: 'notifications-outline', color: Colors.secondary };
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Pressable style={styles.backBtn} hitSlop={8}>
          <MaterialIcons name="done-all" size={22} color="#fff" />
        </Pressable>
      </LinearGradient>

      <FlatList
        data={notifications}
        keyExtractor={n => n.id}
        renderItem={({ item, index }) => {
          const icon = getIcon(item.type);
          return (
            <Animated.View entering={FadeInDown.delay(index * 50).duration(400)}>
              <Pressable style={[styles.notifCard, Shadows.sm, !item.is_read && styles.unreadCard]}>
                <View style={[styles.notifIcon, { backgroundColor: icon.color + '18' }]}>
                  <Ionicons name={icon.name as any} size={24} color={icon.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.notifHeader}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    {!item.is_read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notifBody} numberOfLines={2}>{item.body}</Text>
                  <Text style={styles.notifDate}>
                    {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          );
        }}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="notifications-none" size={64} color={Colors.textLight} />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  notifCard: { flexDirection: 'row', gap: 14, backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm },
  unreadCard: { borderLeftWidth: 4, borderLeftColor: Colors.primary },
  notifIcon: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  notifHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notifTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  notifBody: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, includeFontPadding: false },
  notifDate: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 6, includeFontPadding: false },
  empty: { alignItems: 'center', paddingTop: 100, gap: 12 },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary, includeFontPadding: false },
});
