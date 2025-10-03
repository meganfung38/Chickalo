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

// Screen types
export type Screen = 'login' | 'register' | 'map' | 'settings';
