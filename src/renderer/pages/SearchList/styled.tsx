import { styled, Box } from '@mui/material';

export const SearchBarWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '30px',
}));

export const SearchBox = styled(Box)(() => ({
  border: '1px solid rgb(255, 140, 68)',
  borderRadius: '5px',
  '&:focus': {
    border: '1px solid rgb(235, 127, 56)',
    boxShadow: '1px 2px 9px #F4AAB9',
  },
}));

export const MainBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const PaymentBox = styled(Box)(() => ({
  width: '420px',
  height: '300px',
  border: '1px solid #eee',
  marginLeft: '20px',
  borderRadius: '5px',
  '& .shadow': {
    boxShadow: 2,
  },
}));
