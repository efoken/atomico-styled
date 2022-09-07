import { createContext, useContext } from "atomico/core";
import { Theme } from "./types";

export const ThemeProvider = createContext<Theme>({} as any);

customElements.define("styled-theme-provider", ThemeProvider);

export function useTheme() {
    return useContext(ThemeProvider);
}
