import { createContext, type ReactNode, useContext, useState } from "react";

interface FooterContextType {
  hideFooter: boolean;
  setHideFooter: (hide: boolean) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterProvider = ({ children }: { children: ReactNode }) => {
  const [hideFooter, setHideFooterState] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("hideFooter");
    return saved === null ? true : saved === "true";
  });

  const setHideFooter = (hide: boolean) => {
    setHideFooterState(hide);
    localStorage.setItem("hideFooter", String(hide));
  };

  return (
    <FooterContext.Provider value={{ hideFooter, setHideFooter }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = (): FooterContextType => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
};
