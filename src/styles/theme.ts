export const lightTheme = {
  colors: {
    // Background colors
    background: "#ffffff",
    backgroundSecondary: "#f5f7fa",
    backgroundTertiary: "#e8eef5",

    // Text colors
    text: "#000000",
    textSecondary: "#333333",
    textTertiary: "#666666",

    // Navigation bar
    navBackground: "rgba(255, 255, 255, 0.75)",
    navShadow: "rgba(0, 0, 0, 0.1)",

    // Borders
    border: "#e0e0e0",
    borderLight: "#f0f0f0",

    // Cards
    cardBackground: "#ffffff",
    cardShadow: "rgba(0, 0, 0, 0.1)",

    // Input fields
    inputBackground: "#ffffff",
    inputBorder: "#ddd",
    inputPlaceholder: "#999",

    // Modal
    modalBackground: "#ffffff",
    modalOverlay: "rgba(0, 0, 0, 0.5)",

    // Icons
    iconPrimary: "#000000",
    iconSecondary: "#666666",
  },
};

export const darkTheme = {
  colors: {
    // Background colors
    background: "#000000",
    backgroundSecondary: "#1f2937",
    backgroundTertiary: "#374151",

    // Text colors
    text: "#ffffff",
    textSecondary: "#e5e7eb",
    textTertiary: "#9ca3af",

    // Navigation bar
    navBackground: "rgba(17, 24, 39, 0.75)",
    navShadow: "rgba(0, 0, 0, 0.3)",

    // Borders
    border: "#374151",
    borderLight: "#4b5563",

    // Cards
    cardBackground: "#1f2937",
    cardShadow: "rgba(0, 0, 0, 0.3)",

    // Input fields
    inputBackground: "#374151",
    inputBorder: "#4b5563",
    inputPlaceholder: "#9ca3af",

    // Modal
    modalBackground: "#1f2937",
    modalOverlay: "rgba(0, 0, 0, 0.7)",

    // Icons
    iconPrimary: "#ffffff",
    iconSecondary: "#9ca3af",
  },
};

export type Theme = typeof lightTheme;
