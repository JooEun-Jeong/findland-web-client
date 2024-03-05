import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, styled, TextField } from '@mui/material';

import { SearchButton } from '../Button';

export const SearchTextField = styled(TextField)(() => ({
  backgroundColor: 'transparent',
  height: '45px',
  width: '350px',
  '& > .MuiInputBase-root': {
    fontSize: '14px',
    lineHeight: '30px',
    height: '100%',
    color: '#000',
    letterSpacing: '0.15px',
    '& > input': {
      padding: '0 0 0 10px',
      height: '100%',
      borderRadius: 5,
      backgroundColor: '#fff',
      color: '#dd5515',
      fontWeight: 600,
      // border: '1px solid rgb(239, 192, 114)',
    },
    '& > fieldset': {
      border: 'none',
    },
  },
}));

const SearchBox = styled(Box)(() => ({
  border: '1px solid rgb(255, 140, 68)',
  borderRadius: '5px',
  '&:focus': {
    border: '1px solid rgb(235, 127, 56)',
    boxShadow: '1px 2px 9px #F4AAB9',
  },
}));

export const SearchField = (props: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
}) => {
  return (
    <>
      <SearchBox>
        <SearchTextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setText(e.target.value)}
          sx={{ marginRight: '1px' }}
        />
        <SearchButton type="submit" onClick={props.handleSubmit}>
          <SearchIcon sx={{ color: 'rgb(255, 140, 68)' }} />
        </SearchButton>
      </SearchBox>
    </>
  );
};
