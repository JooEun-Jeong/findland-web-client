import { styled, TextField } from '@mui/material';

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
