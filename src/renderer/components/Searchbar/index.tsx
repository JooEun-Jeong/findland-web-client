import React from 'react';

import { useRecoilValue } from 'recoil';

import { Box, styled, TextField } from '@mui/material';

import { isMobileAtom } from '@states';

import { SearchButton } from '../Button';
import { SearchIcon } from '../Icons';

export const SearchTextField = styled(TextField)(({ theme }) => {
  const isMobile = useRecoilValue(isMobileAtom);
  return {
    backgroundColor: 'transparent',
    height: isMobile ? 'calc(var(--vh, 1vh) * 5)' : '45px',
    width: isMobile ? '70%' : '350px',
    '& > .MuiInputBase-root': {
      fontSize: isMobile ? '0.8rem' : '14px',
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
        width: isMobile ? '100%' : 'auto',
        // border: '1px solid rgb(239, 192, 114)',
      },
      '& > fieldset': {
        border: 'none',
      },
    },
  };
});

const SearchBox = styled(Box)(({ theme }) => {
  const isMobile = useRecoilValue(isMobileAtom);
  return {
    border: '1px solid rgb(255, 140, 68)',
    borderRadius: '5px',
    width: theme.breakpoints.down('sm') ? '80%' : '100%',
    height: isMobile ? 'calc(var(--vh, 1vh) * 7)' : 'auto',
    display: 'flex',
    alignItems: 'center',
    '&:focus': {
      border: '1px solid rgb(235, 127, 56)',
      boxShadow: '1px 2px 9px #F4AAB9',
    },
  };
});

export const SearchField = (props: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
}) => {
  const isMobile = useRecoilValue(isMobileAtom);
  return (
    <>
      <SearchBox>
        <SearchTextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setText(e.target.value)}
          sx={{ marginRight: '1px', width: '85%' }}
        />
        <SearchButton type="submit" onClick={props.handleSubmit}>
          <SearchIcon />
        </SearchButton>
      </SearchBox>
    </>
  );
};
