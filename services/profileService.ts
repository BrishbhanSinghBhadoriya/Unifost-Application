export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  is_admin?: boolean;
  created_at?: string;
}

export const profileService = {
  getStats: async () => {
    // Simulate API call
    return {
      data: {
        totalUsers: 1250,
        totalEnrollments: 3400,
        totalEnquiries: 450,
        totalCertificates: 850,
      },
    };
  },

  getAllUsers: async (): Promise<{ data?: UserProfile[]; error?: string }> => {
    // Mock users for admin view
    const mockUsers: UserProfile[] = [
      {
        id: '1',
        email: 'admin@unifost.com',
        username: 'Main Admin',
        is_admin: true,
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: '2',
        email: 'user@unifost.com',
        username: 'Learner One',
        is_admin: false,
        created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
    ];
    return { data: mockUsers };
  },

  toggleAdmin: async (userId: string, is_admin: boolean): Promise<{ error?: string }> => {
    console.log(`Setting user ${userId} admin status to ${is_admin}`);
    return {};
  },
};
