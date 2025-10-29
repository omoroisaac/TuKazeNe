import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const StarRating = ({ rating, onRatingChange, size = 20, disabled = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.starContainer}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => !disabled && onRatingChange(star)}
          disabled={disabled}
        >
          <Text style={[styles.star, { fontSize: size }]}>
            {star <= rating ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const RatingDisplay = ({ rating, reviewCount, size = 16 }) => {
  return (
    <View style={styles.ratingDisplay}>
      <Text style={[styles.ratingText, { fontSize: size }]}>
        ⭐ {rating || 'No ratings'}
      </Text>
      {reviewCount > 0 && (
        <Text style={styles.reviewCount}>({reviewCount} reviews)</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 2,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#f59e0b',
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
});