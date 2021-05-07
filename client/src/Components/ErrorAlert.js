import React from 'react';
import {Box} from '@chakra-ui/react';

const ErrorsAlert = ({message}) => {
  if (message) {
    return (
      <Box width="100%" background="#dc7a7a" padding="15px 30px">
        {message}
      </Box>
    );
  }
  return null;
};

export default ErrorsAlert;
