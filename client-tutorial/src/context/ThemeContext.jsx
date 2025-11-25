// ⏸️ WORKSHOP STEP 5: Implement Context API
// TODO: Import createContext, useContext, useState, useEffect

// TODO: Create ThemeContext
// const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  /* TODO: Implement ThemeProvider
    1. Create theme state (check localStorage)
    2. useEffect to save theme and apply to document
    3. Create toggleTheme function
    4. Return Provider with value
  */

  return children; // Placeholder - replace with Provider
}

export function useTheme() {
  /* TODO: Implement useTheme hook
    1. Use useContext to get theme context
    2. Throw error if used outside provider
    3. Return context
  */

  throw new Error("useTheme must be used within ThemeProvider");
}
