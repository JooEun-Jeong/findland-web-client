import React from 'react';

import { CloseRounded as CloseRoundedIcon } from '@mui/icons-material';
import { Box, Button, Modal } from '@mui/material';

import { CloseButton, MainAlertGrid, MessageContentBox, MessageInfoBox, MessageTitleBox, TitleTypo } from './styled';

export interface Message {
  header: string;
  contents: Array<string>;
}

interface AlertProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message;
  afterAction: () => void;
  afterActionName: string;
}

export const Alert: React.FC<AlertProps> = ({ isOpen, setIsOpen, message, afterAction, afterActionName }) => {
  return (
    <Modal open={isOpen}>
      <MainAlertGrid tabIndex={-1}>
        <MessageInfoBox>
          <MessageTitleBox>
            <TitleTypo>{message.header}</TitleTypo>
            <CloseButton disableRipple onClick={() => setIsOpen(false)}>
              <CloseRoundedIcon sx={{ color: '#562' }} />
            </CloseButton>
          </MessageTitleBox>
          <MessageContentBox>
            {Array.isArray(message.contents) ? (
              message.contents.map((data, idx) => {
                if (message.contents[idx + 1]) {
                  return (
                    <React.Fragment key={idx}>
                      <span>{data}</span>
                    </React.Fragment>
                  );
                } else {
                  return <span key={idx}>{data}</span>;
                }
              })
            ) : (
              <></>
            )}
          </MessageContentBox>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 0 10px 0' }}>
            <Button onClick={afterAction} sx={{ color: '#562', border: '1px solid #ff914d', width: '70%' }}>
              {afterActionName}
            </Button>
          </Box>
        </MessageInfoBox>
      </MainAlertGrid>
    </Modal>
  );
};
