import React, { createContext, FC, useContext, useState } from 'react';

type OnboardingContextType = {
  onboarded: boolean;
  setOnboarded: (onboarded: boolean) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: FC<{}> = ({ children }) => {
  const [onboarded, setOnboarded] = useState(false);

  console.log({
    onboarded,
  });

  return (
    <OnboardingContext.Provider value={{ onboarded, setOnboarded }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }

  return context;
}
