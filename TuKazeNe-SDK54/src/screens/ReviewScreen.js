import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { StarRating } from '../components/Rating';

export default function ReviewScreen({ route, navigation }) {
  const { workerName, jobTitle } = route.params || { 
    workerName: 'John M.', 
    jobTitle: 'Construction Work' 
  };
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please add a comment to your review');
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Review Submitted! ✅',
        'Thank you for your valuable feedback!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Welcome'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Rate Your Experience</Text>
        
        <View style={styles.jobInfo}>
          <Text style={styles.workerName}>Worker: {workerName}</Text>
          <Text style={styles.jobTitle}>Job: {jobTitle}</Text>
        </View>

        {/* Star Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingLabel}>How would you rate this worker?</Text>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            size={30}
          />
          <Text style={styles.ratingValue}>{rating} out of 5 stars</Text>
        </View>

        {/* Comment */}
        <View style={styles.commentSection}>
          <Text style={styles.commentLabel}>Add a comment (required)</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Share details about your experience..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Review Tips:</Text>
          <Text style={styles.tip}>• Be specific about what you liked</Text>
          <Text style={styles.tip}>• Mention punctuality and quality</Text>
          <Text style={styles.tip}>• Help others make informed decisions</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={submitReview}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  jobInfo: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  workerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#374151',
  },
  ratingValue: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 10,
  },
  commentSection: {
    marginBottom: 25,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#374151',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  tipsSection: {
    backgroundColor: '#eff6ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});