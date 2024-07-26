import { styled, Box, Typography } from '@mui/material';

import { YellowButton } from '@components';

export const FindServiceButton = styled(YellowButton)(() => ({
  width: '60vw',
}));

export const FileDownloadButton = styled(YellowButton)(() => ({
  width: '30vw',
  flexDirection: 'column',
}));

export const FileDownloadTypo = styled(Typography)(() => ({
  fontSize: '1.7rem',
}));
