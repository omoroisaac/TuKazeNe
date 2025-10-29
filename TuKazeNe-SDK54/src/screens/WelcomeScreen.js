import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, 
  ScrollView, TextInput, Modal, FlatList 
} from 'react-native';

// Mock data for testing (will be replaced with Firebase)
const mockJobs = [
  { 
    id: '1', 
    title: 'Need 7 Porters for Construction', 
    category: 'Porter', 
    wage: 15000, 
    location: 'Bweyogerere', 
    time: '2 min ago',
    description: 'Construction site work, lifting materials'
  },
  { 
    id: '2', 
    title: 'Electrician Needed Urgently', 
    category: 'Electrician', 
    wage: 50000, 
    location: 'Kireka', 
    time: '15 min ago',
    description: 'Fix electrical wiring in residential house'
  },
  { 
    id: '3', 
    title: 'Driver for Weekend Trip', 
    category: 'Driver', 
    wage: 50000, 
    location: 'Kampala', 
    time: '1 hour ago',
    description: 'Upcountry drive, 3 days duration'
  },
];

const mockWorkers = [
  { 
    id: '1', 
    name: 'John M.', 
    skills: 'Driver, Porter', 
    rate: '15,000 UGX/day', 
    location: 'Kireka', 
    rating: '4.8',
    reviewCount: 12
  },
  { 
    id: '2', 
    name: 'Sarah K.', 
    skills: 'Cleaner, Cook', 
    rate: '20,000 UGX/day', 
    location: 'Bweyogerere', 
    rating: '4.9',
    reviewCount: 8
  },
  { 
    id: '3', 
    name: 'David T.', 
    skills: 'Electrician, Technician', 
    rate: '25,000 UGX/hr', 
    location: 'Kampala', 
    rating: '4.7',
    reviewCount: 15
  },
];

export default function WelcomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'General Labor', 'Electrician', 'Plumber', 'Driver', 'Cleaner', 'Cook', 'Porter', 'Technician'];
  const locations = ['All', 'Kampala', 'Kireka', 'Bweyogerere', 'Najjera', 'Ntinda', 'Makerere', 'Central'];

  // Filter jobs based on search and filters
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesPrice = job.wage >= priceRange[0] && job.wage <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const filteredWorkers = mockWorkers.filter(worker => {
    return worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           worker.skills.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const FilterModal = () => (
    <Modal visible={showFilters} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Jobs</Text>
          
          {/* Category Filter */}
          <Text style={styles.filterLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterOption,
                  selectedCategory === cat && styles.filterOptionSelected
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedCategory === cat && styles.filterOptionTextSelected
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Location Filter */}
          <Text style={styles.filterLabel}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
            {locations.map(loc => (
              <TouchableOpacity
                key={loc}
                style={[
                  styles.filterOption,
                  selectedLocation === loc && styles.filterOptionSelected
                ]}
                onPress={() => setSelectedLocation(loc)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedLocation === loc && styles.filterOptionTextSelected
                ]}>
                  {loc}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Price Range */}
          <Text style={styles.filterLabel}>Price Range: {priceRange[0]} - {priceRange[1]} UGX</Text>
          <View style={styles.rangeContainer}>
            <TextInput
              style={styles.rangeInput}
              value={priceRange[0].toString()}
              onChangeText={(text) => setPriceRange([parseInt(text) || 0, priceRange[1]])}
              keyboardType="numeric"
            />
            <Text style={styles.rangeSeparator}>to</Text>
            <TextInput
              style={styles.rangeInput}
              value={priceRange[1].toString()}
              onChangeText={(text) => setPriceRange([priceRange[0], parseInt(text) || 100000])}
              keyboardType="numeric"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSelectedCategory('All');
                setSelectedLocation('All');
                setPriceRange([0, 100000]);
              }}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.logoSection}>
            <Text style={styles.logo}>💼</Text>
            <Text style={styles.appName}>TuKazeNe</Text>
            <Text style={styles.tagline}>Let's Work Harder Together</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search jobs, workers, skills..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilters(true)}
            >
              <Text style={styles.filterButtonText}>🔍</Text>
            </TouchableOpacity>
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

          {/* Active Filters */}
          {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchQuery) && (
            <View style={styles.activeFilters}>
              <Text style={styles.activeFiltersText}>Active filters: </Text>
              {selectedCategory !== 'All' && (
                <Text style={styles.activeFilterTag}>{selectedCategory}</Text>
              )}
              {selectedLocation !== 'All' && (
                <Text style={styles.activeFilterTag}>{selectedLocation}</Text>
              )}
              {searchQuery && (
                <Text style={styles.activeFilterTag}>"{searchQuery}"</Text>
              )}
              <TouchableOpacity onPress={() => {
                setSelectedCategory('All');
                setSelectedLocation('All');
                setSearchQuery('');
                setPriceRange([0, 100000]);
              }}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Recent Job Posts */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                📋 Recent Job Posts {filteredJobs.length > 0 && `(${filteredJobs.length})`}
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {filteredJobs.length === 0 ? (
              <Text style={styles.noResultsText}>No jobs found matching your criteria</Text>
            ) : (
              filteredJobs.map((job) => (
                <TouchableOpacity key={job.id} style={styles.jobCard}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobDetails}>{job.category} • {job.location}</Text>
                  <Text style={styles.jobWage}>{job.wage.toLocaleString()} UGX</Text>
                  <Text style={styles.jobTime}>{job.time}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Available Workers */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                👥 Available Workers {filteredWorkers.length > 0 && `(${filteredWorkers.length})`}
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {filteredWorkers.length === 0 ? (
              <Text style={styles.noResultsText}>No workers found matching your criteria</Text>
            ) : (
              filteredWorkers.map((worker) => (
                <TouchableOpacity key={worker.id} style={styles.workerCard}>
                  <View style={styles.workerHeader}>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.workerRating}>⭐ {worker.rating}</Text>
                      {worker.reviewCount > 0 && (
                        <Text style={{fontSize: 10, color: '#6b7280', marginLeft: 4}}>
                          ({worker.reviewCount})
                        </Text>
                      )}
                    </View>
                  </View>
                  <Text style={styles.workerSkills}>{worker.skills}</Text>
                  <Text style={styles.workerLocation}>{worker.location}</Text>
                  <Text style={styles.workerRate}>{worker.rate}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Connecting service seekers with providers across Uganda
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <FilterModal />
    </SafeAreaView>
  );
}

// ... (styles remain the same as previous version)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  content: { padding: 20 },
  logoSection: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
  logo: { fontSize: 60, marginBottom: 10 },
  appName: { fontSize: 28, fontWeight: 'bold', color: '#16a34a', marginBottom: 5 },
  tagline: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  searchContainer: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  searchInput: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, padding: 12, fontSize: 16, marginRight: 10 },
  filterButton: { backgroundColor: '#16a34a', padding: 12, borderRadius: 10, width: 50, alignItems: 'center' },
  filterButtonText: { color: '#fff', fontSize: 16 },
  buttonsContainer: { marginBottom: 25 },
  primaryButton: { backgroundColor: '#16a34a', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { borderWidth: 2, borderColor: '#16a34a', padding: 16, borderRadius: 10, alignItems: 'center' },
  secondaryButtonText: { color: '#16a34a', fontSize: 16, fontWeight: 'bold' },
  activeFilters: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: '#f3f4f6', borderRadius: 8 },
  activeFiltersText: { fontSize: 14, color: '#6b7280' },
  activeFilterTag: { backgroundColor: '#16a34a', color: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontSize: 12, marginHorizontal: 4 },
  clearAllText: { color: '#ef4444', fontSize: 12, marginLeft: 10, fontWeight: '600' },
  section: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
  seeAllText: { color: '#16a34a', fontWeight: '600' },
  jobCard: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 10, marginBottom: 10 },
  jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 5 },
  jobDetails: { fontSize: 14, color: '#6b7280', marginBottom: 5 },
  jobWage: { fontSize: 16, fontWeight: 'bold', color: '#16a34a' },
  jobTime: { fontSize: 12, color: '#9ca3af', marginTop: 5 },
  workerCard: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 10, marginBottom: 10 },
  workerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  workerName: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  workerRating: { fontSize: 14, color: '#f59e0b' },
  workerSkills: { fontSize: 14, color: '#6b7280', marginBottom: 3 },
  workerLocation: { fontSize: 12, color: '#9ca3af', marginBottom: 5 },
  workerRate: { fontSize: 14, fontWeight: '600', color: '#16a34a' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  filterLabel: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#374151' },
  filterOptions: { marginBottom: 20 },
  filterOption: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#d1d5db', marginRight: 8 },
  filterOptionSelected: { backgroundColor: '#16a34a', borderColor: '#16a34a' },
  filterOptionText: { color: '#374151', fontWeight: '500' },
  filterOptionTextSelected: { color: '#fff' },
  rangeContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  rangeInput: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 8, width: 80, textAlign: 'center' },
  rangeSeparator: { marginHorizontal: 10, color: '#6b7280' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  resetButton: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#d1d5db', flex: 1, marginRight: 10, alignItems: 'center' },
  resetButtonText: { color: '#374151', fontWeight: '600' },
  applyButton: { backgroundColor: '#16a34a', padding: 12, borderRadius: 8, flex: 2, alignItems: 'center' },
  applyButtonText: { color: '#fff', fontWeight: 'bold' },
  noResultsText: { textAlign: 'center', color: '#6b7280', padding: 20, backgroundColor: '#f3f4f6', borderRadius: 10 },
  footer: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
  footerText: { color: '#6b7280', textAlign: 'center', fontSize: 12 },
});