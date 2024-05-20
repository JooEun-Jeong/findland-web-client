import { styled, Button, Box, Typography } from '@mui/material';

export const PayResultRootBox = styled(Box)(() => ({
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  minWidth: '300px',
  width: '100%',
  height: '40px',
  marginTop: '20px',
}));

export const PayResultBox = styled(Box)(() => ({
  backgroundColor: '#F4F4F6',
  borderRadius: '5px',
  height: '40px',
  width: '270px',
  display: 'flex',
  minwidth: '200px',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 15px',
  marginLeft: '10px',
  border: '1px solid #EEE',
}));

export const PayButton = styled(Button)(() => ({
  backgroundColor: '#ffbd59',
  color: '#000',
  borderRadius: '5px',
  maxHeight: '50px',
  height: '100%',
  width: '100%',
  minWidth: '60px',
  padding: '5px 15px',
  '&:hover': {
    backgroundColor: 'rgb(235, 127, 56)',
  },
}));

export const ComputeBoxM = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  padding: '3% 3% 3% 3%',
  border: '1px solid #B1B2B5',
  alignItems: 'center',
  marginBottom: '2%',
}));

export const CountBoxM = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '45%',
  alignItems: 'center',
  height: '100%',
}));

export const TotalComputeBoxM = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const TotalPriceBoxM = styled(Box)(() => ({
  backgroundColor: '#F4F4F6',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '3% 3%',
  border: '1px solid #EEE',
  width: '70%',
  height: '100%',
}));

export const PriceTypoM = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
}));

export const PayButtonM = styled(Button)(() => ({
  backgroundColor: '#ffbd59',
  color: '#000',
  borderRadius: '5px',
  height: '5vh',
  width: '100%',
  padding: '3%',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: 'rgb(235, 127, 56)',
  },
}));
