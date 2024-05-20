import { styled, Box } from '@mui/material';

export const SearchBarWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '30px',
}));

export const SearchBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid rgb(255, 140, 68)',
  width: '100%',
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
  '& .mobile': {
    width: '100%',
    // height: '8%',
  },
}));

export const SearchBarWrapperMobile = styled(Box)(() => ({
  display: 'flex',
  marginTop: '5%',
  width: '100%',
}));

export const TableWrapperMobile = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '75%',
  width: '100%',
  '& .MuiDataGrid-columnHeaders': {
    height: 'auto',
    backgroundColor: '#fff',
    border: 'none',
    borderBottom: '1px solid #B1B2B5',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: '1.4rem',
    },
  },
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    fontSize: '1.5rem',
    backgroundColor: '#fff',
  },
  '& .MuiDataGrid-virtualScrollerContent': {
    backgroundColor: '#fff',
    borderBottom: '1px solid #B1B2B5',
  },
  marginTop: '3%',
}));

export const GrayBox = styled(Box)(() => ({
  width: '10%',
  display: 'flex',
  backgroundColor: '#F4F4F4',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const TableHeaderBox = styled(Box)(() => ({
  width: '100%',
  height: '7%',
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const TableHeaderColumnBox = styled(Box)((props: { backgroundColor: string; width: string }) => ({
  backgroundColor: props.backgroundColor,
  width: props.width,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#000',
}));

export const MobileContentWrapper = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const NoRenderBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '14px',
  width: '100%',
  height: '100%',
}));

export const AccountBox = styled(Box)(() => ({
  marginTop: '3%',
  padding: '1%',
  border: '1px solid #B1B2B5',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}));

export const HeaderWrapperM = styled(Box)(() => ({
  position: 'sticky',
  borderTop: '1px solid #BBB',
}));
