import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { courseService } from '@/services/courseService';
import { enquiryService } from '@/services/enquiryService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Stats {
  totalUsers: number;
  totalCourses: number;
  totalEnquiries: number;
}

const AdminDashboard = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalCourses: 0, totalEnquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      const enquiriesSnapshot = await getDocs(collection(db, 'enquiries'));
      
      setStats({
        totalUsers: usersSnapshot.size,
        totalCourses: coursesSnapshot.size,
        totalEnquiries: enquiriesSnapshot.size,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { icon: 'people', label: 'Total Users', value: stats.totalUsers, color: Colors.primary, bg: Colors.primary + '14' },
    { icon: 'menu-book', label: 'Total Courses', value: stats.totalCourses, color: Colors.success, bg: Colors.successLight },
    { icon: 'support-agent', label: 'Enquiries', value: stats.totalEnquiries, color: Colors.secondary, bg: Colors.secondary + '14' },
  ];

  const menuItems = [
    { icon: 'menu-book', label: 'Manage Courses', sub: `${stats.totalCourses} courses`, route: '/admin/courses' as any, color: Colors.primary },
    { icon: 'people', label: 'Manage Users', sub: `${stats.totalUsers} registered`, route: '/admin/users' as any, color: Colors.success },
    { icon: 'support-agent', label: 'Enquiries', sub: `${stats.totalEnquiries} received`, route: '/admin/enquiries' as any, color: Colors.secondary },
    { icon: 'notifications', label: 'Notifications', sub: 'View announcements', route: '/notifications' as any, color: Colors.warning },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <Text style={styles.headerSub}>UniFost Academy</Text>
        </View>
        <View style={styles.adminBadge}>
          <MaterialIcons name="admin-panel-settings" size={18} color="#fff" />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: Spacing.md, paddingBottom: 40 }}>
        {/* Stats Grid */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.statsGrid}>
          {statCards.map((s, i) => (
            <View key={i} style={[styles.statCard, Shadows.sm]}>
              <View style={[styles.statIcon, { backgroundColor: s.bg }]}>
                <MaterialIcons name={s.icon as any} size={24} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Management</Text>
        {menuItems.map((item, i) => (
          <Animated.View key={i} entering={FadeInDown.delay(150 + i * 60).duration(400)}>
            <Pressable
              onPress={() => router.push(item.route as any)}
              style={({ pressed }) => [styles.menuCard, Shadows.sm, { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '14' }]}>
                <MaterialIcons name={item.icon as any} size={26} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={Colors.textLight} />
            </Pressable>
          </Animated.View>
        ))}

        {/* App Info */}
        <Animated.View entering={FadeInDown.delay(450).duration(400)}>
          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.infoCard}>
            <MaterialIcons name="school" size={32} color="#fff" />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.infoTitle}>UniFost Academy</Text>
              <Text style={styles.infoSub}>Certificate Education Platform · V1.0</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  backBtn: { width: 38, height: 38, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)', includeFontPadding: false },
  adminBadge: { width: 38, height: 38, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: Spacing.lg },
  statCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center', flex: 1, minWidth: '44%', gap: 8 },
  statIcon: { width: 52, height: 52, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.extrabold, color: Colors.text, includeFontPadding: false },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center', includeFontPadding: false },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md, includeFontPadding: false },
  menuCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm },
  menuIcon: { width: 52, height: 52, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  menuSub: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2, includeFontPadding: false },
  infoCard: { borderRadius: Radius.lg, padding: Spacing.md, flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm },
  infoTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  infoSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', includeFontPadding: false },
});
