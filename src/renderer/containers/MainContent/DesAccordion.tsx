import React from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, Typography } from '@mui/material';

import { AccordionWrapper } from './styled';

interface Contents {
  title: string;
  content: string[];
}

export const DesAccordion = (props: { cons: Array<Contents>; more?: React.JSX.Element }) => {
  return (
    <AccordionWrapper>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography className="mainTitle">조상땅 찾는 방법</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.cons.map((item, idx) => (
            <Box key={`find-method-${idx}`} sx={{ marginBottom: '5px' }}>
              <Typography key={`find-method-title-${idx}`} className="methodTitle">
                {item.title}
              </Typography>
              {item.content.map((con, idx2) => (
                <Typography key={`find-method-content-${idx}-${idx2}`} className="methodContent">
                  {con}
                </Typography>
              ))}
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      {props.more}
    </AccordionWrapper>
  );
};
