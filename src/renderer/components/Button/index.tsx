import { styled, Button, Box } from '@mui/material';

export const SearchButton = styled(Button)(({ theme }) => ({
  width: theme.breakpoints.down('sm') ? '10%' : '45px',
  height: theme.breakpoints.down('sm') ? '10%' : '45px',
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

export const MenuButton = styled(Button)(() => ({
  width: 105,
  height: 36,
  backgroundColor: '#FFE9C2',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: 10,
  marginRight: 25,
  fontSize: 14,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#FFE9C29C',
    color: 'black',
  },
  '&.last-child': {
    marginRight: 0,
  },
}));
