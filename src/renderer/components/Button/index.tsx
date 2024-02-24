import { styled, Button, Box } from '@mui/material';

export const SearchButton = styled(Button)(() => ({
  width: '45px',
  height: '45px',
  // border: '1px solid rgb(255, 140, 68)',
  borderRadius: '50%',
  color: '#fff',
  '&:hover': {
    '& > svg': {
      color: '#dd5515',
    },
  },
}));

export const UnCheckedIcon = styled(Box)(() => ({
  borderRadius: '5px',
  width: 18,
  height: 18,
  border: '1px solid #dd5515',
  backgroundColor: 'transparent',
}));

export const CheckedIcon = styled(Box)(() => ({
  borderRadius: '5px',
  width: 18,
  height: 18,
  border: '1px solid #dd5515',
  backgroundColor: '#ff914d',
  content: 'V',
  color: '#fff',
}));
