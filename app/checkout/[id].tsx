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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      const { data } = await courseService.getCourseById(id);
      if (data) setCourse(data);
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  const handleNextStep = () => {
    if (!name || !email || !phone || !city || !education) {
      Alert.alert('Incomplete Form', 'Please fill in all details to proceed.');
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setStep(2);
  };

  const handleCheckout = async () => {
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
        <Pressable 
          onPress={() => step === 2 ? setStep(1) : router.back()} 
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{step === 1 ? 'Personal Details' : 'Secure Payment'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.stepIndicator}>
        <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]} />
        <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />
        <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 ? (
          <>
            {/* Order Summary */}
            <Text style={styles.sectionTitle}>Course Summary</Text>
            <View style={styles.card}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.university}>{course.university}</Text>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Application Fees</Text>
                <Text style={styles.rowValue}>{course.fees}</Text>
              </View>
            </View>

            {/* Application Details */}
            <Text style={styles.sectionTitle}>Application Details</Text>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={Colors.textLight}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={Colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
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
          </>
        ) : (
          <>
            {/* Payment Summary */}
            <Text style={styles.sectionTitle}>Payment Summary</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Payable Amount</Text>
                <Text style={styles.totalAmountText}>{course.fees}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Billing Name</Text>
                <Text style={styles.rowValue}>{name}</Text>
              </View>
            </View>

            {/* Payment Methods */}
            <Text style={styles.sectionTitle}>Select Payment Method</Text>
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
                style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentActive]} 
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
          </>
        )}
      </ScrollView>

      {/* Footer sticky button */}
      <View style={styles.footer}>
        {step === 2 && (
          <View style={styles.footerRow}>
            <Text style={styles.totalText}>Total Payment</Text>
            <Text style={styles.totalAmount}>{course.fees}</Text>
          </View>
        )}
        <Button 
          title={step === 1 ? "Proceed to Payment" : (processing ? "Processing..." : `Pay Now`)} 
          onPress={step === 1 ? handleNextStep : handleCheckout} 
          loading={processing}
          icon={<MaterialIcons name={step === 1 ? "arrow-forward" : "security"} size={18} color="#fff" />}
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
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.border,
  },
  stepDotActive: {
    backgroundColor: Colors.primary,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  scrollContent: { padding: Spacing.md, paddingBottom: 100 },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 12, marginTop: Spacing.sm },
  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: 16, marginBottom: Spacing.md, ...Shadows.sm, borderWidth: 1, borderColor: Colors.glassBorder },
  courseTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 4 },
  university: { fontSize: FontSize.sm, color: Colors.secondary, marginBottom: 12 },
  divider: { height: 1, backgroundColor: Colors.glassBorder, marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  rowLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  rowValue: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  totalAmountText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.secondary },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: 12,
    fontSize: FontSize.base,
    color: Colors.text,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  paymentActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  paymentText: { flex: 1, marginLeft: 16, fontSize: FontSize.base, color: Colors.textSecondary, fontWeight: FontWeight.medium },
  paymentTextActive: { color: Colors.text, fontWeight: FontWeight.bold },
  secureText: { fontSize: FontSize.sm, color: Colors.success, textAlign: 'center', marginTop: Spacing.md, marginBottom: 20 },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBorder,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalText: { fontSize: FontSize.md, color: Colors.textSecondary },
  totalAmount: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.secondary },
});
