'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="data-theme" 
      defaultTheme="light" 
      enableSystem
      themes={['light', 'green', 'blue', 'purple', 'orange', 'red', 'night']} 
      value={{
        light: 'light',
        green: 'green',
        blue: 'blue',
        purple: 'purple',
        orange: 'orange',
        red: 'red',
        night: 'night',
      }}
    >
      {children}
    </ThemeProvider>
  );
}