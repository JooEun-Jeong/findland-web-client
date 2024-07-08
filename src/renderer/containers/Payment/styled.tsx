import { styled, Button, Box, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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

export const PaymentDataGrid = styled(DataGrid)(() => ({
  width: '100%',
  height: 'auto',
  overflowX: 'hidden',
  overflowY: 'hidden',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#F4F4F6',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: 13,
  },
  '& .title': {
    backgroundColor: '#F4F4F6',
    fontWeight: 'bold',
    fontSize: 13,
    border: '1px solid rgba(224, 224, 224, 1)',
  },
}));

export const ModalBackgroundBox = styled(Box)(() => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: '#fff',
  border: '2px solid #000',
}));

export const ModalContentBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '3%',
  backgroundColor: '#FFF',
}));

export const ModalTitleBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  marginBottom: '2%',
}));

export const ModalDesBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  marginTop: '2%',
  border: '1px solid #B1B2B5',
  padding: '1%',
}));

export const BankAccountBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.6rem',
  width: '100%',
  minHeight: '60px',
  fontWeight: 700,
  marginTop: '3%',
}));

export const BankAccountTextField = styled(TextField)(() => ({
  '& > .MuiInputBase-root': {
    fontSize: '1.8rem',
    lineHeight: '30px',
    height: '100%',
    color: '#000',
    letterSpacing: '0.15px',
    '& > input': {
      padding: '2%',
      height: '100%',
      borderRadius: 5,
      backgroundColor: '#fff',
      color: '#dd5515',
      fontWeight: 600,
      width: '100%',
    },
  },
}));

export const BankDesBox = styled(Box)(() => ({
  marginTop: '3%',
  padding: '1%',
  border: '1px solid #B1B2B5',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}));

export const BankTypo = styled(Typography)(() => ({ fontSize: '1.5rem', display: 'flex', justifyContent: 'center' }));

export const CancelButton = styled(Button)(() => ({
  borderRadius: 5,
  backgroundColor: '#CACACA',
  width: '30vw',
  height: '100%',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#000',
  marginRight: '3%',
}));
