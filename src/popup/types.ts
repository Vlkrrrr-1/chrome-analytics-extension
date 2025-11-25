export type Section = "basic" | "pro" | "enterprise";

export interface BasicSectionProps {
  isPaused: boolean;
  togglePause: () => void;
}

export interface ProSectionProps {
  isPaused: boolean;
  isIncognito: boolean;
  togglePause: () => void;
  togglePauseIncognito: () => void;
  isClick: boolean;
  togglePauseClick: () => void;
}

export interface EnterpriseSectionProps {
  isMedia: boolean;
  togglePauseMedia: () => void;
}

export interface HeaderProps {
  activeSection: Section;
  setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
}

export interface FooterProps {
  onListClick: () => void;
}

export interface EventsListProps {
  onBack: () => void;
}

export interface ToggleSwitchProps {
  togglePause?: () => void;
  isPaused?: boolean;
}

export interface IncognitoToggleSwitchProps {
  isIncognito?: boolean;
  togglePauseIncognito?: () => void;
}

export interface CardProps {
  text?: string;
  subtext?: string;
  photo?: string;
  value?: string | number;
  color?: string;
  boxProps?: any;
}
