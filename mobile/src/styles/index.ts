import { StyleSheet, Dimensions } from 'react-native';

// Theme Constants
export const COLORS = {
  PRIMARY: '#cc4e00',      // Orange - main buttons, inactive header
  SECONDARY: '#457a00',    // Green - active states, active header
  WHITE: '#ffffff',
  BLACK: '#000',
  LIGHT_GRAY: '#f5f5f5',
  GRAY: '#f8f8f8',
  BORDER_GRAY: '#ddd',
  DISABLED_GRAY: '#ccc',
  TEXT_PRIMARY: '#333',
  TEXT_SECONDARY: '#666',
  TEXT_PLACEHOLDER: '#999',
  TEXT_ON_PRIMARY: '#ffffff',
  SUCCESS: '#457a00',
  ERROR: '#ff4444',
  WARNING: '#FF6B35',
  // Avatar/Speech Bubble colors
  AVATAR_BG_DEFAULT: '#b6e3f4',
  AVATAR_BG_DARK: '#64b4c8',
} as const;

export const TYPOGRAPHY = {
  FONT_FAMILY: {
    REGULAR: 'LeagueSpartan_400Regular',
    BOLD: 'LeagueSpartan_700Bold',
  },
  SIZES: {
    SMALL: 11,
    MEDIUM: 12,
    REGULAR: 14,
    LARGE: 16,
    XLARGE: 18,
    XXLARGE: 24,
    XXXLARGE: 32,
  },
  WEIGHTS: {
    NORMAL: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: 'bold',
  },
} as const;

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  XXL: 24,
  XXXL: 32,
  XXXXL: 40,
} as const;

export const BORDER_RADIUS = {
  SM: 8,
  MD: 10,
  LG: 12,
  XL: 20,
  ROUND: 28,
} as const;

export const LAYOUT = {
  HEADER_HEIGHT: 85,
  NAVIGATION_HEIGHT: 120,
  NAVIGATION_BOTTOM_OFFSET: 40,
  AVATAR_SIZE_SMALL: 52,
  AVATAR_SIZE_MEDIUM: 56,
  AVATAR_SIZE_LARGE: 60,
  LOGO_SIZE: 56,
} as const;

const { width: screenWidth } = Dimensions.get('window');

// Unified Stylesheet - ALL app styles in one place
export const styles = StyleSheet.create({
  // ===================
  // LAYOUT & CONTAINERS
  // ===================
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  containerGray: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  contentContainer: {
    flex: 1,
    padding: SPACING.XL,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.XXL,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ===================
  // HEADER COMPONENT
  // ===================
  headerContainer: {
    paddingTop: 65, // iPhone notch clearance
    paddingBottom: SPACING.XL,
    paddingHorizontal: SPACING.XL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SECONDARY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.BOLD,
    fontSize: TYPOGRAPHY.SIZES.XLARGE,
    color: COLORS.TEXT_ON_PRIMARY,
    textAlign: 'center',
  },

  // ===================
  // BOTTOM NAVIGATION
  // ===================
  navigationContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: SPACING.XL,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: LAYOUT.NAVIGATION_BOTTOM_OFFSET,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XXL,
    minWidth: 100,
  },
  navLabel: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.REGULAR,
    fontSize: TYPOGRAPHY.SIZES.SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  navLabelActive: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.BOLD,
    color: COLORS.SECONDARY,
  },
  logoIcon: {
    width: LAYOUT.LOGO_SIZE,
    height: LAYOUT.LOGO_SIZE,
    marginBottom: SPACING.MD,
  },
  toggleButton: {
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XXL,
    minWidth: 100,
  },
  toggleIcon: {
    fontSize: 56,
    marginBottom: SPACING.MD,
    color: COLORS.TEXT_SECONDARY,
  },
  toggleIconActive: {
    color: COLORS.SECONDARY,
  },
  toggleLabel: {
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: TYPOGRAPHY.WEIGHTS.MEDIUM,
  },
  toggleLabelActive: {
    color: COLORS.SECONDARY,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
  },
  avatarContainer: {
    width: LAYOUT.AVATAR_SIZE_MEDIUM,
    height: LAYOUT.AVATAR_SIZE_MEDIUM,
    borderRadius: BORDER_RADIUS.ROUND,
    overflow: 'hidden',
    marginBottom: SPACING.MD,
    borderWidth: 3, // Same as settings page
    borderColor: COLORS.PRIMARY, // Same orange border as settings page
  },

  // ===================
  // TYPOGRAPHY
  // ===================
  title: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.BOLD,
    fontSize: TYPOGRAPHY.SIZES.XXXLARGE,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.XXXXL,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.REGULAR,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    textAlign: 'center',
    marginBottom: SPACING.XXXXL,
    color: COLORS.TEXT_SECONDARY,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.BOLD,
    fontSize: TYPOGRAPHY.SIZES.XLARGE,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  bodyText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.REGULAR,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 24,
  },
  secondaryText: {
    fontSize: TYPOGRAPHY.SIZES.REGULAR,
    color: COLORS.TEXT_SECONDARY,
  },
  smallText: {
    fontSize: TYPOGRAPHY.SIZES.SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  linkText: {
    color: COLORS.SECONDARY,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  // ===================
  // FORM ELEMENTS
  // ===================
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: SPACING.LG,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
  },
  inputFocused: {
    borderColor: COLORS.PRIMARY,
  },
  inputError: {
    borderColor: COLORS.ERROR,
  },

  // ===================
  // BUTTONS
  // ===================
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  buttonSecondary: {
    backgroundColor: COLORS.SECONDARY,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.BORDER_GRAY,
    borderWidth: 1,
  },
  buttonDisabled: {
    backgroundColor: COLORS.DISABLED_GRAY,
  },
  buttonText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.BOLD,
    color: COLORS.TEXT_ON_PRIMARY,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
  },
  buttonTextOutline: {
    color: COLORS.TEXT_PRIMARY,
  },
  buttonTextDisabled: {
    color: COLORS.TEXT_SECONDARY,
  },

  // ===================
  // CARDS & SECTIONS
  // ===================
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.XL,
    marginBottom: SPACING.LG,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  section: {
    marginBottom: SPACING.XXL,
  },
  sectionContent: {
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
  },

  // ===================
  // MODALS
  // ===================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.XXL,
    margin: SPACING.XL,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.SIZES.XLARGE,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  modalCloseButton: {
    padding: SPACING.SM,
  },
  modalCloseText: {
    fontSize: TYPOGRAPHY.SIZES.XXLARGE,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: TYPOGRAPHY.WEIGHTS.BOLD,
  },

  // ===================
  // SETTINGS SCREEN
  // ===================
  settingsContentContainer: {
    flex: 1,
    paddingBottom: LAYOUT.NAVIGATION_HEIGHT,
    backgroundColor: COLORS.WHITE,
  },
  settingsContent: {
    flex: 1,
    padding: SPACING.XL,
    backgroundColor: COLORS.WHITE,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: SPACING.XXXL,
  },
  userInfoAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // Perfect circle
    overflow: 'hidden',
    marginBottom: SPACING.XL, // More spacing between avatar and username
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  userInfoText: {
    fontSize: TYPOGRAPHY.SIZES.REGULAR,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  avatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
  },
  avatarPreview: {
    marginRight: SPACING.LG,
  },
  avatarButtonText: {
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    color: COLORS.TEXT_ON_PRIMARY,
    flex: 1,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
  },
  logoutSection: {
    padding: SPACING.XL,
    backgroundColor: COLORS.WHITE,
    marginTop: SPACING.XL,
  },
  logoutButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: COLORS.TEXT_ON_PRIMARY,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
  },

  // Avatar Customization Modal
  avatarModalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.XL,
    margin: SPACING.XL,
    height: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  fixedAvatarPreview: {
    alignItems: 'center',
    paddingVertical: SPACING.XL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GRAY,
    marginBottom: SPACING.XL,
  },
  slideContainer: {
    flex: 1,
    width: screenWidth - 80,
    paddingHorizontal: SPACING.XL,
  },
  slideTitle: {
    fontSize: TYPOGRAPHY.SIZES.XLARGE,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
    textAlign: 'center',
    marginBottom: SPACING.XL,
    color: COLORS.TEXT_PRIMARY,
  },
  optionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.MD,
    justifyContent: 'center',
  },
  optionButton: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    backgroundColor: COLORS.WHITE,
  },
  optionButtonActive: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  optionButtonText: {
    fontSize: TYPOGRAPHY.SIZES.REGULAR,
    color: COLORS.TEXT_SECONDARY,
  },
  optionButtonTextActive: {
    color: COLORS.TEXT_ON_PRIMARY,
  },
  randomizeButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    marginTop: SPACING.XL,
    marginBottom: SPACING.XL, // More space before save button
  },
  randomizeButtonText: {
    color: COLORS.TEXT_ON_PRIMARY,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    fontWeight: TYPOGRAPHY.WEIGHTS.BOLD,
  },
  saveAvatarButton: {
    backgroundColor: COLORS.SECONDARY, // Green to contrast with orange randomize
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  saveAvatarButtonText: {
    color: COLORS.TEXT_ON_PRIMARY,
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    fontWeight: TYPOGRAPHY.WEIGHTS.BOLD,
  },
  navigationArrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.XL,
    marginTop: SPACING.XL,
  },
  arrowButton: {
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    backgroundColor: COLORS.GRAY,
  },
  arrowText: {
    fontSize: TYPOGRAPHY.SIZES.XLARGE,
    color: COLORS.TEXT_PRIMARY,
  },
  slideIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  slideIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.BORDER_GRAY,
  },
  slideIndicatorActive: {
    backgroundColor: COLORS.PRIMARY,
  },

  // Pronouns Modal
  pronounsOptionsContainer: {
    maxHeight: 300,
  },
  pronounsOption: {
    padding: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GRAY,
  },
  pronounsOptionSelected: {
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  pronounsOptionText: {
    fontSize: TYPOGRAPHY.SIZES.LARGE,
    color: COLORS.TEXT_PRIMARY,
  },

  // ===================
  // MAP SCREEN
  // ===================
  mapContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  mapContent: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },

  // ===================
  // AVATAR COMPONENT
  // ===================
  avatarError: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarErrorText: {
    fontSize: TYPOGRAPHY.SIZES.SMALL,
    color: COLORS.TEXT_SECONDARY,
  },

  // ===================
  // UTILITY CLASSES
  // ===================
  flex1: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: SPACING.LG,
  },
  marginTop: {
    marginTop: SPACING.LG,
  },
  paddingHorizontal: {
    paddingHorizontal: SPACING.XL,
  },
  paddingVertical: {
    paddingVertical: SPACING.XL,
  },
  textCenter: {
    textAlign: 'center',
  },
  hidden: {
    display: 'none',
  },

  // ===================
  // MAP SCREEN
  // ===================
  mapView: {
    width: '100%',
    height: '100%',
  },
  recenterButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recenterButtonText: {
    fontSize: 28,
    color: COLORS.PRIMARY,
  },
  permissionDeniedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionDeniedEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  permissionDeniedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionDeniedMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },

  // ===================
  // AVATAR MARKER (MAP COMPONENT)
  // ===================
  avatarMarkerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentUserMarkerBorder: {
    borderWidth: 3,
    borderColor: COLORS.PRIMARY, // Orange border for current user
  },
  activeMarkerBorder: {
    borderWidth: 3,
    borderColor: COLORS.SECONDARY, // Green border for active users
  },
  inactiveMarkerBorder: {
    borderWidth: 3,
    borderColor: '#cccccc', // Gray border for inactive
  },

  // ===================
  // SPEECH BUBBLE (HEADLINE)
  // ===================
  speechBubbleContainer: {
    marginBottom: 8, // Space between bubble and avatar
    maxWidth: 150,
    minWidth: 80,
    alignItems: 'center',
  },
  speechBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  speechBubbleTail: {
    width: 0,
    height: 0,
    marginTop: -1,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderTopColor will be set dynamically
  },
  headlineText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY.BOLD,
    fontSize: TYPOGRAPHY.SIZES.MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
});
