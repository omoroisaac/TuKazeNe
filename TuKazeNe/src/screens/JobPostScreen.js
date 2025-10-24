import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const categories = [
  'General Labor',
  'Electrician', 
  'Plumber',
  'Driver',
  'Cleaner',
  'Cook',
  'Porter',
  'Technician'
];

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function JobPostScreen({ navigation }) {
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('General Labor');
  const [description, setDescription] = useState('');
  const [wage, setWage] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('Getting your location...');

  // Request location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationStatus('Location permission denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      setLocationStatus('Location detected - nearby workers will be notified');
    })();
  }, []);

  // Request notification permission
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Notifications disabled', 'You may not receive job alerts');
      }
    })();
  }, []);

  const sendNotificationToWorkers = async (jobData) => {
    // In real app, this would send to backend which pushes to nearby workers
    // For now, we'll show a local notification as proof of concept
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Job Nearby! 🎯",
        body: `${jobData.title} - ${jobData.wage} UGX`,
        data: { jobData },
      },
      trigger: { seconds: 1 },
    });
  };

  const handleSubmit = async () => {
    if (!jobTitle.trim() || !description.trim() || !wage.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const jobData = {
      title: jobTitle,
      category,
      description,
      wage: `${wage} UGX`,
      negotiable: isNegotiable,
      location: userLocation ? {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude
      } : null,
      timestamp: new Date().toISOString()
    };

    // Send notification
    await sendNotificationToWorkers(jobData);

    Alert.alert(
      'Job Posted! 🎉',
      `"${jobTitle}" is now live! Nearby workers have been notified.`,
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
        {/* Job Title */}
        <Text style={styles.label}>Job Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Need 7 Porters for Construction"
          value={jobTitle}
          onChangeText={setJobTitle}
        />

        {/* Category */}
        <Text style={styles.label}>Category *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonSelected
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                category === cat && styles.categoryTextSelected
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Description */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the work needed..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Wage */}
        <Text style={styles.label}>Wage (UGX) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 15000"
          value={wage}
          onChangeText={setWage}
          keyboardType="numeric"
        />

        {/* Negotiable Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setIsNegotiable(!isNegotiable)}
        >
          <View style={[
            styles.checkbox,
            isNegotiable && styles.checkboxChecked
          ]}>
            {isNegotiable && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Wage is negotiable</Text>
        </TouchableOpacity>

        {/* Location Status */}
        <View style={styles.locationStatus}>
          <Text style={styles.locationText}>📍 {locationStatus}</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>POST JOB & NOTIFY WORKERS</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  categoryText: {
    color: '#374151',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#374151',
  },
  locationStatus: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  locationText: {
    color: '#16a34a',
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});