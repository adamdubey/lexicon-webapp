import { createTheme, TextField, ThemeProvider } from "@material-ui/core/";
import React from "react";
import "./Header.css";
import MenuItem from "@material-ui/core/MenuItem";
import languages from "../../data/languages";
import { debounce } from "lodash";

const Header = ({
  language,
  setLanguage,
  setWord,
  word,
  setMeanings,
  LightTheme,
}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      type: LightTheme ? "light" : "dark",
    },
  });

  const handleChange = (e) => {
    setLanguage(e.target.value);
    setWord("");
    setMeanings([]);
  };

    const handleText = debounce((text) => {
    setWord(text);
  }, 500);

  return (
    <div className="header">
      <span className="title">{word ? word : "Lexicon App"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="filled-basic"
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
          />
          <TextField
            select
            label="Language"
            value={language}
            onChange={(e) => handleChange(e)}
            className="select"
          >
            {languages.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
