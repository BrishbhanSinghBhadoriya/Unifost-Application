import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useAuth, useAlert } from '@/template';
import { getCourseById } from '@/constants/courses';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/Button';
import { Colors, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CertificateScreen() {
  const { id: courseId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { getCertificate, issueCertificate, enrollments } = useEnrollments();
  const { profile } = useProfile();
  const [downloading, setDownloading] = useState(false);

  const course = getCourseById(courseId ?? '');
  const certificate = getCertificate(courseId ?? '');
  const enrollment = enrollments.find(e => e.course_id === courseId);

  useEffect(() => {
    // Auto-issue if enrollment is completed but no cert yet
    if (enrollment?.completed && !certificate && user) {
      issueCertificate(courseId ?? '');
    }
  }, [enrollment, certificate]);

  if (!course) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: Colors.textSecondary }}>Course not found.</Text>
      </View>
    );
  }

  const holderName = profile?.username ?? user?.email?.split('@')[0] ?? 'Valued Learner';
  const issueDate = certificate
    ? new Date(certificate.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certNumber = certificate?.certificate_number ?? 'PENDING';

  const generatePDF = async () => {
    setDownloading(true);
    try {
      const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', serif; background: #fff; width: 800px; height: 600px; display: flex; align-items: center; justify-content: center; }
  .cert {
    width: 740px; height: 540px;
    border: 8px solid #4F46E5;
    border-radius: 16px;
    padding: 50px;
    text-align: center;
    background: linear-gradient(135deg, #ffffff, #F0F4FF);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .corner { position: absolute; width: 60px; height: 60px; border: 4px solid #7C3AED; }
  .tl { top: 16px; left: 16px; border-right: none; border-bottom: none; border-radius: 8px 0 0 0; }
  .tr { top: 16px; right: 16px; border-left: none; border-bottom: none; border-radius: 0 8px 0 0; }
  .bl { bottom: 16px; left: 16px; border-right: none; border-top: none; border-radius: 0 0 0 8px; }
  .br { bottom: 16px; right: 16px; border-left: none; border-top: none; border-radius: 0 0 8px 0; }
  .org { font-size: 20px; font-weight: bold; color: #4F46E5; letter-spacing: 3px; text-transform: uppercase; }
  .seal { font-size: 52px; }
  .heading { font-size: 28px; font-weight: bold; color: #7C3AED; font-style: italic; }
  .presented { font-size: 14px; color: #64748B; }
  .name { font-size: 36px; font-weight: bold; color: #1E293B; border-bottom: 3px solid #4F46E5; padding-bottom: 8px; min-width: 300px; }
  .completed-text { font-size: 14px; color: #64748B; }
  .course-name { font-size: 22px; font-weight: bold; color: #4F46E5; }
  .duration { font-size: 14px; color: #64748B; }
  .meta { font-size: 12px; color: #94A3B8; margin-top: 8px; }
  .signature-row { display: flex; flex-direction: row; justify-content: space-around; align-items: flex-end; margin-top: 20px; width: 100%; }
  .sig { text-align: center; }
  .sig-line { width: 150px; height: 1px; background: #4F46E5; margin: 0 auto 6px; }
  .sig-label { font-size: 12px; color: #64748B; }
</style>
</head>
<body>
<div class="cert">
  <div class="corner tl"></div><div class="corner tr"></div>
  <div class="corner bl"></div><div class="corner br"></div>
  <div class="org">UniFost Academy</div>
  <div class="seal">🎓</div>
  <div class="heading">Certificate of Completion</div>
  <div class="presented">This is to proudly certify that</div>
  <div class="name">${holderName}</div>
  <div class="completed-text">has successfully completed the program</div>
  <div class="course-name">${course.title}</div>
  <div class="duration">Duration: ${course.duration} · Level: ${course.level}</div>
  <div class="meta">Issued on: ${issueDate} &nbsp;|&nbsp; Certificate No: ${certNumber}</div>
  <div class="signature-row">
    <div class="sig">
      <div class="sig-line"></div>
      <div class="sig-label">Programme Director</div>
    </div>
    <div class="sig">
      <div class="sig-line"></div>
      <div class="sig-label">UniFost Academy</div>
    </div>
  </div>
</div>
</body>
</html>`;
      const { uri } = await Print.printToFileAsync({ html, base64: false });
      setDownloading(false);
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (e: any) {
      setDownloading(false);
      showAlert('Error', e.message ?? 'Failed to generate PDF.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Header */}
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Certificate</Text>
        <View style={{ width: 38 }} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: Spacing.md, paddingBottom: 40 }}>
        {/* Certificate Preview Card */}
        <View style={[styles.certCard, Shadows.lg]}>
          <View style={[styles.certBg, { backgroundColor: '#F8FAFF' }]} />
          <View style={styles.certOverlay}>
            {/* Decorative corners */}
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />

            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.orgBadge}>
              <MaterialIcons name="school" size={16} color="#fff" />
              <Text style={styles.orgText}>UniFost Academy</Text>
            </LinearGradient>

            <Text style={styles.certSeal}>🎓</Text>
            <Text style={styles.certHeading}>Certificate of Completion</Text>
            <Text style={styles.certPresented}>This is to proudly certify that</Text>
            <Text style={styles.certName}>{holderName}</Text>
            <Text style={styles.certCompleted}>has successfully completed</Text>
            <Text style={styles.certCourse}>{course.title}</Text>
            <View style={styles.certMeta}>
              <View style={styles.certMetaItem}>
                <MaterialIcons name="schedule" size={14} color={Colors.primary} />
                <Text style={styles.certMetaText}>{course.duration}</Text>
              </View>
              <View style={styles.certMetaItem}>
                <MaterialIcons name="signal-cellular-alt" size={14} color={Colors.primary} />
                <Text style={styles.certMetaText}>{course.level}</Text>
              </View>
            </View>
            <View style={styles.certFooter}>
              <View style={styles.certSigSection}>
                <View style={styles.certSigLine} />
                <Text style={styles.certSigLabel}>Programme Director</Text>
              </View>
              <View style={styles.certSigSection}>
                <View style={styles.certSigLine} />
                <Text style={styles.certSigLabel}>UniFost Academy</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Certificate Info */}
        <View style={[styles.infoCard, Shadows.sm]}>
          <View style={styles.infoRow}>
            <MaterialIcons name="confirmation-number" size={18} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Certificate Number</Text>
              <Text style={styles.infoValue}>{certNumber}</Text>
            </View>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: Colors.borderLight }]}>
            <MaterialIcons name="event" size={18} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Issued On</Text>
              <Text style={styles.infoValue}>{issueDate}</Text>
            </View>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: Colors.borderLight }]}>
            <MaterialIcons name="person" size={18} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Awarded To</Text>
              <Text style={styles.infoValue}>{holderName}</Text>
            </View>
          </View>
        </View>

        <Button
          title={downloading ? 'Generating PDF...' : 'Download Certificate (PDF)'}
          onPress={generatePDF}
          loading={downloading}
          fullWidth
          icon={<MaterialIcons name="download" size={18} color="#fff" />}
          style={{ marginTop: Spacing.md }}
        />

        <Pressable onPress={() => router.push(`/course/${courseId}`)} style={styles.viewCourse}>
          <Text style={styles.viewCourseText}>View Course Details →</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  backBtn: { width: 38, height: 38, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  certCard: { borderRadius: Radius.xl, overflow: 'hidden', height: 380, marginBottom: Spacing.md, position: 'relative' },
  certBg: { ...StyleSheet.absoluteFillObject },
  certOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(248,250,255,0.88)', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 6 },
  corner: { position: 'absolute', width: 28, height: 28, borderColor: Colors.primary, borderWidth: 3 },
  tl: { top: 16, left: 16, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  tr: { top: 16, right: 16, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  bl: { bottom: 16, left: 16, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  br: { bottom: 16, right: 16, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },
  orgBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, paddingHorizontal: 12, borderRadius: Radius.full },
  orgText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: '#fff', includeFontPadding: false },
  certSeal: { fontSize: 36, marginVertical: 4 },
  certHeading: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.secondary, fontStyle: 'italic', includeFontPadding: false },
  certPresented: { fontSize: FontSize.sm, color: Colors.textSecondary, includeFontPadding: false },
  certName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, borderBottomWidth: 2, borderBottomColor: Colors.primary, paddingBottom: 4, includeFontPadding: false },
  certCompleted: { fontSize: FontSize.sm, color: Colors.textSecondary, includeFontPadding: false },
  certCourse: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary, textAlign: 'center', includeFontPadding: false },
  certMeta: { flexDirection: 'row', gap: 16, marginVertical: 4 },
  certMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  certMetaText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: FontWeight.semibold, includeFontPadding: false },
  certFooter: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
  certSigSection: { alignItems: 'center', gap: 4 },
  certSigLine: { width: 100, height: 1, backgroundColor: Colors.textSecondary },
  certSigLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, includeFontPadding: false },
  infoCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: Spacing.md },
  infoLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, includeFontPadding: false },
  infoValue: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text, marginTop: 2, includeFontPadding: false },
  viewCourse: { alignItems: 'center', paddingVertical: 16 },
  viewCourseText: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.semibold, includeFontPadding: false },
});
