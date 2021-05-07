import React from 'react';
import {Box, Button, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';

const Header = ({onClickButton, onChangeValue, isLive, valueSearch}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      padding="15px 30px"
      backgroundColor="#f7f8fa"
      borderBottom="1px solid #dbe1e6"
    >
      <Box border="1px solid #dbe1e6" borderRadius="5px">
        <Button
          size="lg"
          width="50%"
          background={isLive ? '#e8edf6' : '#fcfcfc'}
          color={isLive ? '#3875cc' : '#4e6172'}
          onClick={onClickButton}
        >
          Live
        </Button>
        <Button
          size="lg"
          width="50%"
          background={!isLive ? '#e8edf6' : '#fcfcfc'}
          color={!isLive ? '#3875cc' : '#4e6172'}
          onClick={onClickButton}
        >
          Pause
        </Button>
      </Box>

      <InputGroup width="80%" background="white">
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          placeholder="Type to search..."
          value={valueSearch}
          onChange={onChangeValue}
        />
      </InputGroup>
    </Box>
  );
};

export default Header;
