import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { User } from '@/contexts/AuthContext';
import { useAlert } from '@/template';
import { Badge } from '@/components/ui/Badge';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function AdminUsersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(usersList);
    } catch (e: any) {
      showAlert('Error', e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    showAlert('Confirm', `Set ${user.name ?? user.email} as ${newRole}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            const userDoc = doc(db, 'users', user.id);
            await updateDoc(userDoc, { role: newRole });
            await fetchUsers();
          } catch (e: any) {
            showAlert('Error', e.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Users</Text>
          <Text style={styles.headerSub}>{users.length} registered users</Text>
        </View>
        <Pressable onPress={fetchUsers} style={styles.refreshBtn} hitSlop={8}>
          <MaterialIcons name="refresh" size={20} color="#fff" />
        </Pressable>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={u => u.id}
          renderItem={({ item, index }) => {
            const initial = (item.name ?? item.email ?? '?').charAt(0).toUpperCase();
            return (
              <Animated.View entering={FadeInDown.delay(index * 40).duration(350)}>
                <View style={[styles.card, Shadows.sm]}>
                  <View style={styles.avatarWrap}>
                    <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.avatar}>
                      <Text style={styles.avatarText}>{initial}</Text>
                    </LinearGradient>
                    {item.role === 'admin' && (
                      <View style={styles.adminDot}>
                        <MaterialIcons name="admin-panel-settings" size={10} color="#fff" />
                      </View>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.username}>{item.name ?? 'Anonymous'}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 8 }}>
                    {item.role === 'admin' && <Badge label="Admin" variant="primary" size="sm" />}
                    <Pressable onPress={() => toggleAdmin(item)} style={styles.toggleBtn}>
                      <MaterialIcons
                        name={item.role === 'admin' ? 'admin-panel-settings' : 'person'}
                        size={14}
                        color={item.role === 'admin' ? Colors.error : Colors.primary}
                      />
                      <Text style={[styles.toggleText, { color: item.role === 'admin' ? Colors.error : Colors.primary }]}>
                        {item.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            );
          }}
          contentContainerStyle={{ padding: Spacing.md, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <MaterialIcons name="people" size={56} color={Colors.textLight} />
              <Text style={styles.emptyText}>No users found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  backBtn: { width: 38, height: 38, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  refreshBtn: { width: 38, height: 38, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)', includeFontPadding: false },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm },
  avatarWrap: { position: 'relative' },
  avatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  adminDot: { position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.secondary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.surface },
  username: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  email: { fontSize: FontSize.sm, color: Colors.textSecondary, includeFontPadding: false },
  toggleBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4, paddingHorizontal: 8, borderRadius: Radius.full, backgroundColor: Colors.borderLight },
  toggleText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, includeFontPadding: false },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary, includeFontPadding: false },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
