import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { Course } from '@/constants/courses';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/template';
import { Colors, FontSize, Spacing } from '@/constants/theme';

const CourseFormScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showAlert } = useAlert();
  const [course, setCourse] = useState<Partial<Course>>({});
  const [loading, setLoading] = useState(false);
  const isEditing = id !== 'new';

  useEffect(() => {
    if (isEditing && id) {
      const fetchCourse = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'courses', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCourse({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (e: any) {
          showAlert('Error', e.message);
        }
        setLoading(false);
      };
      fetchCourse();
    }
  }, [id, isEditing]);

  const handleSave = async () => {
    if (!course.title) {
      showAlert('Required', 'Please enter a course title');
      return;
    }
    setLoading(true);
    try {
      if (isEditing && id) {
        const courseDoc = doc(db, 'courses', id);
        await setDoc(courseDoc, course, { merge: true });
        showAlert('Success', 'Course updated successfully!');
      } else {
        await addDoc(collection(db, 'courses'), {
          ...course,
          rating: 4.5,
          totalStudents: 0,
          isFeatured: false,
          isTrending: false,
          modules: [],
        });
        showAlert('Success', 'Course created successfully!');
      }
      router.back();
    } catch (error: any) {
      showAlert('Error', error.message);
    }
    setLoading(false);
  };

  const renderField = (label: string, key: keyof Course, multiline = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={String(course[key] || '')}
        onChangeText={(text) => {
          if (key === 'price' || key === 'originalPrice') {
            const val = parseFloat(text) || 0;
            setCourse({ ...course, [key]: val });
          } else {
            setCourse({ ...course, [key]: text });
          }
        }}
        multiline={multiline}
        keyboardType={key === 'price' || key === 'originalPrice' ? 'numeric' : 'default'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{isEditing ? 'Edit Course' : 'New Course'}</Text>
      {renderField('Title', 'title')}
      {renderField('University', 'university')}
      {renderField('Short Description', 'shortDescription', true)}
      {renderField('Description', 'description', true)}
      {renderField('Category', 'category')}
      {renderField('Duration', 'duration')}
      {renderField('Level', 'level')}
      {renderField('Price (INR)', 'price')}
      {renderField('Original Price (INR)', 'originalPrice')}
      {renderField('Thumbnail URL', 'thumbnail')}
      {renderField('Image URL', 'image')}
      <Button title={isEditing ? 'Save Changes' : 'Create Course'} onPress={handleSave} loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: Spacing.md },
  title: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.text, marginBottom: Spacing.lg },
  fieldContainer: { marginBottom: Spacing.md },
  label: { fontSize: FontSize.base, color: Colors.textSecondary, marginBottom: 8 },
  input: { 
    backgroundColor: Colors.surface, 
    padding: 12, 
    borderRadius: 8, 
    fontSize: FontSize.base, 
    color: Colors.text 
  },
  multiline: { height: 100, textAlignVertical: 'top' },
});

export default CourseFormScreen;
