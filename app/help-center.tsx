import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function HelpCenterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const faqs = [
    {
      question: 'How do I download my certificate?',
      answer: 'Go to "My Learning" tab, select "Completed" courses, and tap on the course to download your verified certificate.'
    },
    {
      question: 'How to enroll in a new course?',
      answer: 'Browse the "Explore" tab, select a course you like, and tap "Enroll Now" to start your learning journey.'
    },
    {
      question: 'Can I access courses offline?',
      answer: 'Currently, an active internet connection is required to stream video lessons and access course materials.'
    },
    {
      question: 'How to contact my mentor?',
      answer: 'Each course has a dedicated discussion forum where you can post queries and interact with mentors and peers.'
    }
  ];

  const contactOptions = [
    { icon: 'mail', label: 'Email Support', detail: 'support@unifost.com', color: '#6C63FF', action: () => Alert.alert('Support', 'Drafting an email to support@unifost.com...') },
    { icon: 'phone', label: 'Call Us', detail: '+91 1800 123 456', color: '#10B981', action: () => Alert.alert('Support', 'Connecting you to our toll-free support line...') },
    { icon: 'message-circle', label: 'Live Chat', detail: 'Available 9AM - 6PM', color: '#00D4FF', action: () => Alert.alert('Support', 'Connecting to a live agent. Please wait...') },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="chevron-left" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchTitle}>How can we help you?</Text>
          <View style={styles.searchWrapper}>
            <Feather name="search" size={20} color={Colors.text} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search topics, keywords..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor={Colors.text}
            />
          </View>
        </View>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactGrid}>
            {contactOptions.map((option, idx) => (
              <Pressable key={idx} style={styles.contactCard} onPress={option.action}>
                <View style={[styles.contactIconBg, { backgroundColor: option.color + '15' }]}>
                  <Feather name={option.icon as any} size={22} color={option.color} />
                </View>
                <Text style={styles.contactLabel}>{option.label}</Text>
                <Text style={styles.contactDetail}>{option.detail}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular FAQs</Text>
          {faqs.map((faq, idx) => (
            <View key={idx} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
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
  },
  searchContainer: {
    marginBottom: 32,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  contactIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
