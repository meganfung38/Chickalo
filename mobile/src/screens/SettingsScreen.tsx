import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { authAPI, storageAPI } from '../services/api';
import DiceBearAvatar from '../components/DiceBearAvatar';
import ActivityBorderedAvatar from '../components/ActivityBorderedAvatar';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { styles, COLORS, SPACING } from '../styles';
import { AVATAR_OPTIONS, getDefaultAvatarSettings, PRONOUN_OPTIONS } from '../constants/avatar';
import { SettingsScreenProps, AvatarSettings } from '../types';

const { width: screenWidth } = Dimensions.get('window');

const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  user, 
  isActive, 
  onToggleActivity, 
  onBack, 
  onLogout, 
  onUserUpdate 
}) => {
  const [headline, setHeadline] = useState(user.headline || '');
  const [pronouns, setPronouns] = useState(user.pronouns || '');
  const [showPronounsModal, setShowPronounsModal] = useState(false);

  // Use centralized default avatar settings with proper typing
  const getDefaultAvatarSettingsLocal = (): AvatarSettings => {
    const defaults = getDefaultAvatarSettings();
    return {
      ...defaults,
      seed: Math.random().toString(36).substring(2, 15), // Random seed
      accessoriesChance: 0,
      eyesChance: 100,
      mouthChance: 100,
      hairChance: 100,
    } as AvatarSettings;
  };

  // Separate state for saved avatar (what's displayed) vs editing avatar (what's being customized)
  const [savedAvatarSettings, setSavedAvatarSettings] = useState<AvatarSettings>(() => {
    if (user.avatar_data && typeof user.avatar_data === 'object') {
      return {
        ...getDefaultAvatarSettingsLocal(),
        ...user.avatar_data
      };
    }
    return getDefaultAvatarSettingsLocal();
  });
  
  const [editingAvatarSettings, setEditingAvatarSettings] = useState<AvatarSettings>(savedAvatarSettings);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Convert centralized avatar options to the format expected by the component
  const avatarOptions = Object.entries(AVATAR_OPTIONS).map(([key, options]) => ({
    id: key,
    title: key === 'backgroundColor' ? 'Background' : 
           key === 'skinColor' ? 'Skin Color' :
           key === 'hair' ? 'Hair Style' :
           key === 'hairColor' ? 'Hair Color' :
           key === 'eyes' ? 'Eyes' :
           key === 'mouth' ? 'Mouth' :
           key === 'accessories' ? 'Accessories' : key,
    options: options.map(option => ({ name: option.label, value: option.value }))
  }));

  const updateAvatarSetting = (key: string, value: string) => {
    setEditingAvatarSettings(prev => {
      // Create a unique seed based on the combination of all settings
      const newSettings = {
        ...prev,
        [key]: [value]
      };
      
      // Generate a unique seed based on all current settings
      const seedString = Object.entries(newSettings)
        .filter(([k, v]) => k !== 'seed' && Array.isArray(v) && v.length > 0)
        .map(([k, v]) => `${k}:${(v as string[])[0]}`)
        .join('|');
      
      newSettings.seed = btoa(seedString).substring(0, 12);
      
      return newSettings;
    });
  };

  const randomizeAvatar = () => {
    const newSettings: AvatarSettings = {
      style: 'big-smile',
      seed: Math.random().toString(36).substring(2, 15),
      backgroundColor: [AVATAR_OPTIONS.backgroundColor[Math.floor(Math.random() * AVATAR_OPTIONS.backgroundColor.length)].value],
      skinColor: [AVATAR_OPTIONS.skinColor[Math.floor(Math.random() * AVATAR_OPTIONS.skinColor.length)].value],
      hair: [AVATAR_OPTIONS.hair[Math.floor(Math.random() * AVATAR_OPTIONS.hair.length)].value],
      hairColor: [AVATAR_OPTIONS.hairColor[Math.floor(Math.random() * AVATAR_OPTIONS.hairColor.length)].value],
      eyes: [AVATAR_OPTIONS.eyes[Math.floor(Math.random() * AVATAR_OPTIONS.eyes.length)].value],
      mouth: [AVATAR_OPTIONS.mouth[Math.floor(Math.random() * AVATAR_OPTIONS.mouth.length)].value],
      accessories: [AVATAR_OPTIONS.accessories[Math.floor(Math.random() * AVATAR_OPTIONS.accessories.length)].value],
      accessoriesChance: 100,
      eyesChance: 100,
      mouthChance: 100,
      hairChance: 100,
    };
    
    setEditingAvatarSettings(newSettings);
  };

  // Generic save handler to reduce duplication
  const handleSave = async (
    apiCall: () => Promise<any>, 
    successMessage: string, 
    errorPrefix: string = 'Failed to update',
    onSuccess?: () => void
  ) => {
    try {
      const response = await apiCall();
      onUserUpdate(response.user);
      Alert.alert('Success', successMessage);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || `${errorPrefix}. Please try again.`);
    }
  };

  const handleSaveHeadline = () => 
    handleSave(() => authAPI.updateHeadline(headline), 'Headline updated successfully');

  const handleSavePronouns = () => 
    handleSave(() => authAPI.updatePronouns(pronouns), 'Pronouns updated successfully');

  const handleSaveAvatar = () => 
    handleSave(
      () => authAPI.updateAvatar(editingAvatarSettings), 
      'Avatar updated successfully',
      'Failed to update avatar',
      () => {
        setSavedAvatarSettings(editingAvatarSettings);
        setShowAvatarModal(false);
      }
    );

  const handleOpenAvatarModal = () => {
    setEditingAvatarSettings(savedAvatarSettings); // Reset to saved state when opening
    setCurrentSlide(0); // Reset to first slide
    setShowAvatarModal(true);
  };

  const handleCloseAvatarModal = () => {
    setEditingAvatarSettings(savedAvatarSettings); // Reset to saved state when closing without saving
    setShowAvatarModal(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await storageAPI.removeToken();
            onLogout();
          },
        },
      ]
    );
  };

  const onNavigateToMap = () => {
    onBack();
  };

  const onNavigateToSettings = () => {
    // Already on settings screen, do nothing
  };

  const nextSlide = () => {
    if (currentSlide < avatarOptions.length - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      flatListRef.current?.scrollToIndex({ index: newSlide, animated: true });
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      flatListRef.current?.scrollToIndex({ index: newSlide, animated: true });
    }
  };

  const renderAvatarOption = ({ item }: { item: typeof avatarOptions[0] }) => (
    <View style={styles.slideContainer}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={true}>
        <View style={styles.optionButtons}>
          {item.options.map((option: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                (editingAvatarSettings[item.id as keyof AvatarSettings] as string[])?.[0] === option.value && styles.optionButtonActive
              ]}
              onPress={() => updateAvatarSetting(item.id, option.value)}
            >
              {item.id === 'backgroundColor' ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: `#${option.value}`,
                    borderRadius: 15,
                    marginRight: 8,
                  }}
                />
              ) : null}
              <Text
                style={[
                  styles.optionButtonText,
                  (editingAvatarSettings[item.id as keyof AvatarSettings] as string[])?.[0] === option.value && styles.optionButtonTextActive
                ]}
              >
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header username={user.username} isActive={isActive} />

      {/* Content Container with proper bounds */}
      <View style={styles.settingsContentContainer}>
        <ScrollView 
          style={styles.settingsContent}
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* User Info Section */}
          <View style={styles.userInfo}>
            <View style={{ marginBottom: SPACING.XL }}>
              <ActivityBorderedAvatar
                settings={savedAvatarSettings}
                size={80}
                isActive={isActive}
                seed={savedAvatarSettings.seed}
              />
            </View>
            <Text style={styles.sectionTitle}>{user.username}</Text>
            <Text style={styles.userInfoText}>{user.email}</Text>
            <Text style={styles.userInfoText}>
              Joined {new Date(user.created_at).toLocaleDateString()}
            </Text>
          </View>

          {/* Headline Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Headline</Text>
            <TextInput
              style={styles.input}
              value={headline}
              onChangeText={setHeadline}
              placeholder="Tell others about yourself..."
              multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveHeadline}>
              <Text style={styles.buttonText}>Save Headline</Text>
            </TouchableOpacity>
          </View>

          {/* Pronouns Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pronouns</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPronounsModal(true)}
            >
              <Text style={[styles.bodyText, !pronouns && { color: COLORS.TEXT_PLACEHOLDER }]}>
                {pronouns || 'Select pronouns (optional)'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSavePronouns}>
              <Text style={styles.buttonText}>Save Pronouns</Text>
            </TouchableOpacity>
          </View>

          {/* Avatar Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avatar</Text>
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={handleOpenAvatarModal}
            >
              <View style={styles.avatarPreview}>
                <DiceBearAvatar 
                  key={savedAvatarSettings.seed} 
                  settings={savedAvatarSettings} 
                  size={60} 
                />
              </View>
              <Text style={styles.avatarButtonText}>Customize Avatar</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Pronouns</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowPronounsModal(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.pronounsOptionsContainer}>
              {PRONOUN_OPTIONS.map((option, index) => (
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
                  <Text style={styles.pronounsOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Avatar Customization Modal */}
      <Modal
        visible={showAvatarModal}
        animationType="slide"
        onRequestClose={() => setShowAvatarModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.avatarModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Customize Avatar</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleCloseAvatarModal}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Fixed Avatar Preview */}
            <View style={styles.fixedAvatarPreview}>
              <DiceBearAvatar 
                key={editingAvatarSettings.seed}
                settings={editingAvatarSettings} 
                size={100} 
              />
            </View>

            {/* Slideshow for customization options */}
            <FlatList
              ref={flatListRef}
              data={avatarOptions}
              renderItem={renderAvatarOption}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const slideIndex = Math.round(event.nativeEvent.contentOffset.x / (screenWidth - 80));
                setCurrentSlide(slideIndex);
              }}
            />

            {/* Navigation arrows and indicators */}
            <View style={styles.navigationArrows}>
              <TouchableOpacity 
                style={styles.arrowButton} 
                onPress={prevSlide}
                disabled={currentSlide === 0}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>
              
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
              
              <TouchableOpacity 
                style={styles.arrowButton} 
                onPress={nextSlide}
                disabled={currentSlide === avatarOptions.length - 1}
              >
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Randomize and Save buttons */}
            <TouchableOpacity
              style={styles.randomizeButton}
              onPress={randomizeAvatar}
            >
              <Text style={styles.randomizeButtonText}>🎲 Randomize Avatar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveAvatarButton} onPress={handleSaveAvatar}>
              <Text style={styles.saveAvatarButtonText}>Save Avatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentScreen="settings"
        isActive={isActive}
        onToggleActivity={onToggleActivity}
        onNavigateToMap={onNavigateToMap}
        onNavigateToSettings={onNavigateToSettings}
        userAvatarData={user.avatar_data}
      />
    </View>
  );
};

export default SettingsScreen;