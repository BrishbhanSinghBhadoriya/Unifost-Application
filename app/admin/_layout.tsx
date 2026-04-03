import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, Text, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';

export default function AdminLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (user?.role !== 'admin') {
    // Redirect non-admin users to the home screen
    router.replace('/(tabs)');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You do not have permission to access this page.</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="courses" />
      <Stack.Screen name="enquiries" />
      <Stack.Screen name="users" />
    </Stack>
  );
}