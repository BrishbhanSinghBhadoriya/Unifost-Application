import React, { createContext, useContext, useState } from 'react';

interface Profile {
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
}

interface ProfileContextType {
  profile: Profile | null;
  isAdmin: boolean;
  updateProfile: (profile: Partial<Profile>) => Promise<{ error?: string }>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>({
    username: 'Learner',
    email: 'user@unifost.com',
  });

  const isAdmin = true; // For demo purposes

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setProfile(prev => prev ? { ...prev, ...updates } : updates as Profile);
      return {};
    } catch (e: any) {
      return { error: e.message };
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, isAdmin, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
