import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, SectionList } from 'react-native';

// Mock data - in real app, this would come from your backend
const mockJobs = [
  { id: '1', title: 'Need 7 Porters', category: 'Porter', wage: '15,000 UGX', location: 'Bweyogerere', time: '2 min ago' },
  { id: '2', title: 'Electrician Needed', category: 'Electrician', wage: '50,000 UGX', location: 'Kireka', time: '15 min ago' },
  { id: '3', title: 'Driver for Weekend', category: 'Driver', wage: '50,000 UGX/day', location: 'Kampala', time: '1 hour ago' },
];

const mockWorkers = [
  { id: '1', name: 'John M.', skills: 'Driver, Porter', rate: '15,000 UGX/day', location: 'Kireka', rating: '4.8' },
  { id: '2', name: 'Sarah K.', skills: 'Cleaner, Cook', rate: '20,000 UGX/day', location: 'Bweyogerere', rating: '4.9' },
  { id: '3', name: 'David T.', skills: 'Electrician', rate: '25,000 UGX/hr', location: 'Kampala', rating: '4.7' },
];

export default function WelcomeScreen({ navigation }) {
  const [recentJobs, setRecentJobs] = useState(mockJobs);
  const [availableWorkers, setAvailableWorkers] = useState(mockWorkers);

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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Job Posts</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {recentJobs.map((job) => (
              <TouchableOpacity key={job.id} style={styles.listItem}>
                <View style={styles.itemMain}>
                  <Text style={styles.itemTitle}>{job.title}</Text>
                  <Text style={styles.itemSubtitle}>{job.category} • {job.location}</Text>
                </View>
                <View style={styles.itemSide}>
                  <Text style={styles.wageText}>{job.wage}</Text>
                  <Text style={styles.timeText}>{job.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Available Workers Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Workers</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {availableWorkers.map((worker) => (
              <TouchableOpacity key={worker.id} style={styles.listItem}>
                <View style={styles.workerAvatar}>
                  <Text style={styles.avatarText}>
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.itemMain}>
                  <Text style={styles.itemTitle}>{worker.name}</Text>
                  <Text style={styles.itemSubtitle}>{worker.skills}</Text>
                  <Text style={styles.locationText}>{worker.location}</Text>
                </View>
                <View style={styles.itemSide}>
                  <Text style={styles.ratingText}>⭐ {worker.rating}</Text>
                  <Text style={styles.rateText}>{worker.rate}</Text>
                </View>
              </TouchableOpacity>
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
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#16a34a',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#16a34a',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#16a34a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seeAllText: {
    color: '#16a34a',
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  workerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemMain: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  itemSide: {
    alignItems: 'flex-end',
  },
  wageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 4,
  },
  rateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  ratingText: {
    fontSize: 12,
    color: '#f59e0b',
    marginBottom: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  footerText: {
    color: '#6b7280',
    textAlign: 'center',
    fontSize: 14,
  },
});