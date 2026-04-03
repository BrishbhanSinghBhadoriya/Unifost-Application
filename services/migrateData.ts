// This file is deprecated as the application now relies entirely on static offline data structures.
// Left here to prevent import crashes from older modules.

export const migrateCoursesToFirestore = async () => {
    console.log('Firebase Firestore disabled: Migration skipped.');
    return { success: true };
};
