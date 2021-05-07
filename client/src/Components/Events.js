import React from 'react';
import {Box} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';
import {getContentByType} from '../helper/getContentByType.js';
import {dataFormat} from '../helper/dataFormat.js';

const Events = ({events}) => {
  if (events) {
    return (
      <Box marginBottom={2}>
        {events.map((item, index) => {
          return (
            <Box
              key={item.receivedAt + index}
              padding="15px 30px"
              display="flex"
              justifyContent="space-around"
              borderBottom="1px solid #dbe1e6"
            >
              <CheckIcon
                borderRadius={50}
                background="blue"
                color="white"
                padding="2px"
              />

              <Box width="10%" marginLeft="30px">
                {item.type.toUpperCase()}
              </Box>
              <Box flexGrow={1}>{getContentByType(item)}</Box>
              <Box>{dataFormat(item.receivedAt)}</Box>
            </Box>
          );
        })}
      </Box>
    );
  }
  return null;
};

export default Events;
