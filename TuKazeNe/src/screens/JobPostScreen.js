import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

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
  const [location, setLocation] = useState(null);

  // Request location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location to find nearby workers');
        return;
      }
      
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
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
    // In a real app, this would send to your backend which pushes to nearby workers
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
      location: location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
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

  // ... rest of your existing JSX code remains the same
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Existing form fields remain exactly the same */}
        <Text style={styles.label}>Job Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Need 7 Porters for Construction"
          value={jobTitle}
          onChangeText={setJobTitle}
        />

        {/* ... all other form fields stay the same ... */}

        {/* Location Status */}
        <View style={styles.locationStatus}>
          <Text style={styles.locationText}>
            📍 {location ? 'Location detected - nearby workers will be notified' : 'Getting your location...'}
          </Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>POST JOB & NOTIFY WORKERS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Add this to your existing styles
const styles = StyleSheet.create({
  // ... your existing styles remain the same ...
  locationStatus: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationText: {
    color: '#16a34a',
    fontSize: 14,
    textAlign: 'center',
  },
});