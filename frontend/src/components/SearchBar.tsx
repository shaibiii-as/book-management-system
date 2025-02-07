import React from "react";
import { Box } from "@mui/material";
import { DebounceInput } from "react-debounce-input"; 

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({ setFilter }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Box mb={2} sx={{width:"100%"}}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={handleChange}
        placeholder="Search by title, author, or ISBN"
        style={{ width: "99%", padding: "8px", fontSize: "16px" }}
      />
    </Box>
  );
};

export default SearchBar;
