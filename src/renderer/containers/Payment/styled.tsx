import { styled, Button, Box } from '@mui/material';

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
