import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { courseService } from '@/services/courseService';
import { CertificationCourse } from '@/constants/indianCourses';
import { Colors, FontSize, Radius, Spacing, Shadows, FontWeight } from '@/constants/theme';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/Button';

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { enroll } = useEnrollments();
  
  const [course, setCourse] = useState<CertificationCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Form State
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      const { data } = await courseService.getCourseById(id);
      if (data) setCourse(data);
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  const handleCheckout = async () => {
    if (!phone || !city || !education) {
      Alert.alert('Incomplete Form', 'Please fill in all your educational and contact details.');
      return;
    }
    
    setProcessing(true);
    
    // Simulate secure payment gateway delay
    setTimeout(async () => {
      if (course) {
        const { error } = await enroll(course.id);
        setProcessing(false);
        
        if (error) {
          Alert.alert('Enrollment Error', error);
          return;
        }

        Alert.alert(
          'Payment Successful 🎉', 
          `You have successfully enrolled in ${course.title}. Check My Learning dashboard!`,
          [
            { 
              text: 'Go to Dashboard', 
              onPress: () => router.push('/(tabs)/my-learning') 
            }
          ]
        );
      }
    }, 2500);
  };

  if (loading || !course) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Secure Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.card}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.university}>{course.university}</Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Application Fees</Text>
            <Text style={styles.rowValue}>{course.fees}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Taxes & Gateway</Text>
            <Text style={styles.rowValue}>Included</Text>
          </View>
        </View>

        {/* Application Details */}
        <Text style={styles.sectionTitle}>Application Details</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number (e.g., 91XXXXXXXX)"
            placeholderTextColor={Colors.textLight}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Current City"
            placeholderTextColor={Colors.textLight}
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="Highest Education Qualification"
            placeholderTextColor={Colors.textLight}
            value={education}
            onChangeText={setEducation}
          />
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.card}>
          <Pressable 
            style={[styles.paymentOption, paymentMethod === 'upi' && styles.paymentActive]} 
            onPress={() => setPaymentMethod('upi')}
          >
            <Ionicons name="qr-code" size={24} color={paymentMethod === 'upi' ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.paymentText, paymentMethod === 'upi' && styles.paymentTextActive]}>UPI (GPay, PhonePe, Paytm)</Text>
            {paymentMethod === 'upi' && <MaterialIcons name="check-circle" size={20} color={Colors.primary} />}
          </Pressable>

          <Pressable 
            style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentActive, { borderTopWidth: 0, borderBottomWidth: 0 }]} 
            onPress={() => setPaymentMethod('card')}
          >
            <Ionicons name="card" size={24} color={paymentMethod === 'card' ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.paymentText, paymentMethod === 'card' && styles.paymentTextActive]}>Credit / Debit Card</Text>
            {paymentMethod === 'card' && <MaterialIcons name="check-circle" size={20} color={Colors.primary} />}
          </Pressable>

          <Pressable 
            style={[styles.paymentOption, paymentMethod === 'netbanking' && styles.paymentActive]} 
            onPress={() => setPaymentMethod('netbanking')}
          >
            <MaterialIcons name="account-balance" size={24} color={paymentMethod === 'netbanking' ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.paymentText, paymentMethod === 'netbanking' && styles.paymentTextActive]}>Net Banking</Text>
            {paymentMethod === 'netbanking' && <MaterialIcons name="check-circle" size={20} color={Colors.primary} />}
          </Pressable>
        </View>

        {/* Note */}
        <Text style={styles.secureText}>
          <MaterialIcons name="lock" size={14} color={Colors.success} /> Payments are 100% secure and encrypted.
        </Text>
      </ScrollView>

      {/* Footer sticky button */}
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Text style={styles.totalText}>Total Payment</Text>
          <Text style={styles.totalAmount}>{course.fees}</Text>
        </View>
        <Button 
          title={processing ? "Processing..." : `Pay Securely`} 
          onPress={handleCheckout} 
          loading={processing}
          icon={<MaterialIcons name="security" size={18} color="#fff" />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  scrollContent: { padding: Spacing.md, paddingBottom: 100 },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 8, marginTop: Spacing.sm },
  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: 16, marginBottom: Spacing.md, ...Shadows.sm },
  courseTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 4 },
  university: { fontSize: FontSize.sm, color: Colors.primary, marginBottom: 12 },
  divider: { height: 1, backgroundColor: Colors.borderLight, marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  rowLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  rowValue: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: 12,
    fontSize: FontSize.base,
    color: Colors.text,
    marginBottom: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  paymentActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  paymentText: { flex: 1, marginLeft: 12, fontSize: FontSize.base, color: Colors.textSecondary, fontWeight: FontWeight.medium },
  paymentTextActive: { color: Colors.primary, fontWeight: FontWeight.bold },
  secureText: { fontSize: FontSize.sm, color: Colors.success, textAlign: 'center', marginTop: Spacing.md },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  totalText: { fontSize: FontSize.md, color: Colors.textSecondary },
  totalAmount: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary },
});
