import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, StatusBar } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { profile } = useProfile();
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

  const displayName = profile?.username || user?.email?.split('@')[0] || 'Learner';

  const menuItems = [
    { icon: 'award', label: 'My Certificates', route: '/(tabs)/my-learning', color: '#FFD700' },
    { icon: 'book-open', label: 'My Courses', route: '/(tabs)/my-learning', color: Colors.primary },
    { icon: 'bell', label: 'Notifications', route: '/notifications', color: '#FF6B6B' },
    { icon: 'settings', label: 'Settings', route: '/settings', color: '#4FD1C5' },
    { icon: 'help-circle', label: 'Help Center', route: '/help-center', color: '#F6AD55' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Premium Header */}
        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={[styles.header, { paddingTop: insets.top + 20 }]}
        >
          <Animated.View entering={FadeInDown.duration(600)} style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#6C63FF', '#3B32FF']}
                style={styles.avatarGradient}
              >
                <Image 
                  source={{ uri: profile?.avatar || `https://ui-avatars.com/api/?name=${displayName}&background=FFFFFF&color=6C63FF&size=128` }} 
                  style={styles.avatarImage} 
                />
              </LinearGradient>
              <Pressable style={styles.editBadge} onPress={() => router.push('/profile-edit')}>
                <Feather name="camera" size={14} color="#fff" />
              </Pressable>
            </View>
            <Text style={styles.userName}>{displayName} ✨</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            
            <Pressable style={styles.editProfileBtn} onPress={() => router.push('/profile-edit')}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </Pressable>
          </Animated.View>
        </LinearGradient>

        {/* Stats Row */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>Hours</Text>
          </View>
        </Animated.View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {menuItems.map((item, index) => (
            <Animated.View key={index} entering={FadeInRight.delay(index * 100)}>
              <Pressable 
                style={styles.menuItem}
                onPress={() => item.route !== '#' ? router.push(item.route as any) : Alert.alert('Coming Soon', 'This feature will be available soon.')}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: item.color + '15' }]}>
                  <Feather name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Feather name="chevron-right" size={20} color={Colors.textLight} />
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Logout Section */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.logoutSection}>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Feather name="log-out" size={20} color="#FF6B6B" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
          <Text style={styles.versionText}>Version 1.2.0</Text>
        </Animated.View>
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
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 47,
  },
  editBadge: {
    position: 'absolute',    bottom: 0,    right: 0,    backgroundColor: Colors.primary,    width: 32,    height: 32,    borderRadius: 16,    borderWidth: 3,    borderColor: '#FFFFFF',    justifyContent: 'center',    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',    color: Colors.text,    marginBottom: 4,
  },
  userEmail: {
    fontSize: FontSize.sm,    color: Colors.textSecondary,    marginBottom: 20,
  },
  editProfileBtn: {
    backgroundColor: Colors.surface,    paddingHorizontal: 24,    paddingVertical: 10,    borderRadius: Radius.full,    borderWidth: 1,    borderColor: Colors.border,
  },
  editProfileText: {
    color: Colors.primary,    fontWeight: '600',    fontSize: FontSize.sm,
  },
  statsCard: {
    flexDirection: 'row',    backgroundColor: '#FFFFFF',    marginHorizontal: Spacing.xl,    marginTop: -30,    borderRadius: 24,    padding: 20,    shadowColor: '#000',    shadowOffset: { width: 0, height: 10 },    shadowOpacity: 0.1,    shadowRadius: 20,    elevation: 10,    borderWidth: 1,    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,    fontWeight: 'bold',    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,    color: Colors.textSecondary,    marginTop: 4,
  },
  statDivider: {
    width: 1,    height: '60%',    backgroundColor: Colors.border,    alignSelf: 'center',
  },
  menuSection: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,    fontWeight: 'bold',    color: Colors.text,    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',    alignItems: 'center',    backgroundColor: '#FFFFFF',    padding: 16,    borderRadius: 16,    marginBottom: 12,    borderWidth: 1,    borderColor: Colors.border,
  },
  menuIconContainer: {
    width: 40,    height: 40,    borderRadius: 12,    justifyContent: 'center',    alignItems: 'center',    marginRight: 16,
  },
  menuLabel: {
    flex: 1,    fontSize: FontSize.base,    fontWeight: '500',    color: Colors.text,
  },
  logoutSection: {
    paddingHorizontal: Spacing.xl,    marginTop: 20,    alignItems: 'center',
  },
  logoutBtn: {
    flexDirection: 'row',    alignItems: 'center',    justifyContent: 'center',    padding: 16,    width: '100%',    borderRadius: 16,    backgroundColor: '#FFF5F5',    borderWidth: 1,    borderColor: '#FED7D7',
  },
  logoutText: {
    marginLeft: 8,    fontSize: FontSize.base,    fontWeight: '600',    color: '#E53E3E',
  },
  versionText: {
    marginTop: 20,    fontSize: 12,    color: Colors.textLight,
  },
});
