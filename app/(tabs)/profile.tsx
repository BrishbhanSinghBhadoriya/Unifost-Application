import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Sign Out', 
        style: 'destructive', 
        onPress: async () => {
          try {
            await logout();
            router.replace('/auth/login');
          } catch (e) {
            console.error(e);
          }
        }
      }
    ]);
  };

  const displayName = user?.email?.split('@')[0] || 'Learner';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const menuItems = [
    { icon: 'card-membership', label: 'My Certificates', route: '/(tabs)/my-learning' },
    { icon: 'settings', label: 'Settings & Privacy', route: '#' },
    { icon: 'help-outline', label: 'Help Center', route: '#' },
    { icon: 'info-outline', label: 'About Us', route: '#' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dynamic Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#1e1b4b', '#4338ca']}
            style={[StyleSheet.absoluteFillObject, styles.bottomRounded]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={[styles.headerContent, { paddingTop: insets.top + 20 }]}>
             <View style={styles.avatarWrapper}>
               <LinearGradient colors={['#ffffff', '#e0e7ff']} style={styles.avatarCircle}>
                 <Text style={styles.avatarText}>{avatarLetter}</Text>
               </LinearGradient>
             </View>
             <Text style={styles.userName}>{displayName}</Text>
             <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
           <View style={styles.statBox}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Enrolled</Text>
           </View>
           <View style={styles.statDivider} />
           <View style={styles.statBox}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Completed</Text>
           </View>
           <View style={styles.statDivider} />
           <View style={styles.statBox}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Certificates</Text>
           </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
           <Text style={styles.sectionTitle}>Account</Text>
           <View style={styles.menuCard}>
              {menuItems.map((item, index) => (
                <Pressable 
                  key={index} 
                  style={[styles.menuItem, index !== menuItems.length - 1 && styles.menuItemBorder]}
                  onPress={() => item.route !== '#' ? router.push(item.route as any) : Alert.alert('Coming Soon', 'This feature is currently under development and will be available in the next release.')}
                >
                  <View style={styles.menuIconBg}>
                    <MaterialIcons name={item.icon as any} size={22} color="#4f46e5" />
                  </View>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                  <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
                </Pressable>
              ))}
           </View>
        </View>

        <View style={styles.logoutSection}>
           <Pressable style={styles.logoutBtn} onPress={handleLogout}>
             <Ionicons name="log-out-outline" size={20} color="#ef4444" style={styles.logoutIcon} />
             <Text style={styles.logoutText}>Sign Out Securely</Text>
           </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  bottomRounded: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContainer: {
    paddingBottom: 60,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  avatarCircle: {
    flex: 1,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4338ca',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: Spacing.xl,
    marginTop: -40,
    borderRadius: 24,
    paddingVertical: 24,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  menuSection: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl * 1.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.md,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIconBg: {
    backgroundColor: '#eef2ff',
    padding: 10,
    borderRadius: 14,
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: '600',
    color: '#374151',
  },
  logoutSection: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    marginBottom: 40,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#fef2f2',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: FontSize.base,
    fontWeight: 'bold',
  }
});
