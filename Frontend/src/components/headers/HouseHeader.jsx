import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const HouseHeader = ({ npl }) => {
  return (
    <Box>
      <Link href="/houses" underline="none">
        <Typography variant="h6" component="span" color="primary">
          Houses
        </Typography>
      </Link>
      <Typography variant="h6" component="span" color="textPrimary">
        {' > House ' + npl}
      </Typography>
    </Box>
  );
};

export default HouseHeader;
