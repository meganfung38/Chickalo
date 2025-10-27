// Centralized type definitions

export interface User {
  id: number;
  username: string;
  email: string;
  headline: string;
  avatar_data: AvatarSettings;
  pronouns: string | null;
  is_active: boolean;
  created_at: string;
}

export interface AvatarSettings {
  style: string;
  seed: string;
  backgroundColor: string[];
  skinColor: string[];
  hair: string[];
  hairColor: string[];
  eyes: string[];
  mouth: string[];
  accessories: string[];
  accessoriesChance?: number;
  eyesChance?: number;
  mouthChance?: number;
  hairChance?: number;
}

// Component Props
export interface HeaderProps {
  username: string;
  isActive: boolean;
}

export interface BottomNavigationProps {
  currentScreen: 'map' | 'settings';
  isActive: boolean;
  onToggleActivity: () => void;
  onNavigateToMap: () => void;
  onNavigateToSettings: () => void;
  userAvatarData: AvatarSettings;
}

export interface DiceBearAvatarProps {
  settings: AvatarSettings;
  size: number;
}

export interface LoginScreenProps {
  onLogin: (token: string, user: User) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword?: () => void;
}

export interface ForgotPasswordScreenProps {
  onBack: () => void;
  onTokenSubmit?: (token: string) => void;
}

export interface ResetPasswordScreenProps {
  token: string;
  onSuccess: () => void;
  onBack: () => void;
}

export interface RegisterScreenProps {
  onRegister: (token: string, user: User) => void;
  onNavigateToLogin: () => void;
}

export interface MapScreenProps {
  user: User;
  isActive: boolean;
  onToggleActivity: () => void;
  onNavigateToSettings: () => void;
}

export interface SettingsScreenProps {
  user: User;
  isActive: boolean;
  onToggleActivity: () => void;
  onBack: () => void;
  onLogout: () => void;
  onUserUpdate: (updatedUser: User) => void;
}

export interface UserInfoModalProps {
  visible: boolean;
  user: {
    username: string;
    headline: string;
    pronouns: string | null;
    avatar_data: AvatarSettings;
  };
  onClose: () => void;
}

export interface AvatarMarkerProps {
  settings: AvatarSettings;
  isActive: boolean;
  isCurrentUser: boolean;
  headline: string | null;
  onPress?: () => void;
}

// Screen types
export type Screen = 'login' | 'register' | 'forgotPassword' | 'resetPassword' | 'map' | 'settings';
