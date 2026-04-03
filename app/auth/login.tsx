import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)' as any);
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#1e1b4b', '#4f46e5']}
          style={[styles.headerGradient, { paddingTop: insets.top + 40 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerGlass}>
            <View style={styles.logoIconBg}>
              <MaterialIcons name="school" size={48} color="#4f46e5" />
            </View>
            <Text style={styles.headerTitle}>Unifost</Text>
            <Text style={styles.headerTitle}>Welcome Back</Text>

          </View>
        </LinearGradient>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputField}>
              <MaterialIcons name="email" size={20} color="#9ca3af" style={styles.iconStyle} />
              <TextInput
                style={styles.textInput}
                placeholder="hello@example.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputField}>
              <MaterialIcons name="lock-outline" size={20} color="#9ca3af" style={styles.iconStyle} />
              <TextInput
                style={styles.textInput}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9ca3af"
                />
              </Pressable>
            </View>
          </View>

          <Pressable onPress={() => router.push('/auth/forgot-password')} style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
               colors={['#4f46e5', '#3730a3']}
               style={[styles.primaryBtn, { opacity: loading ? 0.7 : 1 }]}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 0 }}
            >
              {loading ? (
                 <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.btnText}>Sign In securely</Text>
              )}
            </LinearGradient>
          </Pressable>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push('/auth/register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    height: 340,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerGlass: {
    alignItems: 'center',
    paddingTop: 10,
  },
  logoIconBg: {
    width: 88,
    height: 88,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: 40,
    marginTop: -40,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconStyle: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: FontSize.base,
    color: '#1f2937',
    fontWeight: '500',
  },
  eyeBtn: {
    padding: 8,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 32,
    marginTop: -8,
  },
  forgotText: {
    color: '#4f46e5',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  primaryBtn: {
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  btnText: {
    color: '#ffffff',
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    paddingBottom: 40,
  },
  footerText: {
    color: '#6b7280',
    fontSize: FontSize.base,
  },
  footerLink: {
    color: '#4f46e5',
    fontSize: FontSize.base,
    fontWeight: 'bold',
  },
});
