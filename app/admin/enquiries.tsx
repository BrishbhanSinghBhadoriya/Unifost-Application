import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { enquiryService, Enquiry } from '@/services/enquiryService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAlert } from '@/template';
import { Badge } from '@/components/ui/Badge';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

const statusVariant: Record<string, 'warning' | 'success' | 'error' | 'info'> = {
  pending: 'warning',
  contacted: 'info',
  enrolled: 'success',
  closed: 'error',
};

export default function AdminEnquiriesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await enquiryService.getAllEnquiries();
    if (error) showAlert('Error', error);
    if (data) setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const handleStatusUpdate = (enquiry: Enquiry) => {
    const statuses = ['pending', 'contacted', 'enrolled', 'closed'];
    const buttons = statuses.map(s => ({
      text: s.charAt(0).toUpperCase() + s.slice(1),
      style: 'default' as const,
      onPress: async () => {
        await enquiryService.updateStatus(enquiry.id, s);
        await fetchEnquiries();
      },
    }));

    showAlert(
      'Update Status',
      `Change status for ${enquiry.name}`,
      [...buttons, { text: 'Cancel', style: 'cancel' as const }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Enquiries</Text>
          <Text style={styles.headerSub}>{enquiries.length} total enquiries</Text>
        </View>
        <Pressable onPress={fetchEnquiries} style={styles.refreshBtn} hitSlop={8}>
          <MaterialIcons name="refresh" size={20} color="#fff" />
        </Pressable>
      </LinearGradient>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={enquiries}
          keyExtractor={e => e.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 50).duration(350)}>
              <View style={[styles.card, Shadows.sm]}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                  </View>
                  <Badge label={item.status} variant={statusVariant[item.status] ?? 'default'} />
                </View>
                {item.phone && (
                  <View style={styles.row}>
                    <MaterialIcons name="phone" size={14} color={Colors.textSecondary} />
                    <Text style={styles.rowText}>{item.phone}</Text>
                  </View>
                )}
                {item.course_interested && (
                  <View style={styles.row}>
                    <MaterialIcons name="menu-book" size={14} color={Colors.textSecondary} />
                    <Text style={styles.rowText} numberOfLines={1}>{item.course_interested}</Text>
                  </View>
                )}
                {item.message && (
                  <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                )}
                <View style={styles.footer}>
                  <Text style={styles.date}>
                    {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </Text>
                  <Pressable onPress={() => handleStatusUpdate(item)} style={styles.updateBtn}>
                    <MaterialIcons name="edit" size={14} color={Colors.primary} />
                    <Text style={styles.updateText}>Update Status</Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          )}
          contentContainerStyle={{ padding: Spacing.md, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.empty}>
                <MaterialIcons name="support-agent" size={56} color={Colors.textLight} />
                <Text style={styles.emptyText}>No enquiries yet</Text>
              </View>
            ) : null
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
  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.primary + '18', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary, includeFontPadding: false },
  name: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, includeFontPadding: false },
  email: { fontSize: FontSize.sm, color: Colors.textSecondary, includeFontPadding: false },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  rowText: { fontSize: FontSize.sm, color: Colors.text, flex: 1, includeFontPadding: false },
  message: { fontSize: FontSize.sm, color: Colors.textSecondary, fontStyle: 'italic', marginTop: 4, lineHeight: 18, includeFontPadding: false },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.borderLight },
  date: { fontSize: FontSize.xs, color: Colors.textLight, includeFontPadding: false },
  updateBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary + '12', paddingVertical: 5, paddingHorizontal: 10, borderRadius: Radius.full },
  updateText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: FontWeight.semibold, includeFontPadding: false },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary, includeFontPadding: false },
});
