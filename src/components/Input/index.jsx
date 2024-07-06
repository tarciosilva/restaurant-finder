import React from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';

import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ onQuery, onInput, inPut }) => {
  return (
    <TextField
      fullWidth
      label="search"
      id="fullWidth"
      inputProps={{ "aria-label": "search google maps" }}
      value={inPut}
      onChange={(e) => onInput(e.target.value)}
      onKeyPress={onQuery}
      helperText="Busque por restaurantes próximos..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
              <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;

