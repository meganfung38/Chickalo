import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import { authAPI, storageAPI } from '../services/api';
import DiceBearAvatar from '../components/DiceBearAvatar';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const { width: screenWidth } = Dimensions.get('window');

interface SettingsScreenProps {
  user: any;
  isActive: boolean;
  onToggleActivity: () => void;
  onBack: () => void;
  onLogout: () => void;
  onUserUpdate: (user: any) => void;
}

interface AvatarSettings {
  style: string;
  seed: string;
  backgroundColor?: string[];
  // DiceBear Big Smile schema options
  accessories?: string[];
  accessoriesChance?: number;
  eyes?: string[];
  eyesChance?: number;
  mouth?: string[];
  mouthChance?: number;
  hair?: string[];
  hairChance?: number;
  hairColor?: string[];
  skinColor?: string[];
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, isActive, onToggleActivity, onBack, onLogout, onUserUpdate }) => {
  const [headline, setHeadline] = useState(user.headline || '');
  const [pronouns, setPronouns] = useState(user.pronouns || '');
  const [showPronounsModal, setShowPronounsModal] = useState(false);

  const pronounsOptions = [
    'they/them',
    'she/her', 
    'he/him',
    'she/they',
    'he/they',
    'any pronouns',
    'ask me',
    'prefer not to say'
  ];
  const getDefaultAvatarSettings = (): AvatarSettings => ({
    style: 'big-smile',
    seed: Math.random().toString(36).substring(2, 15), // Random seed instead of username
    backgroundColor: ['b6e3f4'],
    accessories: ['glasses'],
    accessoriesChance: 50,
    eyes: ['normal'],
    eyesChance: 100,
    mouth: ['openedSmile'],
    mouthChance: 100,
    hair: ['shortHair'],
    hairChance: 100,
    hairColor: ['71472d'],
    skinColor: ['ffe4c0']
  });

  const [avatarSettings, setAvatarSettings] = useState<AvatarSettings>(() => {
    if (user.avatar_data && typeof user.avatar_data === 'object') {
      return {
        ...getDefaultAvatarSettings(),
        ...user.avatar_data
      };
    }
    return getDefaultAvatarSettings();
  });
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // DiceBear Big Smile options based on official schema
  const avatarOptions = [
    {
      id: 'backgroundColor',
      title: 'Background',
      options: [
        { name: 'Blue', value: 'b6e3f4' },
        { name: 'Purple', value: 'c0aede' },
        { name: 'Lavender', value: 'd1d4f9' },
        { name: 'Pink', value: 'ffd5dc' },
        { name: 'Orange', value: 'ffdfbf' },
        { name: 'Green', value: 'c7f9cc' },
        { name: 'Yellow', value: 'fff2cc' },
        { name: 'Red', value: 'fca5a5' },
        { name: 'Teal', value: '5eead4' }
      ]
    },
    {
      id: 'skinColor',
      title: 'Skin Color',
      options: [
        { name: 'Light', value: 'ffe4c0' },
        { name: 'Fair', value: 'f5d7b1' },
        { name: 'Medium', value: 'efcc9f' },
        { name: 'Tan', value: 'e2ba87' },
        { name: 'Brown', value: 'c99c62' },
        { name: 'Dark', value: 'a47539' },
        { name: 'Deep', value: '8c5a2b' },
        { name: 'Rich', value: '643d19' }
      ]
    },
    {
      id: 'hair',
      title: 'Hair Style',
      options: [
        { name: 'Short Hair', value: 'shortHair' },
        { name: 'Mohawk', value: 'mohawk' },
        { name: 'Wavy Bob', value: 'wavyBob' },
        { name: 'Bowl Cut', value: 'bowlCutHair' },
        { name: 'Curly Bob', value: 'curlyBob' },
        { name: 'Straight Hair', value: 'straightHair' },
        { name: 'Braids', value: 'braids' },
        { name: 'Shaved Head', value: 'shavedHead' },
        { name: 'Bun Hair', value: 'bunHair' },
        { name: 'Fro Bun', value: 'froBun' },
        { name: 'Bangs', value: 'bangs' },
        { name: 'Half Shaved', value: 'halfShavedHead' },
        { name: 'Curly Short', value: 'curlyShortHair' }
      ]
    },
    {
      id: 'hairColor',
      title: 'Hair Color',
      options: [
        { name: 'Dark Red', value: '220f00' },
        { name: 'Dark Brown', value: '3a1a00' },
        { name: 'Brown', value: '71472d' },
        { name: 'Light Brown', value: 'e2ba87' },
        { name: 'Purple', value: '605de4' },
        { name: 'Teal', value: '238d80' },
        { name: 'Orange', value: 'd56c0c' },
        { name: 'Blonde', value: 'e9b729' }
      ]
    },
    {
      id: 'eyes',
      title: 'Eyes',
      options: [
        { name: 'Cheery', value: 'cheery' },
        { name: 'Normal', value: 'normal' },
        { name: 'Confused', value: 'confused' },
        { name: 'Starstruck', value: 'starstruck' },
        { name: 'Winking', value: 'winking' },
        { name: 'Sleepy', value: 'sleepy' },
        { name: 'Sad', value: 'sad' },
        { name: 'Angry', value: 'angry' }
      ]
    },
    {
      id: 'mouth',
      title: 'Mouth',
      options: [
        { name: 'Opened Smile', value: 'openedSmile' },
        { name: 'Unimpressed', value: 'unimpressed' },
        { name: 'Gap Smile', value: 'gapSmile' },
        { name: 'Open Sad', value: 'openSad' },
        { name: 'Teeth Smile', value: 'teethSmile' },
        { name: 'Awkward Smile', value: 'awkwardSmile' },
        { name: 'Braces', value: 'braces' },
        { name: 'Kawaii', value: 'kawaii' }
      ]
    },
    {
      id: 'accessories',
      title: 'Accessories',
      options: [
        { name: 'None', value: 'none' },
        { name: 'Cat Ears', value: 'catEars' },
        { name: 'Glasses', value: 'glasses' },
        { name: 'Sailor Crown', value: 'sailormoonCrown' },
        { name: 'Clown Nose', value: 'clownNose' },
        { name: 'Sleep Mask', value: 'sleepMask' },
        { name: 'Sunglasses', value: 'sunglasses' },
        { name: 'Face Mask', value: 'faceMask' },
        { name: 'Mustache', value: 'mustache' }
      ]
    }
  ];

  const updateAvatarSetting = (key: string, value: string) => {
    setAvatarSettings(prev => {
      // Create a unique seed based on the combination of all settings
      const newSettings = {
        ...prev,
        [key]: [value]
      };
      
      // Generate a unique seed that incorporates all the current settings
      const seedComponents = [
        newSettings.backgroundColor?.[0] || 'b6e3f4',
        newSettings.skinColor?.[0] || 'ffe4c0',
        newSettings.hair?.[0] || 'shortHair',
        newSettings.hairColor?.[0] || '71472d',
        newSettings.eyes?.[0] || 'normal',
        newSettings.mouth?.[0] || 'openedSmile',
        newSettings.accessories?.[0] || 'glasses'
      ];
      
      newSettings.seed = seedComponents.join('-');
      
      console.log('Updated avatar settings:', newSettings);
      console.log('New seed generated:', newSettings.seed);
      return newSettings;
    });
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % avatarOptions.length;
    setCurrentSlide(next);
    flatListRef.current?.scrollToIndex({ index: next, animated: true });
  };

  const prevSlide = () => {
    const prev = currentSlide === 0 ? avatarOptions.length - 1 : currentSlide - 1;
    setCurrentSlide(prev);
    flatListRef.current?.scrollToIndex({ index: prev, animated: true });
  };

  const handleSaveHeadline = async () => {
    try {
      const response = await authAPI.updateHeadline(headline);
      // Update the user state in parent component
      onUserUpdate({ ...user, headline: headline });
      Alert.alert('Success', 'Headline updated successfully!');
    } catch (error) {
      console.error('Failed to update headline:', error);
      Alert.alert('Error', 'Failed to update headline');
    }
  };

  const handleSavePronouns = async () => {
    try {
      const response = await authAPI.updatePronouns(pronouns);
      // Update the user state in parent component
      onUserUpdate({ ...user, pronouns: pronouns });
      Alert.alert('Success', 'Pronouns updated successfully!');
    } catch (error) {
      console.error('Failed to update pronouns:', error);
      Alert.alert('Error', 'Failed to update pronouns');
    }
  };

  const handleSaveAvatar = async () => {
    try {
      const response = await authAPI.updateAvatar(avatarSettings);
      // Update the user state in parent component
      onUserUpdate({ ...user, avatar_data: avatarSettings });
      Alert.alert('Success', 'Avatar updated successfully!');
      setShowAvatarModal(false);
    } catch (error) {
      console.error('Failed to update avatar:', error);
      Alert.alert('Error', 'Failed to update avatar');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleNavigateToMap = () => {
    onBack();
  };

  const handleNavigateToSettings = () => {
    // Already on settings screen, do nothing
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header username={user.username} isActive={isActive} />

      {/* Content Container with proper bounds */}
      <View style={styles.contentContainer}>
        <ScrollView 
          style={styles.content}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
        {/* User Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username:</Text>
            <Text style={styles.infoValue}>{user.username}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date Joined:</Text>
            <Text style={styles.infoValue}>{formatDate(user.created_at)}</Text>
          </View>
        </View>

        {/* Headline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Headline</Text>
          <TextInput
            style={styles.headlineInput}
            value={headline}
            onChangeText={setHeadline}
            placeholder="What's on your mind?"
            multiline
            maxLength={100}
          />
          <TouchableOpacity onPress={handleSaveHeadline} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Headline</Text>
          </TouchableOpacity>
        </View>

        {/* Pronouns Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pronouns</Text>
          <TouchableOpacity 
            style={styles.pronounsSelector}
            onPress={() => setShowPronounsModal(true)}
          >
            <Text style={[styles.pronounsSelectorText, !pronouns && styles.placeholderText]}>
              {pronouns || 'Select pronouns'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSavePronouns} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Pronouns</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avatar</Text>
          <TouchableOpacity 
            onPress={() => setShowAvatarModal(true)} 
            style={styles.avatarButton}
          >
            <View style={styles.avatarPreview}>
              <DiceBearAvatar 
                key={avatarSettings.seed} 
                settings={avatarSettings} 
                size={60} 
              />
            </View>
            <Text style={styles.avatarButtonText}>Customize Avatar</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonNew}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>

      {/* Pronouns Selection Modal */}
      <Modal
        visible={showPronounsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPronounsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pronounsModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Pronouns</Text>
              <TouchableOpacity onPress={() => setShowPronounsModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.pronounsOptionsContainer}>
              {pronounsOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.pronounsOption,
                    pronouns === option && styles.pronounsOptionSelected
                  ]}
                  onPress={() => {
                    setPronouns(option);
                    setShowPronounsModal(false);
                  }}
                >
                  <Text style={[
                    styles.pronounsOptionText,
                    pronouns === option && styles.pronounsOptionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
              
              {/* Clear selection option */}
              <TouchableOpacity
                style={[styles.pronounsOption, styles.clearOption]}
                onPress={() => {
                  setPronouns('');
                  setShowPronounsModal(false);
                }}
              >
                <Text style={styles.clearOptionText}>Clear selection</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Avatar Customization Modal */}
      <Modal
        visible={showAvatarModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAvatarModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Customize Avatar</Text>
            <TouchableOpacity onPress={handleSaveAvatar}>
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Fixed Avatar Preview */}
          <View style={styles.fixedAvatarPreview}>
            <DiceBearAvatar 
              key={avatarSettings.seed} 
              settings={avatarSettings} 
              size={150} 
            />
          </View>

          {/* Slideshow Navigation */}
          <View style={styles.slideNavigation}>
            <TouchableOpacity onPress={prevSlide} style={styles.navButton}>
              <Text style={styles.navButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.slideTitle}>{avatarOptions[currentSlide]?.title}</Text>
            <TouchableOpacity onPress={nextSlide} style={styles.navButton}>
              <Text style={styles.navButtonText}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Slide Indicators */}
          <View style={styles.slideIndicators}>
            {avatarOptions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.slideIndicator,
                  index === currentSlide && styles.slideIndicatorActive
                ]}
              />
            ))}
          </View>

          {/* Slideshow Content */}
          <FlatList
            ref={flatListRef}
            data={avatarOptions}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentSlide(slideIndex);
            }}
            renderItem={({ item }) => (
              <View style={[styles.slideContainer, { width: screenWidth }]}>
                <ScrollView style={styles.slideScrollView} showsVerticalScrollIndicator={false}>
                  <View style={styles.optionsGrid}>
                  {item.options.map((option: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionCard,
                        item.id === 'backgroundColor' || item.id === 'skinColor' || item.id === 'hairColor'
                          ? { backgroundColor: `#${option.value}` }
                          : {},
                        (avatarSettings as any)[item.id]?.[0] === option.value && styles.optionCardActive
                      ]}
                      onPress={() => updateAvatarSetting(item.id, option.value)}
                    >
                      <Text style={[
                        styles.optionCardText,
                        item.id === 'backgroundColor' || item.id === 'skinColor' || item.id === 'hairColor'
                          ? { color: 'white', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }
                          : {}
                      ]}>
                        {option.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  </View>
                </ScrollView>
              </View>
            )}
          />

          {/* Randomize Button */}
          <View style={styles.randomizeContainer}>
            <TouchableOpacity
              style={styles.randomizeButton}
              onPress={() => {
                console.log('Randomizing avatar...');
                const randomSettings = {
                  ...avatarSettings,
                  backgroundColor: [avatarOptions[0].options[Math.floor(Math.random() * avatarOptions[0].options.length)].value],
                  skinColor: [avatarOptions[1].options[Math.floor(Math.random() * avatarOptions[1].options.length)].value],
                  hair: [avatarOptions[2].options[Math.floor(Math.random() * avatarOptions[2].options.length)].value],
                  hairColor: [avatarOptions[3].options[Math.floor(Math.random() * avatarOptions[3].options.length)].value],
                  eyes: [avatarOptions[4].options[Math.floor(Math.random() * avatarOptions[4].options.length)].value],
                  mouth: [avatarOptions[5].options[Math.floor(Math.random() * avatarOptions[5].options.length)].value],
                  accessories: [avatarOptions[6].options[Math.floor(Math.random() * avatarOptions[6].options.length)].value],
                  seed: Math.random().toString(36).substring(2, 15)
                };
                console.log('New random settings:', randomSettings);
                setAvatarSettings(randomSettings);
              }}
            >
              <Text style={styles.randomizeButtonText}>🎲 Randomize Avatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Floating Bottom Navigation */}
      <BottomNavigation
        currentScreen="settings"
        isActive={isActive}
        onToggleActivity={onToggleActivity}
        onNavigateToMap={handleNavigateToMap}
        onNavigateToSettings={handleNavigateToSettings}
        userAvatarData={user.avatar_data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Remove gray background
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 120, // Reserve space for floating navigation
    backgroundColor: 'white', // Ensure white background
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', // Ensure white background
  },
  logoutSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 20,
  },
  logoutButtonNew: {
    backgroundColor: '#cc4e00', // Theme color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  headlineInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pronounsSelector: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pronounsSelectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  pronounsModalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 100,
    borderRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  pronounsOptionsContainer: {
    maxHeight: 400,
  },
  pronounsOption: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
  },
  pronounsOptionSelected: {
    backgroundColor: '#cc4e00', // Main theme color
  },
  pronounsOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  pronounsOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  clearOption: {
    backgroundColor: '#ff4444',
    marginTop: 10,
  },
  clearOptionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#cc4e00', // Main theme color
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#457a00', // Green theme color
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#457a00',
  },
  avatarPreview: {
    marginRight: 15,
  },
  avatarPreviewLarge: {
    alignItems: 'center',
    padding: 20,
  },
  avatarButtonText: {
    fontSize: 16,
    color: 'white', // White text on theme background
    flex: 1,
    fontWeight: '600',
  },
  optionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  optionButtonActive: {
    backgroundColor: '#cc4e00', // Main theme color
    borderColor: '#cc4e00',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#666',
  },
  optionButtonTextActive: {
    color: 'white',
  },
  randomizeButton: {
    backgroundColor: '#cc4e00', // Theme color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  randomizeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fixedAvatarPreview: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  slideNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#cc4e00', // Main theme color
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  slideIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  slideIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  slideIndicatorActive: {
    backgroundColor: '#cc4e00', // Main theme color
  },
  slideContainer: {
    flex: 1,
    padding: 20,
  },
  slideScrollView: {
    flex: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    minHeight: 50,
  },
  optionCardActive: {
    borderColor: '#007AFF',
    backgroundColor: '#e6f3ff',
  },
  optionCardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  randomizeContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalCancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalSaveText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  optionSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionActive: {
    borderColor: '#007AFF',
    borderWidth: 3,
  },
});

export default SettingsScreen;
