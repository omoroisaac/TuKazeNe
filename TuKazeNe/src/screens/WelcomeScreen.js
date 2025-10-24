import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

// Simple mock data
const mockJobs = [
  { id: '1', title: 'Need 7 Porters', category: 'Porter', wage: '15,000 UGX', location: 'Bweyogerere', time: '2 min ago' },
  { id: '2', title: 'Electrician Needed', category: 'Electrician', wage: '50,000 UGX', location: 'Kireka', time: '15 min ago' },
];

const mockWorkers = [
  { id: '1', name: 'John M.', skills: 'Driver, Porter', rate: '15,000 UGX/day', location: 'Kireka', rating: '4.8' },
  { id: '2', name: 'Sarah K.', skills: 'Cleaner, Cook', rate: '20,000 UGX/day', location: 'Bweyogerere', rating: '4.9' },
];

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Text style={styles.logo}>💼</Text>
            <Text style={styles.appName}>TuKazeNe</Text>
            <Text style={styles.tagline}>Let's Work Harder Together</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('PostJob')}
            >
              <Text style={styles.primaryButtonText}>I NEED A SERVICE</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('WorkerProfile')}
            >
              <Text style={styles.secondaryButtonText}>I WANT TO WORK</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Job Posts Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Recent Job Posts</Text>
            {mockJobs.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobDetails}>{job.category} • {job.location}</Text>
                <Text style={styles.jobWage}>{job.wage}</Text>
                <Text style={styles.jobTime}>{job.time}</Text>
              </View>
            ))}
          </View>

          {/* Available Workers Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👥 Available Workers</Text>
            {mockWorkers.map((worker) => (
              <View key={worker.id} style={styles.workerCard}>
                <View style={styles.workerHeader}>
                  <Text style={styles.workerName}>{worker.name}</Text>
                  <Text style={styles.workerRating}>⭐ {worker.rating}</Text>
                </View>
                <Text style={styles.workerSkills}>{worker.skills}</Text>
                <Text style={styles.workerLocation}>{worker.location}</Text>
                <Text style={styles.workerRate}>{worker.rate}</Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Connecting service seekers with providers across Uganda
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#16a34a',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#16a34a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  jobCard: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  jobDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  jobWage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  jobTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 5,
  },
  workerCard: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  workerRating: {
    fontSize: 14,
    color: '#f59e0b',
  },
  workerSkills: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 3,
  },
  workerLocation: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 5,
  },
  workerRate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  footerText: {
    color: '#6b7280',
    textAlign: 'center',
    fontSize: 12,
  },
});