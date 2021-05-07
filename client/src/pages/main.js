import React, {useState, useEffect, useCallback} from 'react';
import io from 'socket.io-client';
import {Box} from '@chakra-ui/react';
import {filteredEvents} from '../helper/filteredEvents';
import ErrorAlert from '../Components/ErrorAlert';
import Events from '../Components/Events';
import Header from '../Components/Header';

const Main = () => {
  const [isLive, setIsLive] = useState(true);
  const [valueSearch, setValueSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [eventsFiltered, setEventsFiltered] = useState([]);
  const [error, setError] = useState();
  let socket = {};

  const handleChangeActiveButton = () => {
    setIsLive(previous => !previous);
  };

  const handleChangeValueSearch = event => {
    setValueSearch(event.target.value);
  };

  const activateSocket = useCallback(() => {
    socket = io(process.env.REACT_APP_SOCKET || 'http://localhost:8080/');

    socket.on('events', events => {
      setEvents(previous => [...events, ...previous]);
      setError(null);
    });

    socket.on('connect_error', () => {
      setError('Server unavailable');
    });

    socket.on('error', () => {
      setError('Server error');
    });
  }, [socket]);

  const closeSocket = useCallback(() => {
    socket.close();
  }, [socket]);

  useEffect(() => {
    if (isLive) {
      activateSocket();
    } else {
      closeSocket();
    }

    return () => closeSocket();
  }, [activateSocket, closeSocket, isLive]);

  useEffect(() => {
    const newEvents = filteredEvents(events, valueSearch);
    setEventsFiltered(newEvents);
  }, [valueSearch, events]);

  return (
    <Box width="100%">
      <Header
        isLive={isLive}
        valueSearch={valueSearch}
        onClickButton={handleChangeActiveButton}
        onChangeValue={handleChangeValueSearch}
      />
      <ErrorAlert message={error} />

      <Events events={eventsFiltered} />
    </Box>
  );
};

export default Main;
