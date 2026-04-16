import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';

type SettingItemBase = {
  label: string;
  icon: string;
};

type SwitchItem = SettingItemBase & {
  type: 'switch';
  value: boolean;
  onValueChange: (val: boolean) => void;
  onPress?: never;
};

type TextItem = SettingItemBase & {
  type: 'text';
  value: string;
  onValueChange?: never;
  onPress?: never;
};

type LinkItem = SettingItemBase & {
  type: 'link';
  onPress: () => void;
  value?: never;
  onValueChange?: never;
};

type SettingItem = SwitchItem | TextItem | LinkItem;

type SettingSection = {
  title: string;
  items: SettingItem[];
};

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Dynamic colors based on local dark mode
  const currentColors = {
    background: darkMode ? '#0A0E27' : Colors.background,
    card: darkMode ? '#151A3D' : '#FFFFFF',
    text: darkMode ? '#FFFFFF' : Colors.text,
    border: darkMode ? '#1F254B' : Colors.border,
    divider: darkMode ? '#1F254B' : Colors.border,
    sectionTitle: darkMode ? '#A0AEC0' : Colors.text,
  };

  // Content for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

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

  const handlePasswordReset = async () => {
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        Alert.alert('Security', `Password reset instructions have been sent to ${user.email}.`);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to send reset email.');
      }
    } else {
      Alert.alert('Error', 'No email associated with this account.');
    }
  };

  const showPrivacySettings = () => {
    Alert.alert('Privacy Settings', 'Manage how your data is used.\n\n- Data Sharing: Disabled\n- Profile Visibility: Public\n- Activity Tracking: Enabled', [
      { text: 'OK' }
    ]);
  };

  const showLoginActivity = () => {
    const today = new Date().toLocaleDateString();
    const now = new Date().toLocaleTimeString();
    Alert.alert('Login Activity', `Recent active sessions:\n\n- Current Device (Active Now)\n  ${today} at ${now}\n  Location: India\n- Last session: 2 days ago`, [
      { text: 'OK' }
    ]);
  };

  const showTerms = () => {
    setModalTitle('Terms of Service');
    setModalContent(
      `Welcome to Unifost Academy. By using our platform, you agree to these terms:

1. USE OF SERVICE
You must be at least 13 years old to use this service. You are responsible for maintaining account security.

2. INTELLECTUAL PROPERTY
All course content, videos, and materials are owned by Unifost Academy or its instructors. Unauthorized distribution is prohibited.

3. REFUND POLICY
Refunds are available within 7 days of purchase if less than 20% of the course has been completed.

4. USER CONDUCT
Do not engage in harassment, spamming, or attempt to compromise platform security.

5. MODIFICATIONS
We reserve the right to modify these terms at any time. Continued use implies acceptance of new terms.`
    );
    setModalVisible(true);
  };

  const showPrivacyPolicy = () => {
    setModalTitle('Privacy Policy');
    setModalContent(
      `Unifost Academy values your privacy. This policy explains how we handle your data:

1. DATA COLLECTION
We collect your name, email, and progress data to provide a personalized learning experience.

2. DATA USAGE
Your data is used to track course progress, issue certificates, and send important updates.

3. DATA SECURITY
We use industry-standard encryption (Firebase Auth) to protect your credentials.

4. THIRD PARTIES
We do not sell your personal data to third parties. We use analytics tools to improve our services.

5. YOUR RIGHTS
You can request account deletion or data export at any time via support.`
    );
    setModalVisible(true);
  };

  const settingsOptions: SettingSection[] = [
    {
      title: 'Notifications',
      items: [
        { 
          label: 'Push Notifications', 
          value: pushEnabled, 
          onValueChange: (val) => {
            setPushEnabled(val);
            console.log(`Push notifications ${val ? 'enabled' : 'disabled'}`);
          }, 
          type: 'switch',
          icon: 'bell'
        },
        { 
          label: 'Email Notifications', 
          value: emailEnabled, 
          onValueChange: (val) => {
            setEmailEnabled(val);
            console.log(`Email notifications ${val ? 'enabled' : 'disabled'}`);
          }, 
          type: 'switch',
          icon: 'mail'
        },
      ]
    },
    {
      title: 'Appearance',
      items: [
        { 
          label: 'Dark Mode', 
          value: darkMode, 
          onValueChange: (val) => setDarkMode(val), 
          type: 'switch',
          icon: 'moon'
        },
      ]
    },
    {
      title: 'Account & Security',
      items: [
        { label: 'Change Password', onPress: handlePasswordReset, type: 'link', icon: 'lock' },
        { label: 'Privacy Settings', onPress: showPrivacySettings, type: 'link', icon: 'shield' },
        { label: 'Login Activity', onPress: showLoginActivity, type: 'link', icon: 'activity' },
      ]
    },
    {
      title: 'About Unifost',
      items: [
        { label: 'Version', value: '1.2.0', type: 'text', icon: 'info' },
        { label: 'Terms of Service', onPress: showTerms, type: 'link', icon: 'file-text' },
        { label: 'Privacy Policy', onPress: showPrivacyPolicy, type: 'link', icon: 'eye' },
      ]
    }
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: currentColors.background }]}>
      <View style={[styles.header, { borderBottomColor: currentColors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="chevron-left" size={24} color={currentColors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: currentColors.text }]}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {settingsOptions.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentColors.sectionTitle }]}>{section.title}</Text>
            <View style={[styles.sectionCard, { backgroundColor: currentColors.card, borderColor: currentColors.border }]}>
              {section.items.map((item, itemIdx) => (
                <View key={itemIdx}>
                  <Pressable 
                    style={styles.settingItem}
                    onPress={item.type === 'link' ? item.onPress : undefined}
                    disabled={item.type === 'switch' || item.type === 'text'}
                  >
                    <View style={styles.settingLabelRow}>
                      <View style={styles.iconContainer}>
                        <Feather name={item.icon as any} size={18} color={Colors.primary} />
                      </View>
                      <Text style={[styles.settingLabel, { color: currentColors.text }]}>{item.label}</Text>
                    </View>
                    
                    {item.type === 'switch' ? (
                      <Switch 
                        value={item.value} 
                        onValueChange={item.onValueChange}
                        trackColor={{ false: '#D1D5DB', true: Colors.primary + '80' }}
                        thumbColor={item.value ? Colors.primary : '#F3F4F6'}
                      />
                    ) : item.type === 'text' ? (
                      <Text style={[styles.settingValue, { color: currentColors.text }]}>{item.value}</Text>
                    ) : (
                      <Feather name="chevron-right" size={18} color={currentColors.text} />
                    )}
                  </Pressable>
                  {itemIdx < section.items.length - 1 && <View style={[styles.divider, { backgroundColor: currentColors.divider }]} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#E53E3E" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>

      {/* Info Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: currentColors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: currentColors.text }]}>{modalTitle}</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={currentColors.text} />
              </Pressable>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={[styles.modalText, { color: currentColors.text }]}>{modalContent}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 64,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FED7D7',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53E3E',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    opacity: 0.8,
  },
});
