import { styled, Box, Checkbox, Typography } from '@mui/material';

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
  height: '75vh',
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
  backgroundColor: 'white',
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '1.8rem',
  width: '100%',
  height: '100%',
}));

export const HeaderWrapperM = styled(Box)(() => ({
  position: 'sticky',
  borderTop: '1px solid #BBB',
}));

export const TableRootChecbox = styled(Checkbox)(() => ({
  color: '#ffbd59',
  height: '100%',
  '&.Mui-checked': {
    color: '#ffbd59',
    transition: 'fill 0.3s',
  },
  '&.Mui-disabled': {
    color: 'gray',
    '& > svg': {
      height: '1.5em',
      width: '1.5em',
    },
  },
  '& > svg': {
    height: '1.5em',
    width: '1.5em',
    transition: 'fill 0.3s',
  },
}));

export const TableEachChecbox = styled(Checkbox)(() => ({
  height: '1.5em',
  width: '1.5em',
  color: '#ffbd59',
  '&.Mui-checked': {
    color: 'rgba(255, 140, 68, 0.598)',
    transition: 'fill 0.3s',
  },
  '& .Mui-disabled': {
    backgroundColor: 'gray',
    '& .MuiSvgIcon-root': {
      height: '1.5em',
      width: '1.5em',
    },
    height: '1.5em',
    width: '1.5em',
  },
  '& .MuiSvgIcon-root': {
    height: '1.5em',
    width: '1.5em',
  },
}));

export const NoRenderTitleTypo = styled(Typography)(() => ({
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '1.8rem',
  fontWeight: 600,
}));

export const NoRenderContentTypo = styled(Typography)(() => ({
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '1.8rem',
}));
