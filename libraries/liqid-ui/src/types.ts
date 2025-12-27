import type { ReactNode } from "react";

export interface AppWindowProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export interface AppDefinition {
  id: string;
  title: string;
  icon: ReactNode;
  Component: React.ComponentType<AppWindowProps>;
}
