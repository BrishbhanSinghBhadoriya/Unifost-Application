export { useAuth, AuthProvider } from '../contexts/AuthContext';
import { Alert, AlertButton, AlertOptions } from 'react-native';

export const useAlert = () => {
  const showAlert = (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => {
    Alert.alert(title, message, buttons, options);
  };

  return { showAlert };
};
