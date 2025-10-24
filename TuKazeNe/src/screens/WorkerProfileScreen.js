import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function WorkerProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const [rate, setRate] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    if (!name.trim() || !skills.trim() || !rate.trim() || !location.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Profile Saved!',
      'Your profile is now visible to employers on TuKazeNe!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Welcome')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>SAVE PROFILE</Text>
        </TouchableOpacity>
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
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});