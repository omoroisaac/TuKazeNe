import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function WorkerProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const [rate, setRate] = useState('');
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !skills.trim() || !rate.trim() || !location.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      // Save to Firebase Firestore
      const workerData = {
        name: name.trim(),
        skills: skills.trim(),
        certifications: certifications.trim(),
        rate: rate.trim() + ' UGX',
        location: location.trim(),
        isAvailable: true,
        rating: 0,
        reviewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'workers'), workerData);
      
      console.log('Worker saved with ID: ', docRef.id);
      
      Alert.alert(
        'Profile Saved! 🎉',
        'Your profile is now live on TuKazeNe!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Clear form
              setName('');
              setSkills('');
              setCertifications('');
              setRate('');
              setLocation('');
              navigation.navigate('Welcome');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error saving worker:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.note}>💡 This will save to REAL Firebase database</Text>
        
        {/* Name */}
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., John M."
          value={name}
          onChangeText={setName}
        />

        {/* Skills */}
        <Text style={styles.label}>Skills *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Porter, Driver, Electrician"
          value={skills}
          onChangeText={setSkills}
        />

        {/* Certifications */}
        <Text style={styles.label}>Certifications/Licenses</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Class B Driving Permit"
          value={certifications}
          onChangeText={setCertifications}
        />

        {/* Rate */}
        <Text style={styles.label}>Your Rate (UGX) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 15000"
          value={rate}
          onChangeText={setRate}
          keyboardType="numeric"
        />

        {/* Location */}
        <Text style={styles.label}>Service Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Kireka Town, Bweyogerere"
          value={location}
          onChangeText={setLocation}
        />

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.submitButton, saving && styles.submitButtonDisabled]} 
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.submitButtonText}>
            {saving ? 'Saving to Firebase...' : 'SAVE PROFILE TO FIREBASE'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.firebaseNote}>
          🔥 Data will be saved to your Firebase project
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  note: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 16,
    color: '#16a34a',
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  firebaseNote: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 16,
    fontStyle: 'italic',
  },
});