import { styled, Typography } from '@mui/material';

import { YellowButton } from '@components';

export const FindServiceButton = styled(YellowButton)(() => ({
  width: '60vw',
  fontSize: '0.8rem',
}));

export const FileDownloadButton = styled(YellowButton)(() => ({
  width: '30vw',
  flexDirection: 'column',
}));

export const FileDownloadTypo = styled(Typography)(() => ({
  fontSize: '0.7rem',
}));
