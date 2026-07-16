import { useState } from "react"
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");    
  } 
  return (
    /* From react ver 19 use <ThemeContext> => old ver use <ThemeContext.Provider> */
    /* {{}} <=> { 
                  theme: theme, 
                  toggleTheme: toggleTheme 
                } 
    */
    <ThemeContext value={{ theme, toggleTheme}}> {/* only one */}
      {children}
    </ThemeContext>
  )
}