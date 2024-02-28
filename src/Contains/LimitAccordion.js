import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const LimitedAccordion = ({ product }) => {
  const { translatedProductName } = product ?? {};
  const truncatedTitle = product.ProductName && product.ProductName.length > 10
    ? product.ProductName.substring(0, 10) + '...'
    :product.ProductName;



  return (
    <Accordion>
      <AccordionSummary>
        {/* Apply style to the Typography component */}
        <Typography >{truncatedTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body1'>
          {product.ProductName}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default LimitedAccordion;
